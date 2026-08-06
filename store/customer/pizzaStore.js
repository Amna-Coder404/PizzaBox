import { create } from "zustand";

import { getAvailablePizzas } from "../../services/customer/pizza";


export const useCustomerPizzaStore = create((set) => ({
    pizzas: [],
    loading: false,

    fetchPizzas: async () => {
        set({ loading: true });

        try {
            const data = await getAvailablePizzas();
            set({ pizzas: data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    }
}))