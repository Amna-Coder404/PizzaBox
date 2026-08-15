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
    // Get current order
    const { data: order, error: fetchError } = await supabase
        .from("orders")
        .select("order_status, payment_method, payment_status")
        .eq("id", orderId)
        .single();

    if (fetchError) {
        throw fetchError;
    }

    // Cancelled orders cannot be changed by admin
    if (order.order_status === "cancelled") {
        throw new Error(
            "This order has been cancelled and cannot be updated."
        );
    }

    // Prepare update
    const updateData = {
        order_status: status,
    };

    // COD payment is collected when order is delivered
    if (
        status === "delivered" &&
        order.payment_method === "cod" &&
        order.payment_status === "unpaid"
    ) {
        updateData.payment_status = "paid";
    }

    // Update order
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

// It give total Orders Length and total earn money 
export const getAdminOrderStats = async () => {
    const { data, error } = await supabase
        .from("orders")
        .select("total_price, payment_status");

    if (error) {
        throw error;
    }

    const totalOrders = data.length;

    const totalRevenue = data
        .filter((order) => order.payment_status === "paid")
        .reduce(
            (total, order) =>
                total + Number(order.total_price || 0),
            0
        );

    return {
        totalOrders,
        totalRevenue,
    };
};