// This file manages app data
// MEAN
// Call database, then update pizzas shown on screen
// It keeps your UI updated
// You manually manage everything.
import { create } from "zustand";

import { createPizza, deletePizza, getPizzas, togglePizzaAvailability, updatePizza } from "../../services/admin/pizza";



export const usePizzaStore = create((set) => ({
    pizzas: [],
    loading: false,

    fetchPizzas: async () => {
        set({ loading: true });

        try {
            const data = await getPizzas();

            set({ pizzas: data, loading: false });


        } catch (error) {
            set({ loading: false });
        }
    },


    // ADD PIZZA 
    addPizza: async (pizza) => {
        const data = await createPizza(pizza);

        set(state => ({
            pizzas: [data, ...state.pizzas]
        }));
    },


    // EDIT PIZZA 
    editPizza: async (id, pizza) => {
        const data = await updatePizza(id, pizza);

        set(state => ({
            pizzas: state.pizzas.map(item => item.id === id ? data : item)
        }));
    },

    // REMOVE PIZZA 
    removePizza: async (id) => {
        await deletePizza(id);

        set(state => ({
            pizzas:
                state.pizzas.filter(
                    item => item.id !== id
                )
        }));
    },

    // CHANGE AVAILABILITY  
    changeAvailability: async (id, available) => {
        const data = await togglePizzaAvailability(id, available);

        set(state => ({
            pizzas:
                state.pizzas.map(item =>
                    item.id === id ? data : item
                )

        }));
    },
}))