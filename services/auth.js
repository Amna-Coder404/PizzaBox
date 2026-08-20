import { supabase } from "../lib/supabase";
import { createProfile } from "./profile";

// Sign Up
export const signUp = async (name, email, password, role = "customer") => {

    const { data, error } = await supabase.auth.signUp({ email, password, });

    if (error) {
        throw error;
    }


    const user = data.user;
    if (!user) {
        throw new Error("User was not created.");
    }


    const profile = await createProfile(user.id, name, email, role);
    return { user, profile, };
};

// Login
export const loginUser = async (email, password) => {
    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error) throw error;

    return data.session;
};

// Logout
export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};


// Current Session
export const checkSession = async () => {
    const { data: { session }, error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    return session;
};

// Current User
export const getCurrentUser = async () => {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return user;
};