import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

import COLORS from "../../constants/color";
import { cancelOrder, getMyOrders } from "../../services/order";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/profile.style";
import AppButton from "../AppButton";
import Loader from "../Loading";
import NotFound from "../NotFound";


const MyOrders = ({ onBack, totalCount }) => {
    const { profile } = useAuthStore();
    const [cancellingOrderId, setCancellingOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
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

    const handleRefresh = async () => {
        try {
            setRefreshing(true);

            const data = await getMyOrders(profile.id);

            setOrders(data || []);
        } catch (error) {
            console.log("REFRESH ORDERS ERROR:", error);
        } finally {
            setRefreshing(false);
        }
    };

    // SHOW CONFIRMATION ALERT FOR CANCEL ORDER
    const handleCancel = (order) => {
        Alert.alert(
            "Cancel Order",
            `Are you sure you want to cancel Order #${order.id}?`,
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes, Cancel",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setCancellingOrderId(order.id);

                            await cancelOrder(order.id);

                            const data = await getMyOrders(profile.id);
                            setOrders(data || []);

                            Alert.alert(
                                "Order Cancelled",
                                `Order #${order.id} has been cancelled successfully.`
                            );
                        } catch (error) {
                            console.log(
                                "CANCEL ORDER ERROR:",
                                error
                            );

                            Alert.alert(
                                "Unable to Cancel",
                                error?.message ||
                                "Something went wrong while cancelling the order."
                            );
                        } finally {
                            setCancellingOrderId(null);
                        }
                    },
                },
            ]
        );
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
            <View style={styles.myOrderHeader}>
                {/* BACK */}
                <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}  >
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>


                <Text style={styles.myorder}>
                    My Orders
                </Text>

                {/* ORDER COUNT */}
                <View style={styles.orderCountBadge}>
                    <Text style={styles.orderCountText}>
                        {totalCount}
                    </Text>
                </View>

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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
                renderItem={({ item }) => (

                    <View style={styles.orderCard}>
                        {/* ORDER HEADER */}
                        <View style={styles.orderHeader}>

                            <View>
                                <Text style={styles.orderNumber}  >
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
                        <View style={styles.statusContainer}   >
                            <View style={styles.statusIcon} >
                                <Ionicons name="time-outline" size={20} color={COLORS.primary} />
                            </View>

                            <View>
                                <Text style={styles.statusLabel}   >
                                    Order Status
                                </Text>

                                <Text style={styles.statusValue}  >
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
                        <View style={styles.addressContainer} >
                            <Ionicons name="location-outline" size={20} color={COLORS.primary} />

                            <Text style={styles.address}  >
                                {item.delivery_address ||
                                    "No delivery address"}
                            </Text>
                        </View>

                        {/* PAYMENT */}
                        <View style={styles.footer}>
                            <View>
                                <Text style={styles.label}  >
                                    Payment
                                </Text>

                                <Text style={styles.paymentStatus}  >
                                    {item.payment_status}
                                </Text>
                            </View>

                            <View style={styles.totalContainer}  >
                                <Text style={styles.label} >
                                    Total
                                </Text>

                                <Text style={styles.total}>
                                    Rs. {item.total_price}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 12 }} />
                        {item.order_status === "pending" && (
                            <AppButton icon={"close-circle"} title={"Cancel order"} onPress={() => handleCancel(item)}
                            />)}
                    </View>
                )}

                ListEmptyComponent={
                    <NotFound
                        icon="receipt-outline"
                        title="No Orders Yet"
                        description="You haven't placed any orders yet."
                    />
                }
            />


        </View>
    );
};

export default MyOrders;