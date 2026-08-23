import { create } from "zustand";

import {
    checkSession,
    loginUser,
    logoutUser,
    signUp,
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
            const session = await loginUser(
                email,
                password
            );

            const profile = await getProfile(
                session.user.id
            );

            set({
                session,
                user: session.user,
                profile,
            });

            return {
                session,
                profile,
            };

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
            const result = await signUp(
                name,
                email,
                password,
                role
            );

            const session = await checkSession();

            set({
                session,
                user: result.user,
                profile: result.profile,
            });

            return {
                session,
                user: result.user,
                profile: result.profile,
            };

        } finally {
            set({ loading: false });
        }
    },

    /*
     * RESTORE SESSION ON APP START
     */
    initializeSession: async (session) => {
        if (!session) {
            set({
                session: null,
                user: null,
                profile: null,
                loading: false,
            });

            return null;
        }

        try {
            set({
                session,
                user: session.user,
                loading: true,
            });

            const profile = await getProfile(
                session.user.id
            );

            set({
                session,
                user: session.user,
                profile,
                loading: false,
            });

            return {
                session,
                user: session.user,
                profile,
            };

        } catch (error) {
            console.log(
                "PROFILE RESTORE ERROR:",
                error?.message || error
            );

            set({
                session,
                user: session.user,
                profile: null,
                loading: false,
            });

            throw error;
        }
    },

    logout: async () => {
        await logoutUser();

        set({
            session: null,
            user: null,
            profile: null,
            loading: false,
        });
    },

    setSession: (session) =>
        set({
            session,
            user: session?.user ?? null,
        }),

    setProfile: (profile) =>
        set({
            profile,
        }),
}));

export default useAuthStore;