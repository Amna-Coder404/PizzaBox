import { supabase } from "../lib/supabase";


export const createOrder = async (orderData, items) => {
    // Create Order

    const { data: order, error: orderError } = await supabase.from("orders")
        .insert(orderData)
        .select()
        .single();

    if (orderError) {
        throw orderError;
    }

    // 2. Add Order Items
    const orderItems = items.map((item) => ({
        order_id: order.id,
        pizza_id: item.id,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price
    }))

    const { error: itemError } = await
        supabase.from("order_items")
            .insert(orderItems)

    if (itemError) {
        throw itemError;
    }



    return order;
}

// 