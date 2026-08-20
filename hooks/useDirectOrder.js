import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { createOrder } from "../services/order";
import { createPaymentIntent } from "../services/payment";
import useAuthStore from "../store/authStore";

const useDirectOrder = ({ selectedPizza, selectedSize, quantity, paymentMethod, deliveryFee, finalTotal, getPrice,
}) => {
    const router = useRouter();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { profile } = useAuthStore();

    const [loading, setLoading] = useState(false);

    const handleDirectOrder = async () => {
        try {
            setLoading(true);

            let paymentIntentId = null;

            // CHECK ADDRESS
            if (!profile?.address?.trim()) {
                Alert.alert(
                    "Delivery Address Required",
                    "Please add your delivery address before placing an order.",
                    [
                        {
                            text: "Add Address",
                            onPress: () => {
                                router.push("/(customer)/profile");
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

            const total = finalTotal;

            // STRIPE PAYMENT
            if (paymentMethod === "stripe") {
                const paymentData = await createPaymentIntent(total);

                const { clientSecret, paymentIntentId: createdPaymentIntentId } =
                    paymentData;

                paymentIntentId = createdPaymentIntentId;

                const { error: initError } = await initPaymentSheet({
                    merchantDisplayName: "PizzaBox",
                    paymentIntentClientSecret: clientSecret,
                    allowsDelayedPaymentMethods: false,
                });

                if (initError) {
                    Alert.alert(
                        "Payment Error",
                        initError.message
                    );
                    return;
                }

                const { error: paymentError } =
                    await presentPaymentSheet();

                if (paymentError) {
                    console.log("PAYMENT ERROR:", paymentError);
                    return;
                }
            }

            // ORDER DATA
            const orderData = {
                total_price: total,
                delivery_fee: deliveryFee,
                order_status: "pending",

                payment_status:
                    paymentMethod === "stripe"
                        ? "paid"
                        : "unpaid",

                payment_method: paymentMethod,

                payment_intent_id:
                    paymentMethod === "stripe"
                        ? paymentIntentId
                        : null,

                delivery_address: profile.address,
            };

            // ORDER ITEM
            const orderItem = {
                id: selectedPizza.id,
                name: selectedPizza.name,
                size: selectedSize,
                quantity,
                price: getPrice(),
            };

            await createOrder(orderData, [orderItem]);

            Alert.alert(
                "Order Confirmed 🎉",
                `Your order has been placed successfully!\n\nTotal: $${total}`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.replace("/(customer)");
                        },
                    },
                ]
            );

            return true;

        } catch (error) {
            console.log("DIRECT ORDER ERROR:", error);

            Alert.alert(
                "Order Failed",
                error?.message ||
                "Something went wrong. Please try again."
            );

            return false;

        } finally {
            setLoading(false);
        }
    };

    return {
        handleDirectOrder,
        loading,
    };
};

export default useDirectOrder;