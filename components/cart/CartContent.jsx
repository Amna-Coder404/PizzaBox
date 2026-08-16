import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, Text, TouchableOpacity, View, } from "react-native";

import NotFound from "../NotFound";
import CartFooter from "./CartFooter";

import COLORS from "../../constants/color";
import useCartStore from "../../store/cartStore";
import styles from "../../styles/cart.style";

const CartContent = ({ paymentMethod, setPaymentMethod, onCheckout }) => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, } = useCartStore();

    const subtotal = cart.reduce(
        (total, item) => {
            return (
                total +
                item.price * item.quantity
            );
        },
        0
    );

    const deliveryFee = cart.length > 0 ? 200 : 0;

    const total = subtotal + deliveryFee;

    const renderCartItem = ({ item, }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_url, }} style={styles.image} />

            <View style={styles.info}>
                <Text style={styles.name}>
                    {item.name}
                </Text>

                <Text style={styles.size}>
                    Size : {item.size}
                </Text>

                <Text style={styles.price}>
                    Rs. {item.price}
                </Text>

                <View style={styles.quantityContainer}  >
                    <TouchableOpacity style={styles.quantityButton}
                        onPress={() => decreaseQuantity(item.id, item.size)} >
                        <Ionicons name="remove" size={20} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.quantityText} >
                        {item.quantity}
                    </Text>

                    <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id, item.size)}  >
                        <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.deleteBtn} onPress={() => removeFromCart(item.cartId)}  >
                <Ionicons name="trash" size={22} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
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

            {cart.length > 0 && (
                <CartFooter
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    total={total}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    onCheckout={onCheckout}
                />
            )}
        </View>
    );
};

export default CartContent;