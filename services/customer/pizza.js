import { supabase } from "../../lib/supabase";


export const getAvailablePizzas = async () => {

    const { data, error } = await supabase
        .from("pizzas")
        .select("*")
        .eq("available", true)
        .order(
            "created_at",
            { ascending: false }
        );


    if (error) throw error;

    return data;


};

// GET SINGLE PIZZA
export const getPizzaById = async (id) => {
    const { data, error } = await supabase
        .from("pizzas")
        .select(`
        *,
        categories (
            id,
            name
        )
    `)
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
};