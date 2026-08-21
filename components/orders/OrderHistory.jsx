import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import COLORS from "../../constants/color";
import { getHiddenOrders, permanentlyDeleteOrder } from "../../services/admin/orders";

import styles from "../../styles/orderHistory.style";
import OrderHistoryCard from "./OrderHistoryCard";

const OrderHistory = ({ visible, onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const data = await getHiddenOrders();
            setOrders(data || []);
        } catch (error) {
            console.log("GET ORDER HISTORY ERROR:", error);
            setOrders([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (visible) {
            setLoading(true);
            fetchOrders();
        }
    }, [visible]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    const handlePermanentDelete = (order) => {
        Alert.alert(
            "Delete Order Permanently",
            `Are you sure you want to permanently delete Order #${order.id}? This action cannot be undone.`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);

                            await permanentlyDeleteOrder(order.id);

                            setOrders((currentOrders) =>
                                currentOrders.filter(
                                    (item) => item.id !== order.id
                                )
                            );

                            Alert.alert(
                                "Order Deleted",
                                `Order #${order.id} has been permanently deleted.`
                            );
                        } catch (error) {
                            console.log(
                                "PERMANENT DELETE ORDER ERROR:",
                                error
                            );

                            Alert.alert(
                                "Delete Failed",
                                error?.message ||
                                "Unable to permanently delete this order."
                            );
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <View style={styles.container}>

                {/* HEADER */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>
                            Order History
                        </Text>

                        <Text style={styles.subtitle}>
                            {orders.length} orders
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <Ionicons
                            name="close"
                            size={24}
                            color={COLORS.text}
                        />
                    </TouchableOpacity>
                </View>

                {/* CONTENT */}
                {loading ? (
                    <Loading />
                ) : orders.length === 0 ? (
                    <NotFound
                        icon="archive-outline"
                        title="No Archived Orders"
                        description="There are no permanently archived orders in your history."
                    />
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <OrderHistoryCard
                                order={item}
                                onDelete={handlePermanentDelete}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                    />
                )}

            </View>
        </Modal>
    );
};

export default OrderHistory;