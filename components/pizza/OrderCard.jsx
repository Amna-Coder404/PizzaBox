import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Text,
    View,
} from "react-native";

import COLORS from "../../constants/color";
import styles from "../../styles/orderCard.style";

const OrderCard = ({ order }) => {

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

                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                        {order.order_status}
                    </Text>
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