
import { supabase } from "../lib/supabase";

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

    // 3. Create order items
    const orderItems = items.map((item) => ({
        order_id: order.id,
        pizza_id: item.id,
        quantity: item.quantity,
        size: item.size,
        unit_price: item.price,

    }));

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