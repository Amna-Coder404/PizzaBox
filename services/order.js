
import { supabase } from "../lib/supabase";
import { refundPayment } from "./payment";



export const createOrder = async (orderData, items) => {
    // 1. Get logged-in user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    // 2. Create order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            ...orderData,
            user_id: user.id,
        })
        .select()
        .single();

    if (orderError) {
        throw orderError;
    }
    console.log("CART ITEMS BEFORE ORDER:", items);
    // 3. Create order items
    const orderItems = items.map((item) => ({
        order_id: order.id,

        // Keep reference to current pizza
        pizza_id: item.id,

        // Keep pizza information for order history
        pizza_name: item.name,
        pizza_image_url: item.image_url,

        quantity: item.quantity,
        size: item.size,
        unit_price: item.price,
    }));
    console.log("ORDER ITEMS TO INSERT:", orderItems);
    const { error: itemError } = await supabase
        .from("order_items")
        .insert(orderItems);

    if (itemError) {
        throw itemError;
    }

    // 4. Return created order
    return order;
};

export const getMyOrders = async (userId) => {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw error;
    }

    return data;
};



// Cancel Order 


export const cancelOrder = async (orderId) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    // Get current order
    const { data: order, error: fetchError } = await supabase
        .from("orders")
        .select(
            `
            id,
            order_status,
            payment_method,
            payment_status,
            payment_intent_id
            `
        )
        .eq("id", orderId)
        .single();

    if (fetchError) throw fetchError;


    if (order.order_status !== "pending") {
        throw new Error(
            "This order can no longer be cancelled."
        );
    }
    // COD
    if (order.payment_method === "cod") {
        const { data, error } = await supabase
            .from("orders")
            .update({
                order_status: "cancelled",
            })
            .eq("id", orderId)
            .eq("user_id", user.id)
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    // Stripe
    if (
        order.payment_method === "stripe" &&
        order.payment_status === "paid"
    ) {
        // Payment Intent must exist
        if (!order.payment_intent_id) {
            throw new Error(
                "Payment information is missing for this order."
            );
        }

        const refundData =
            await refundPayment(
                order.payment_intent_id
            );

        // Make sure refund succeeded
        if (!refundData?.success) {
            throw new Error(
                refundData?.error ||
                "Payment refund failed."
            );
        }
        // Only cancel the order After Rrefund  succeeds
        const { data, error } = await supabase
            .from("orders")
            .update({
                order_status: "cancelled",
                payment_status: "refunded"
            })
            .eq("id", orderId)
            .eq("user_id", user.id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;

    }

    throw new Error(
        "This order cannot be cancelled."
    );
}

