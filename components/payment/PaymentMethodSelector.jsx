import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "../../styles/paymentMethodSelector.style";

const PAYMENT_METHODS = [
    {
        value: "stripe",
        label: "Card Payment",
        description: "Pay securely with Stripe",
        icon: "card-outline",
    },
    {
        value: "cod",
        label: "Cash on Delivery",
        description: "Pay when your order is delivered",
        icon: "cash-outline",
    },
];

const PaymentMethodSelector = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Method</Text>

            {PAYMENT_METHODS.map((method) => {
                const selected = value === method.value;

                return (
                    <TouchableOpacity
                        key={method.value}
                        onPress={() => onChange(method.value)}
                        style={[
                            styles.paymentOption,
                            selected
                                ? styles.selectedOption
                                : styles.unselectedOption,
                        ]}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name={method.icon}
                            size={27}
                            style={styles.methodIcon}
                            color={selected ? "#FF4D00" : "#aaa"}
                        />

                        <View style={styles.methodInfo}>
                            <Text style={styles.methodLabel}>
                                {method.label}
                            </Text>

                            <Text style={styles.methodDescription}>
                                {method.description}
                            </Text>
                        </View>

                        <Ionicons
                            name={
                                selected
                                    ? "checkmark-circle"
                                    : "ellipse-outline"
                            }
                            size={24}
                            color={selected ? "#FF4D00" : "#666"}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default PaymentMethodSelector;