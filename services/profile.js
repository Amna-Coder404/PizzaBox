import { supabase } from "../lib/supabase";


// TODO: Add later default Avator Image 
//Create Profile
export const createProfile = async (userId, name, email) => {
    const { error } = await supabase.from("profiles")
        .insert({
            id: userId,
            name,
            email,
            role: "customer",
        });

    if (error) throw error;
};


// Get Profile
export const getProfile = async (userId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;
};


// Update Profile
export const updateProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId);


    if (error) throw error;

    return data
};