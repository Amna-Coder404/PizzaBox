// This file should only communicate with Supabase. like create user profiel rows

import { supabase } from "../lib/supabase";

const DEFAUL_AVATOR = "https://xaccpurglkrikrymzikk.supabase.co/storage/v1/object/public/avatars/person.png";

//Sign Up
export const signUp = async (name, email, password, role = "customer") => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    const user = data.user;

    const { error: profileError } = await supabase.from("profiles")
        .insert({
            id: user.id,
            name,
            role,
            email,
            avatar_url: DEFAUL_AVATOR
        });

    if (profileError)
        throw profileError;



    return user;
}



//Login
export const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return data.session;
}

//Logout
export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error;

}


//   Current Session 
export const checkSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error;

    return session;
}


//   Current User 
export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) throw error;

    return user;
}