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

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("id, name, email, avatar_url")
                .eq("id", order.user_id)
                .single();

            if (error) {
                console.log("PROFILE ERROR:", error.message);
            }

            return {
                ...order,
                profile: profile || null,
            };
        })
    );
    return ordersWithProfiles
};