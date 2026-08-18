import { supabase } from "../lib/supabase";


// GET ALL CATEGORIES 
export const getCategories = async () => {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id");

    if (error) throw error;

    return data;
}

// ADD CATEGORY 
export const createCategory = async (category) => {
    const { data, error } = await supabase
        .from("categories")
        .insert(category)
        .select()
        .single();

    if (error) throw error;

    return data;
}

// UPDATE CATEGORY
export const updateCategory = async (id, category) => {
    const { data, error } = await supabase
        .from("categories")
        .update(category)
        .eq("id", id)
        .select()
        .single()

    if (error) throw error;

    return data;
}
// DELETE CATEGORY 
export const deleteCategory = async (id) => {
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (error) throw error;

}