import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, View } from 'react-native'

import Loader from "../../../components/Loading"
import NotFound from "../../../components/NotFound"
import OrderCard from '../../../components/pizza/OrderCard'
import COLORS from '../../../constants/color'
import { getAdminOrders } from '../../../services/admin/orders'
import styles from "../../../styles/orders.styles"

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const data = await getAdminOrders();
            setOrders(data); //for display on Ui

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

    if (loading) return <Loader />


    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require("../../../assets/images/app-images/logo-header.png")}
                    style={styles.logo}
                />

                <Ionicons
                    name="notifications"
                    color={COLORS.text}
                    size={24}
                />
            </View>

            {/* ORDERS */}
            <FlatList
                data={orders}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (
                    <OrderCard order={item} onStatusUpdated={fetchOrders} />
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
                        description="There are no customer orders to display."
                    />
                }
            />


        </View>
    )
}

export default Order