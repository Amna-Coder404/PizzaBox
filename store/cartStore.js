import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const useCartStore = create(

    persist(

        (set) => ({

            cart: [],


            // ADD ITEM
            addToCart: (pizza) =>
                set((state) => {

                    const existingItem = state.cart.find(
                        (item) =>
                            item.id === pizza.id &&
                            item.size === pizza.size
                    );


                    if (existingItem) {

                        return {
                            cart: state.cart.map((item) =>
                                item.id === pizza.id &&
                                    item.size === pizza.size
                                    ? {
                                        ...item,
                                        quantity:
                                            item.quantity + pizza.quantity
                                    }
                                    :
                                    item
                            )
                        };

                    }


                    return {
                        cart: [
                            ...state.cart,
                            {
                                ...pizza,
                                cartId: `${pizza.id}-${pizza.size}`
                            }
                        ]
                    };

                }),



            // REMOVE ONE ITEM
            removeFromCart: (cartId) =>
                set((state) => ({
                    cart:
                        state.cart.filter(
                            item => item.cartId !== cartId
                        )
                })),



            // INCREASE QUANTITY
            increaseQuantity: (id, size) =>
                set((state) => ({

                    cart:
                        state.cart.map((item) => {

                            if (
                                item.id === id &&
                                item.size === size
                            ) {

                                return {
                                    ...item,
                                    quantity: item.quantity + 1
                                }

                            }


                            return item;

                        })

                })),



            // DECREASE QUANTITY
            decreaseQuantity: (id, size) =>
                set((state) => ({

                    cart:
                        state.cart.map((item) => {

                            if (
                                item.id === id &&
                                item.size === size
                            ) {

                                return {

                                    ...item,

                                    quantity:
                                        Math.max(
                                            1,
                                            item.quantity - 1
                                        )

                                }

                            }


                            return item;

                        })

                })),



            // CLEAR CART
            clearCart: () =>
                set({
                    cart: []
                })


        }),


        {
            name: "cart-storage",

            storage: createJSONStorage(
                () => AsyncStorage
            )
        }

    )

);


export default useCartStore;
