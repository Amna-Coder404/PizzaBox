import { create } from "zustand";
import {
    loginUser,
    logoutUser,
    signUp
} from "../services/auth";


const useAuthStore = create((set) => ({
    session: null,
    user: null,
    profile: null,
    loading: true,

    login: async (email, password) => {
        set({ loading: true });

        try {
            const session = await loginUser(email, password);
            set({
                loading: false,
                session,
                user: session.user
            });

            return session;
        } catch (error) {
            throw error;
        } finally {
            set({ loading: true });
        }
    },


    signup: async (name, email, password, role) => {
        set({ loading: true });

        try {
            const user = await signUp(name, email, password, role);
            set({ loading: false });

            return user;
        } catch (error) {

            throw error;
        } finally {
            set({ loading: true });
        }
    },

    logout: async () => {
        await logoutUser();

        set({ session: null, user: null, profile: null });
    },

    setSession: (session) => set({
        session,
        user: session?.user ?? null,
    }),


    setProfile: (profile) => set({
        profile,
    }),


}));

export default useAuthStore;