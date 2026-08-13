import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import COLORS from "../../constants/color";
import styles from "../../styles/pizzaOrderPayment.style";
import AppButton from "../AppButton";

const PizzaOrderPayment = ({
    paymentMethod,
    onPaymentMethodChange,
    onOrder,
    onBack,
}) => {
    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Choose Payment Method
                </Text>

                <TouchableOpacity
                    onPress={onBack}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="close"
                        size={24}
                        color="#999"
                    />
                </TouchableOpacity>
            </View>

            {/* CARD PAYMENT */}
            <TouchableOpacity
                style={[
                    styles.option,
                    paymentMethod === "stripe" &&
                    styles.activeOption,
                ]}
                onPress={() =>
                    onPaymentMethodChange("stripe")
                }
                activeOpacity={0.8}
            >
                <Ionicons
                    name="card-outline"
                    size={27}
                    color={
                        paymentMethod === "stripe"
                            ? COLORS.primary
                            : "#aaa"
                    }
                />

                <View style={styles.info}>
                    <Text style={styles.label}>
                        Card Payment
                    </Text>

                    <Text style={styles.description}>
                        Pay securely with Stripe
                    </Text>
                </View>

                <Ionicons
                    name={
                        paymentMethod === "stripe"
                            ? "checkmark-circle"
                            : "ellipse-outline"
                    }
                    size={24}
                    color={
                        paymentMethod === "stripe"
                            ? COLORS.primary
                            : "#666"
                    }
                />
            </TouchableOpacity>

            {/* CASH ON DELIVERY */}
            <TouchableOpacity
                style={[
                    styles.option,
                    paymentMethod === "cod" &&
                    styles.activeOption,
                ]}
                onPress={() =>
                    onPaymentMethodChange("cod")
                }
                activeOpacity={0.8}
            >
                <Ionicons
                    name="cash-outline"
                    size={27}
                    color={
                        paymentMethod === "cod"
                            ? COLORS.primary
                            : "#aaa"
                    }
                />

                <View style={styles.info}>
                    <Text style={styles.label}>
                        Cash on Delivery
                    </Text>

                    <Text style={styles.description}>
                        Pay when your order is delivered
                    </Text>
                </View>

                <Ionicons
                    name={
                        paymentMethod === "cod"
                            ? "checkmark-circle"
                            : "ellipse-outline"
                    }
                    size={24}
                    color={
                        paymentMethod === "cod"
                            ? COLORS.primary
                            : "#666"
                    }
                />
            </TouchableOpacity>

            {/* ORDER BUTTON */}
            <View style={styles.button}>
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
                    onPress={onOrder}
                />
            </View>

        </View>
    );
};

export default PizzaOrderPayment;