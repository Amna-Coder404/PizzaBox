import { supabase } from "../lib/supabase";

const DEFAULT_AVATAR =
    "https://xaccpurglkrikrymzikk.supabase.co/storage/v1/object/public/avatars/person.png";

// Create Profile
export const createProfile = async (
    userId,
    name,
    email,
    role = "customer",
    address = ""
) => {
    const { data, error } = await supabase
        .from("profiles")
        .insert({
            id: userId,
            name,
            email,
            role,
            address,
            avatar_url: DEFAULT_AVATAR,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
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
        .eq("id", userId)
        .select()
        .single();

    if (error) throw error;

    return data;
};