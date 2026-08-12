import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { useState } from "react";
import COLORS from "../../constants/color";
import { updateOrderStatus } from "../../services/admin/orders";
import styles from "../../styles/orderCard.style";


const STATUS_OPTIONS = [
    {
        value: "pending",
        label: "Pending",
    },
    {
        value: "preparing",
        label: "Preparing",
    },
    {
        value: "out_for_delivery",
        label: "Out for Delivery",
    },
    {
        value: "delivered",
        label: "Delivered",
    },
];


const OrderCard = ({ order, onStatusUpdated }) => {
    const [updating, setUpdating] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const handleStatusChange = async (status) => {
        if (status === order.order_status) {
            setShowStatusModal(false);
            return;
        }

        try {
            setUpdating(true);
            await updateOrderStatus(order.id, status);

            setShowStatusModal(false);
            // Tell paren to fetch orders again
            onStatusUpdated?.();
        } catch (error) {
            console.log("Status updateed ERROR!", error);
        } finally {
            setUpdating(false);
        }

    }

    return (
        <View style={styles.card}>

            {/* HEADER */}
            <View style={styles.header}>

                <View>
                    <Text style={styles.orderNumber}>
                        Order #{order.id}
                    </Text>

                    <Text style={styles.date}>
                        {new Date(order.created_at).toLocaleDateString()}
                    </Text>
                </View>
                {/* STATUS OPTIONS */}

                {/* STATUS DROPDOWN */}
                <View style={styles.dropdownContainer}>

                    <TouchableOpacity
                        style={styles.statusBadge}
                        onPress={() => setShowStatusModal(!showStatusModal)}
                        disabled={updating}
                    >
                        <Text style={styles.statusText}>
                            {
                                STATUS_OPTIONS.find(
                                    (status) =>
                                        status.value === order.order_status
                                )?.label || "Pending"
                            }
                        </Text>

                        <Ionicons
                            name={
                                showStatusModal
                                    ? "chevron-up"
                                    : "chevron-down"
                            }
                            size={18}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>

                    {showStatusModal && (
                        <View style={styles.dropdown}>

                            {STATUS_OPTIONS.map((status) => (
                                <TouchableOpacity
                                    key={status.value}
                                    style={[
                                        styles.statusOption,
                                        order.order_status === status.value &&
                                        styles.selectedStatus,
                                    ]}
                                    onPress={() =>
                                        handleStatusChange(status.value)
                                    }
                                    disabled={updating}
                                >
                                    <Text
                                        style={[
                                            styles.statusOptionText,
                                            order.order_status === status.value &&
                                            styles.selectedStatusText,
                                        ]}
                                    >
                                        {status.label}
                                    </Text>

                                    {order.order_status === status.value && (
                                        <Ionicons
                                            name="checkmark"
                                            size={20}
                                            color={COLORS.primary}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}

                        </View>
                    )}

                </View>

            </View>

            {/* CUSTOMER */}
            <View style={styles.customerRow}>

                <View style={styles.iconBox}>
                    <Image source={{ uri: order.profile?.avatar_url }} style={styles.avatorImage} />
                </View>

                <View>
                    <Text style={styles.customerName}>
                        {order.profile?.name}
                    </Text>

                    <Text style={styles.customerId}>
                        #{order.user_id.slice(0, 8)}
                    </Text>
                </View>
                {/* ADDRESS */}
                <View style={styles.addressBox}>

                    <Ionicons
                        name="location-outline"
                        size={21}
                        color={COLORS.primary}
                    />

                    <Text style={styles.address}>
                        {order.delivery_address || "No delivery address"}
                    </Text>

                </View>
            </View>



            {/* PIZZA ITEMS */}
            <View style={styles.itemsContainer}>

                {order.order_items?.map((item) => (

                    <View
                        key={item.id}
                        style={styles.item}
                    >

                        <Image
                            source={{
                                uri: item.pizzas?.image_url,
                            }}
                            style={styles.pizzaImage}
                        />

                        <View style={styles.itemInfo}>

                            <Text style={styles.pizzaName}>
                                {item.pizzas?.name}
                            </Text>

                            <Text style={styles.pizzaDetails}>
                                {item.size} × {item.quantity}
                            </Text>

                        </View>

                        <Text style={styles.itemPrice}>
                            Rs. {item.unit_price}
                        </Text>

                    </View>

                ))}

            </View>

            {/* FOOTER */}
            <View style={styles.footer}>

                <View>

                    <Text style={styles.paymentLabel}>
                        Payment
                    </Text>

                    <Text style={styles.paymentStatus}>
                        {order.payment_status}
                    </Text>

                </View>

                <View style={styles.totalBox}>

                    <Text style={styles.totalLabel}>
                        Total
                    </Text>

                    <Text style={styles.total}>
                        Rs. {order.total_price}
                    </Text>

                </View>

            </View>

        </View>
    );
};

export default OrderCard;