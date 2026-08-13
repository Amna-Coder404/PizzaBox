import { supabase } from "../../lib/supabase";

export const getAdminOrders = async () => {
    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            order_items (
                id,
                pizza_id,
                quantity,
                size,
                unit_price,
                pizzas (
                    id,
                    name,
                    image_url
                )
            )
        `)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw error;
    }

    const ordersWithProfiles = await Promise.all(
        data.map(async (order) => {
            const { data: profile, error: profileError } =
                await supabase
                    .from("profiles")
                    .select("id, name, email, avatar_url")
                    .eq("id", order.user_id)
                    .maybeSingle();

            if (profileError) {
                console.log(
                    "PROFILE ERROR:",
                    profileError.message
                );
            }

            return {
                ...order,
                profile: profile || null,
            };
        })
    );

    return ordersWithProfiles;
};


// Update Order Status
export const updateOrderStatus = async (orderId, status) => {
    // 1. Get the current payment information
    const { data: order, error: fetchError } = await supabase
        .from("orders")
        .select("payment_method, payment_status")
        .eq("id", orderId)
        .single();

    if (fetchError) {
        throw fetchError;
    }

    // 2. Prepare the update
    const updateData = {
        order_status: status,
    };

    // 3. Cash on delivery (COD) payment is collected when the order is delivered
    if (
        status === "delivered" &&
        order.payment_method === "cod" &&
        order.payment_status === "unpaid"
    ) {
        updateData.payment_status = "paid";
    }

    // 4. Update the order
    const { data, error } = await supabase
        .from("orders")
        .update(updateData)
        .eq("id", orderId)
        .select();

    if (error) {
        throw error;
    }

    return data;
};