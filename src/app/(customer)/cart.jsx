import { Ionicons } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../../../components/AppButton";
import NotFound from "../../../components/NotFound";
import COLORS from "../../../constants/color";
import { createOrder } from "../../../services/order";
import { createPaymentIntent } from "../../../services/payment";
import useCartStore from "../../../store/cartStore";
import styles from "../../../styles/cart.style";

const Cart = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCartStore();
    const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const deliveryFee = cart.length > 0 ? 200 : 0;; // or 200
    const total = subtotal + deliveryFee;

    const handleCheckout = async () => {
        try {
            if (cart.length === 0) {
                return;
            }
            // Create PaymentIntent using the real cart total
            const clientSecret = await createPaymentIntent(total);

            // Initialize Stripe PaymentSheet
            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: "PizzaBox",
                paymentIntentClientSecret: clientSecret,
                allowsDelayedPaymentMethods: false,
            });

            if (initError) {
                console.log("PAYMENT SHEET INIT ERROR:", initError);
                return;
            }

            // Open Stripe payment screen
            const { error: paymentError } = await presentPaymentSheet();

            if (paymentError) {
                console.log("PAYMENT ERROR:", paymentError);
                return;
            }
            // Payment succeeded
            console.log("PAYMENT SUCCESS");
            // Create Order AFTER payment succeeds
            const orderData = {
                total_price: total,
                delivery_fee: deliveryFee,
                order_status: "pending",
                payment_status: "paid"
            };
            console.log("ORDER DATA:", orderData);
            const order = await createOrder(orderData, cart);

            clearCart();
            // 6. Show success alert
            Alert.alert(
                "Order Confirmed 🎉",
                `Your order has been placed successfully!\n\nTotal: $${total}`,
                [
                    {
                        text: "OK",
                    },
                ]
            );
        } catch (error) {
            Alert.alert("Order Failed",
                error?.message ||
                "Something went wrong while placing your order."
            );
        }
    }

    // Redner Cards
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
                <View style={styles.bottomContainer}>

                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Subtotal</Text>
                        <Text style={styles.value}>${subtotal}</Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.label}>Delivery</Text>
                        <Text style={styles.value}>
                            ${deliveryFee}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalPrice}>
                            ${total}
                        </Text>
                    </View>

                    <AppButton
                        title="Checkout"
                        icon="card"
                        onPress={handleCheckout}
                    />

                </View>
            )}

        </View>
    );
};

export default Cart;