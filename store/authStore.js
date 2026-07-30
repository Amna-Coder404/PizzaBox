import { create } from "zustand";


const useAuthStore = create((set) => ({
    session: null,
    user: null,
    profile: null,
    loading: true,

    setSesstion: (session) => set({ session, user: session?.user ?? null }),
    setProfile: (profile) => set({ profile }),
    setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;