import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import COLORS from "../../constants/color";
import { getMyOrders } from "../../services/order";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/profile.style";
import Loader from "../Loading";

const MyOrders = ({ onBack }) => {
    const { profile } = useAuthStore();

    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const data = await getMyOrders(profile.id);

            setOrders(data || []);
        } catch (error) {
            console.log("GET MY ORDERS ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (profile?.id) {
            fetchOrders();
        }
    }, [profile?.id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={COLORS.primary}
                    />

                    <Text style={styles.backText}>
                        Back
                    </Text>
                </TouchableOpacity>

            </View>

            {/* ORDERS */}
            <FlatList
                data={orders}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.listContent
                }
                renderItem={({ item }) => (

                    <View style={styles.orderCard}>

                        {/* ORDER HEADER */}
                        <View style={styles.orderHeader}>

                            <View>
                                <Text
                                    style={
                                        styles.orderNumber
                                    }
                                >
                                    Order #{item.id}
                                </Text>

                                <Text
                                    style={
                                        styles.orderDate
                                    }
                                >
                                    {new Date(
                                        item.created_at
                                    ).toLocaleDateString()}
                                </Text>
                            </View>

                            <Text style={styles.total}>
                                Rs. {item.total_price}
                            </Text>

                        </View>

                        {/* ORDER STATUS */}
                        <View
                            style={
                                styles.statusContainer
                            }
                        >
                            <View
                                style={
                                    styles.statusIcon
                                }
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={20}
                                    color={
                                        COLORS.primary
                                    }
                                />
                            </View>

                            <View>
                                <Text
                                    style={
                                        styles.statusLabel
                                    }
                                >
                                    Order Status
                                </Text>

                                <Text
                                    style={
                                        styles.statusValue
                                    }
                                >
                                    {item.order_status
                                        .replaceAll(
                                            "_",
                                            " "
                                        )
                                        .replace(
                                            /\b\w/g,
                                            (letter) =>
                                                letter.toUpperCase()
                                        )}
                                </Text>
                            </View>
                        </View>

                        {/* DELIVERY ADDRESS */}
                        <View
                            style={
                                styles.addressContainer
                            }
                        >
                            <Ionicons
                                name="location-outline"
                                size={20}
                                color={COLORS.primary}
                            />

                            <Text
                                style={styles.address}
                            >
                                {item.delivery_address ||
                                    "No delivery address"}
                            </Text>
                        </View>

                        {/* PAYMENT */}
                        <View style={styles.footer}>

                            <View>
                                <Text
                                    style={styles.label}
                                >
                                    Payment
                                </Text>

                                <Text
                                    style={
                                        styles.paymentStatus
                                    }
                                >
                                    {item.payment_status}
                                </Text>
                            </View>

                            <View
                                style={
                                    styles.totalContainer
                                }
                            >
                                <Text
                                    style={styles.label}
                                >
                                    Total
                                </Text>

                                <Text
                                    style={styles.total}
                                >
                                    Rs. {item.total_price}
                                </Text>
                            </View>

                        </View>

                    </View>
                )}
            />

        </View>
    );
};

export default MyOrders;