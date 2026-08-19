import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import OrderHistory from "../../../components/orders/OrderHistory";
import COLORS from "../../../constants/color";
import { getAdminOrderStats } from "../../../services/admin/orders";
import useAuthStore from "../../../store/authStore";
import styles from "../../../styles/adminProfile.stlye";



const Profile = () => {
    const { logout, profile } = useAuthStore();
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, });
    const [showOrderHistory, setShowOrderHistory] = useState(false);


    useFocusEffect(
        useCallback(() => {
            const loadStats = async () => {
                try {
                    const data = await getAdminOrderStats();
                    setStats(data);
                } catch (error) {
                    console.log("STATS ERROR:", error);
                }
            };

            loadStats();
        }, [])
    );



    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>

            {/* PROFILE CARD */}
            <View style={styles.profileCard}>

                {/* COVER Card Image*/}
                <Image
                    source={require("../../../assets/images/app-images/coverImage.png")}
                    style={styles.coverImage}
                />

                {/* TODO LATER : add imag picker and store this image frm supabse storage  */}
                {/*          <Image source={{ uri: profile?.avatar_url }} style={styles.avatar} /> */}
                {/* PROFILE CONTENT */}
                <View style={styles.profileContent}>

                    {/* AVATAR */}
                    <View style={styles.avatarContainer}>

                        <Image
                            source={require("../../../assets/images/app-images/owner-image.png")} style={styles.avatar}
                        />

                        <TouchableOpacity style={styles.editButton} activeOpacity={0.8} >
                            <Ionicons name="camera" size={14} color={COLORS.white} />
                        </TouchableOpacity>

                    </View>


                    {/* PROFILE INFO */}
                    <View style={styles.profileInfo}>

                        <View style={styles.nameRow}>
                            <Text
                                style={styles.ownerText}
                                numberOfLines={1}>
                                {profile?.name || "Owner"}
                            </Text>

                            <View style={styles.adminBadge}>
                                <Ionicons name="checkmark" size={12} color={COLORS.white}
                                />
                            </View>
                        </View>

                        <Text style={styles.roleText}>
                            Restaurant Owner
                        </Text>

                        <Text style={styles.email} numberOfLines={1}   >
                            {profile?.email}
                        </Text>

                    </View>

                </View>

                {/* TOTAL ORDERS & TOTAL MONEY */}
                <View style={styles.statsCard}>

                    {/* TOTAL ORDERS */}
                    <View style={styles.statItem}>
                        <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />

                        <Text style={styles.statValue}>
                            {stats.totalOrders}
                        </Text>

                        <Text style={styles.statLabel}>
                            Total Orders
                        </Text>
                    </View>


                    {/* DIVIDER */}
                    <View style={styles.statDivider} />
                    {/* TOTAL REVENUE */}
                    <View style={styles.statItem}>
                        <FontAwesome5 name="coins" size={24} color={COLORS.primary} />

                        <Text style={styles.statValue}>
                            Rs. {stats.totalRevenue.toLocaleString()}
                        </Text>
                        <Text style={styles.statLabel}>
                            Total Revenue
                        </Text>
                    </View>

                </View>

                {/* RESTAURANT INFO */}
                <View style={styles.restaurantInfo}>

                    <View style={styles.restaurantIcon}>
                        <Ionicons
                            name="restaurant-outline"
                            size={20}
                            color={COLORS.primary}
                        />
                    </View>

                    <View style={styles.restaurantDetails}>
                        <Text style={styles.restaurantLabel}>
                            Restaurant
                        </Text>

                        <Text style={styles.restaurantName}>
                            PizzaBox
                        </Text>
                    </View>

                    <View style={styles.activeBadge}>
                        <View style={styles.activeDot} />

                        <Text style={styles.activeText}>
                            Active
                        </Text>
                    </View>

                </View>

            </View>


            {/* ORDER HISTORY */}
            <TouchableOpacity
                style={styles.historyCard}
                onPress={() => setShowOrderHistory(true)}
                activeOpacity={0.7}
            >
                <View style={styles.historyIconContainer}>
                    <Ionicons
                        name="time-outline"
                        size={22}
                        color={COLORS.primary}
                    />
                </View>

                <View style={styles.historyContent}>
                    <Text style={styles.historyTitle}>
                        Order History
                    </Text>

                    <Text style={styles.historyDescription}>
                        View completed and cancelled orders
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.muted}
                />
            </TouchableOpacity>


            {/* LOGOUT */}
            <TouchableOpacity style={styles.logoutCard} onPress={logout} activeOpacity={0.7}>
                <View style={styles.logoutIconContainer}>
                    <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
                </View>

                <Text style={styles.logoutText}>
                    Logout
                </Text>

                <Ionicons name="chevron-forward" style={styles.iconStyle} />
            </TouchableOpacity>
            <OrderHistory
                visible={showOrderHistory}
                onClose={() => setShowOrderHistory(false)}
            />
        </ScrollView >
    );
};

export default Profile;