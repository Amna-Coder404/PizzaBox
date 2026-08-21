import { useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import Loader from "../../../components/Loading"
import NotFound from "../../../components/NotFound"
import OrderCard, { FILTER_STATUS_OPTIONS } from '../../../components/orders/OrderCard'
import ProfileImagePreview from '../../../components/ProfileImagePreview'
import { getAdminOrders } from '../../../services/admin/orders'
import useAuthStore from '../../../store/authStore'
import styles from "../../../styles/orders.styles"

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Authenticated user's profile
    const { profile } = useAuthStore();
    const [selectedStatus, setSelectedStatus] = useState(null);


    const fetchOrders = async () => {
        try {
            const data = await getAdminOrders();
            setOrders(data);

        } catch (error) {
            console.log("ERROR GET ORDER ", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    const filteredOrders =
        selectedStatus === null
            ? orders
            : orders.filter(
                order => order.order_status === selectedStatus
            );

    if (loading) return <Loader />

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/images/app-images/logo-header.png")}
                    style={styles.logo}
                />

                {/* AUTH USER PROFILE */}
                <ProfileImagePreview
                    uri={profile?.avatar_url}
                    style={styles.profileImage}
                />

            </View>

            {/* STATUS FILTER */}

            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style={styles.statusScroll}
                contentContainerStyle={styles.statusContainer}  >

                {/* ALL */}
                <TouchableOpacity
                    onPress={() => setSelectedStatus(null)}
                    style={[styles.statusChip, selectedStatus === null && styles.activeStatusChip,]} >
                    <Text
                        style={[
                            styles.statusText,
                            selectedStatus === null &&
                            styles.activeStatusText,
                        ]}  >
                        All ({orders.length})
                    </Text>
                </TouchableOpacity>

                {/* STATUS OPTIONS */}
                {FILTER_STATUS_OPTIONS.map((status) => {

                    const isActive = selectedStatus === status.value;
                    // TOTAL COUNT OF STATUS
                    const statusCount = orders.filter(
                        order => order.order_status === status.value
                    ).length;

                    return (
                        <TouchableOpacity
                            key={status.value}
                            onPress={() => setSelectedStatus(status.value)}
                            style={[
                                styles.statusChip,
                                isActive &&
                                styles.activeStatusChip,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    isActive &&
                                    styles.activeStatusText,
                                ]}
                            >
                                {status.label} ({statusCount})
                            </Text>
                        </TouchableOpacity>
                    );
                })}

            </ScrollView>


            {/* ORDERS */}
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) =>
                    item.id.toString()
                }
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
                    <NotFound
                        icon="receipt-outline"
                        title="No Orders Yet"
                        description={
                            selectedStatus
                                ? `No "${selectedStatus.replaceAll("_", " ")}" orders found.`
                                : "There are no customer orders to display."
                        }
                    />
                }
            />

        </View>
    )
}

export default Order