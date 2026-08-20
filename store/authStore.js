import { create } from "zustand";

import {
    loginUser, logoutUser, signUp,
} from "../services/auth";

import { getProfile } from "../services/profile";

const useAuthStore = create((set) => ({
    session: null,
    user: null,
    profile: null,
    loading: true,

    // Login
    login: async (email, password) => {
        set({ loading: true });

        try {
            const session = await loginUser(email, password);

            const profile = await getProfile(session.user.id);

            set({
                session,
                user: session.user,
                profile,
            });

            return session;

        } catch (error) {
            throw error;

        } finally {
            set({ loading: false });
        }
    },

    // Signup
    signup: async (
        name,
        email,
        password,
        role = "customer"
    ) => {
        set({ loading: true });

        try {
            const user = await signUp(
                name,
                email,
                password,
                role
            );

            return user;

        } catch (error) {
            throw error;

        } finally {
            set({ loading: false });
        }
    },

    // Logout
    logout: async () => {
        await logoutUser();

        set({
            session: null,
            user: null,
            profile: null,
        });
    },

    // Set session
    setSession: (session) =>
        set({
            session,
            user: session?.user ?? null,
        }),

    // Set profile
    setProfile: (profile) =>
        set({
            profile,
        }),
}));

export default useAuthStore;