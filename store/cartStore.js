import { create } from "zustand";



const useCartStore = create((set) => ({
    cart: [],

    addToCart: (pizza) => set((state) => ({ cart: [...state.cart, pizza] })), //Add more Items (Pizza) in cart 

    removeToCart: (pizza) => set((state) => ({
        cart: state.cart.filter(
            (item) => item.id !== id
        ),
    })),

    clearCart: () => set({ cart: [] }),


}));

export default useCartStore;