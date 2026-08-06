import { create } from "zustand";

import { getAvailablePizzas, getPizzaById } from "../../services/customer/pizza";


export const useCustomerPizzaStore = create((set) => ({
    pizzas: [],
    loading: false,
    selectedPizza: null,

    // GET ALL PIZZAS
    fetchPizzas: async () => {
        set({ loading: true });

        try {
            const data = await getAvailablePizzas();
            set({ pizzas: data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

    // GET SINGLE PIZZA (that is for [id] I mean for pizza detail)
    fetchPizzaById: async (id) => {
        set({ loading: true });

        try {
            const data = await getPizzaById(id);
            set({ selectedPizza: data, loading: false })

            return data
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
}))