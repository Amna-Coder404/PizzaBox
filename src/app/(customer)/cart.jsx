import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../../../components/AppButton";
import NotFound from "../../../components/NotFound";
import COLORS from "../../../constants/color";
import { createOrder } from "../../../services/order";
import useCartStore from "../../../store/cartStore";
import styles from "../../../styles/cart.style";



const Cart = () => {

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
    const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const deliveryFee = cart.length > 0 ? 200 : 0;; // or 200
    const total = subtotal + deliveryFee;

    const handleCheckout = async () => {
        try {
            const orderData = {
                subtotal,
                delivery_fee: deliveryFee,
                total,
                status: "pending",
                payment_status: "unpaid"
            };
            const order = await createOrder(orderData, cart);
            console.log("ORDER CREATED:", order);
            clearCart();

        } catch (error) {
            console.log(
                "ORDER ERROR:",
                error.message
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