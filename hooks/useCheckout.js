import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { useState } from "react";
import { createOrder } from "../services/order";
import { createPaymentIntent } from "../services/payment";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";
import useNetWorkStatus from "./useNetworkStatus";

const useCheckout = ({ total, deliveryFee, paymentMethod, }) => {
    const router = useRouter();
    const [showOfflineModal, setShowOfflineModal] = useState(false);

    const { isOnline } = useNetWorkStatus();

    const { profile } = useAuthStore();
    const { clearCart } = useCartStore();

    const { initPaymentSheet, presentPaymentSheet, } = useStripe();

    const handleCheckout = async () => {
        try {
            if (!isOnline) {
                setShowOfflineModal(true);
                return;
            }
            // Check delivery address
            if (!profile?.address?.trim()) {
                Alert.alert(
                    "Delivery Address Required",
                    "Please add your delivery address before placing an order.",
                    [
                        {
                            text: "Add Address",
                            onPress: () => {
                                router.push(
                                    "/(customer)/profile"
                                );
                            },
                        },
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                    ]
                );

                return;
            }

            const { cart, } = useCartStore.getState();

            if (cart.length === 0) {
                return;
            }

            // CASH ON DELIVERY


            if (paymentMethod === "cod") {
                const orderData = {
                    total_price: total,
                    delivery_fee: deliveryFee,
                    order_status: "pending",
                    payment_status: "unpaid",
                    payment_method: "cod",
                    delivery_address:
                        profile.address,
                };

                await createOrder(
                    orderData,
                    cart
                );

                clearCart();

                Alert.alert(
                    "Order Confirmed 🎉",
                    `Your Cash on Delivery order has been placed successfully!\n\nTotal: Rs. ${total}`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                router.replace(
                                    "/(customer)"
                                );
                            },
                        },
                    ]
                );

                return;
            }

            // STRIPE


            const clientSecret =
                await createPaymentIntent(total);

            const { error: initError } =
                await initPaymentSheet({
                    merchantDisplayName: "PizzaBox",
                    paymentIntentClientSecret: clientSecret,
                    allowsDelayedPaymentMethods: false,
                });

            if (initError) {
                Alert.alert("Payment Error", initError.message);

                return;
            }

            const { error: paymentError, } = await presentPaymentSheet();

            if (paymentError) {
                return;
            }

            const orderData = {
                total_price: total,
                delivery_fee: deliveryFee,
                order_status: "pending",
                payment_status: "paid",
                payment_method: "stripe",
                delivery_address:
                    profile.address,
            };

            console.log(
                "STRIPE ORDER:",
                orderData
            );

            await createOrder(orderData, cart);

            clearCart();

            Alert.alert(
                "Order Confirmed 🎉",
                `Your order has been placed successfully!\n\nTotal: Rs. ${total}`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.replace(
                                "/(customer)"
                            );
                        },
                    },
                ]
            );
        } catch (error) {

            Alert.alert(
                "Order Failed",
                error?.message ||
                "Something went wrong while placing the order."
            );
        }
    };

    return {
        handleCheckout,
        showOfflineModal,
        setShowOfflineModal,
    };
};

export default useCheckout;