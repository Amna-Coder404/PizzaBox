import { create } from "zustand";

import {
    getAvailablePizzas,
    getPizzaById,
} from "../../services/customer/pizza";
import useCartStore from "../cartStore";



export const useCustomerPizzaStore = create((set) => ({

    pizzas: [],
    loading: false,
    selectedPizza: null,

    // GET ALL PIZZAS
    fetchPizzas: async () => {
        set({ loading: true });

        try {
            const data = await getAvailablePizzas();

            // Update pizza list
            set({
                pizzas: data,
                loading: false,
            });

            // Remove deleted pizzas from cart
            useCartStore.getState().syncWithPizzas(data);

        } catch (error) {
            set({ loading: false });
        }
    },

    // GET SINGLE PIZZA
    // Used for /pizza/[id]
    fetchPizzaById: async (id) => {
        set({ loading: true });

        try {
            const data = await getPizzaById(id);

            set({
                selectedPizza: data,
                loading: false,
            });

            return data;

        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    // CLEAR SELECTED PIZZA
    clearSelectedPizza: () =>
        set({
            selectedPizza: null,
        }),

}));