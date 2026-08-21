import { create } from "zustand";

import {
    checkSession,
    loginUser, logoutUser, signUp,
} from "../services/auth";

import { getProfile } from "../services/profile";

const useAuthStore = create((set) => ({
    session: null,
    user: null,
    profile: null,
    loading: true,

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

            return {
                session,
                profile,
            };

        } catch (error) {
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    signup: async (
        name,
        email,
        password,
        role = "customer"
    ) => {
        set({ loading: true });

        try {
            const { user, profile } = await signUp(
                name,
                email,
                password,
                role
            );

            const session = await checkSession();

            set({
                session,
                user,
                profile,
            });

            return { user, profile, session };

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