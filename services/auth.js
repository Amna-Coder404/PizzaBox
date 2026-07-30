import { supabase } from "../lib/supabase";


//Sign Up
export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    return data.user;
}



//Login
export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return data.session;
}

//Logout
export const logOut = async () => {
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