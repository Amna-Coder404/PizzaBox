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