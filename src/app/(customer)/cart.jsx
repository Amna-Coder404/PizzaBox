import { Ionicons } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import NotFound from "../../../components/NotFound";
import COLORS from "../../../constants/color";
import { createOrder } from "../../../services/order";
import { createPaymentIntent } from "../../../services/payment";
import useAuthStore from "../../../store/authStore";
import useCartStore from "../../../store/cartStore";
import styles from "../../../styles/cart.style";


import { useState } from "react";
import CartFooter from "../../../components/cart/CartFooter";




const Cart = () => {
    const router = useRouter();
    const { profile } = useAuthStore();
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const { initPaymentSheet, presentPaymentSheet } = useStripe();


    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCartStore();

    const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const deliveryFee = cart.length > 0 ? 200 : 0;; // or 200
    const total = subtotal + deliveryFee;

    const handleCheckout = async () => {
        try {
            // First Check that Customer have address or not
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
                    delivery_address: profile.address,
                };

                await createOrder(orderData, cart);
                clearCart();

                Alert.alert(
                    "Order Confirmed 🎉",
                    `Your Cash on Delivery order has been placed successfully!\n\nTotal: $${total}`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                router.replace("/(customer)");
                            },
                        },
                    ]
                );

                return;
            }


            // STRIPE

            const clientSecret = await createPaymentIntent(total);

            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: "PizzaBox",
                paymentIntentClientSecret: clientSecret,
                allowsDelayedPaymentMethods: false,
            });

            if (initError) {
                Alert.alert("Payment Error", initError.messag);
                return;
            }

            const { error: paymentError } =
                await presentPaymentSheet();

            if (paymentError) return;

            // Stripe payment succeeded
            const orderData = {
                total_price: total,
                delivery_fee: deliveryFee,
                order_status: "pending",
                payment_status: "paid",
                payment_method: "stripe",
                delivery_address: profile.address,
            };

            console.log("STRIPE ORDER:", orderData);

            await createOrder(orderData, cart);

            clearCart();

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
        } catch (error) {
            console.log("CHECKOUT ERROR:", error);

            Alert.alert(
                "Order Failed",
                error?.message ||
                "Something went wrong while placing your order."
            );
        }
    };
    // Render Cards
    const renderCartItem = ({ item }) => (
        <View style={styles.card} >
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.size}>Size : {item.size}</Text>
                <Text style={styles.price}> {item.price}</Text>
                {/* QUANTITY */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => decreaseQuantity(item.id, item.size)}
                    >
                        <Ionicons
                            name="remove"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>
                        {item.quantity}
                    </Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => increaseQuantity(item.id, item.size)}
                    >
                        <Ionicons
                            name="add"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeFromCart(item.cartId)}
            >
                <Ionicons
                    name="trash"
                    size={22}
                    color={COLORS.primary}
                />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>My Cart</Text>
            </View>

            {/* CART ITEMS */}
            <FlatList
                data={cart}
                keyExtractor={(item) => item.cartId}
                renderItem={renderCartItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <NotFound
                        icon="cart"
                        title="Your cart is empty"
                    />
                }
            />

            {/* FIXED FOOTER */}
            {cart.length > 0 && (
                <CartFooter
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    total={total}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    onCheckout={handleCheckout}
                />
            )}

        </View>
    );
};

export default Cart;