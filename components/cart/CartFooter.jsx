import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import AppButton from "../AppButton";
import PaymentMethodSelector from "../payment/PaymentMethodSelector";

import COLORS from "../../constants/color";
import styles from "../../styles/cart.style";

const CartFooter = ({
    subtotal,
    deliveryFee,
    total,
    paymentMethod,
    setPaymentMethod,
    onCheckout,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const animation = useSharedValue(0);

    const toggleFooter = () => {
        const nextState = !isOpen;

        setIsOpen(nextState);

        animation.value = withTiming(
            nextState ? 1 : 0,
            {
                duration: 300,
            }
        );
    };

    const animatedContentStyle = useAnimatedStyle(() => {
        return {
            opacity: animation.value,
            transform: [
                {
                    translateY: (1 - animation.value) * 20,
                },
            ],
        };
    });

    return (
        <View style={styles.bottomContainer}>

            {/* FOOTER HEADER */}
            <TouchableOpacity
                style={styles.footerHeader}
                onPress={toggleFooter}
                activeOpacity={0.8}
            >
                <View>
                    <Text style={styles.footerTotalLabel}>
                        Total
                    </Text>

                    <Text style={styles.footerTotal}>
                        ${total}
                    </Text>
                </View>

                <View style={styles.footerToggle}>
                    <Ionicons
                        name={isOpen ? "chevron-down" : "chevron-up"}
                        size={24}
                        color={COLORS.primary}
                    />
                </View>
            </TouchableOpacity>

            {/* PAYMENT / CHECKOUT CONTENT */}
            {isOpen && (
                <Animated.View
                    style={[
                        styles.footerContent,
                        animatedContentStyle,
                    ]}
                >
                    <View style={styles.priceRow}>
                        <Text style={styles.label}>
                            Subtotal
                        </Text>

                        <Text style={styles.value}>
                            ${subtotal}
                        </Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.label}>
                            Delivery
                        </Text>

                        <Text style={styles.value}>
                            ${deliveryFee}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>
                            Total
                        </Text>

                        <Text style={styles.totalPrice}>
                            ${total}
                        </Text>
                    </View>

                    <PaymentMethodSelector
                        value={paymentMethod}
                        onChange={setPaymentMethod}
                    />

                    <AppButton
                        title={
                            paymentMethod === "cod"
                                ? "Place Order"
                                : "Pay with Stripe"
                        }
                        icon={
                            paymentMethod === "cod"
                                ? "cash"
                                : "card"
                        }
                        onPress={onCheckout}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default CartFooter;