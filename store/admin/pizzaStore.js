import { create } from "zustand";

import {
    createPizza,
    deletePizza,
    getPizzas,
    updatePizza
} from "../../services/admin/pizza";

export const usePizzaStore = create((set) => ({
    pizzas: [],
    loading: false,
    hasFetched: false,

    // FETCH PIZZAS
    fetchPizzas: async () => {
        set({ loading: true });

        try {
            const data = await getPizzas();

            set({
                pizzas: data,
                loading: false,
                hasFetched: true,
            });

            return data;

        } catch (error) {
            console.log(
                "FETCH PIZZAS ERROR:",
                error?.message || error
            );


            set({
                loading: false,
            });

            return null;
        }
    },

    // ADD PIZZA
    addPizza: async (pizza) => {
        const data = await createPizza(pizza);

        set((state) => ({
            pizzas: [data, ...state.pizzas],
        }));

        return data;
    },

    // EDIT PIZZA
    editPizza: async (id, pizza) => {
        const data = await updatePizza(id, pizza);

        set((state) => ({
            pizzas: state.pizzas.map((item) =>
                item.id === id ? data : item
            ),
        }));

        return data;
    },

    // REMOVE PIZZA
    removePizza: async (id) => {
        await deletePizza(id);

        set((state) => ({
            pizzas: state.pizzas.filter(
                (item) => item.id !== id
            ),
        }));
    },
}));