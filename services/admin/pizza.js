//This file only talks with Supabase
// It does not know anything about React state



import { supabase } from "../../lib/supabase";

// CREATE PIZZA
export const createPizza = async (pizza) => {

    const { data, error } = await supabase.from("pizzas")
        .insert({
            name: pizza.name,
            description: pizza.description,
            image_url: pizza.image_url,
            category: pizza.category,

            small_price: pizza.small_price,
            medium_price: pizza.medium_price,
            large_price: pizza.large_price,

            available: true,
        })
        .select()
        .single();

    if (error) throw error;

    return data;

}



// GET ALL PIZZAS
export const getPizzas = async () => {

    const { data, error } = await supabase.
        from("pizzas")
        .select("*")
        .order(
            "created_at",
            { ascending: false }
        )
        .single();

    if (error) throw error;

    return data;

}


// GET SINGLE PIZZA
export const getPizzaById = async (id) => {

    const { data, error } = await supabase.
        from("pizzas")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}


// UPDATE PIZZA
export const updatePizza = async (id, pizza) => {

    const { data, error } = await supabase.
        from("pizzas")
        .update({
            name: pizza.name,
            description: pizza.description,
            image_url: pizza.image_url,
            category: pizza.category,

            small_price: pizza.small_price,
            medium_price: pizza.medium_price,
            large_price: pizza.large_price,

            available: true,
        })
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}


// DELETE PIZZA
export const deletePizza = async (id) => {

    const { error } = await supabase.
        from("pizzas")
        .delete()
        .eq("id", id)

    if (error) throw error;

    return true;
}


// CHANGE AVAILABLE STATUS
export const togglePizzaAvailability = async (id, available) => {
    const { data, error } = await supabase.from("pizzas")
        .update({
            available
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error
    return data;
}