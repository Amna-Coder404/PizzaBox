import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useEffect, useState } from "react";
import COLORS from "../../constants/color";
import { getHiddenOrders } from "../../services/admin/orders";
import styles from "../../styles/orderHistory.style";
import OrderCard from "./OrderCard";

const OrderHistory = ({ visible, onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const data = await getHiddenOrders();
            setOrders(data);
        } catch (error) {
            console.log("GET ORDER HISTORY ERROR:", error);
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

                {/* LOADING */}
                {loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <OrderCard
                                order={item}
                                onStatusUpdated={fetchOrders}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons
                                    name="pizza"
                                    size={48}
                                    color={COLORS.textMuted}
                                />

                                <Text style={styles.emptyTitle}>
                                    No Order History
                                </Text>

                                <Text style={styles.emptyText}>
                                    Hidden orders will appear here.
                                </Text>
                            </View>
                        }
                    />
                )}

            </View>
        </Modal>
    );
};

export default OrderHistory;