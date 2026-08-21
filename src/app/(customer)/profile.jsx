
import { Ionicons } from "@expo/vector-icons";

import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import Aboutus from "../../../components/Aboutus";
import AddressModal from "../../../components/pizza/AddressModal";
import COLORS from "../../../constants/color";
import { updateProfile } from "../../../services/profile";
import useAuthStore from '../../../store/authStore';
import styles from "../../../styles/profile.style";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import EditProfileModal from "../../../components/EditProfileModal";
import ProfileImagePreview from "../../../components/ProfileImagePreview";
import { getMyOrders } from "../../../services/order";



const Profile = () => {
    const { logout, profile, setProfile, } = useAuthStore();
    const [visible, setVisible] = useState(false);
    const [address, setAddress] = useState(profile?.address || "");
    const [saving, setSaving] = useState(false);

    const [showAboutUs, setShowAboutUs] = useState(false);
    const [orderCount, setOrderCount] = useState(0);
    const [editModalVisible, setEditModalVisible] = useState(false);


    const handleFeedback = async () => {
        const email = "kamalgroup272@gmail.com";

        const subject = encodeURIComponent(
            "PizzaBox Feedback"
        )

        const body = encodeURIComponent(
            `Hi PizzaBox Team, \n\n` +
            `I would like to share some feedback : \n\n\n` +
            `Thank You!`
        );

        const url = `mailto:${email}?subject=${subject}&body=${body}`;

        try {
            await Linking.openURL(url);

        } catch (error) {
            Alert.alert("Email Not Available", "Please contact us through our email.");
        }
    }


    const handleEditAddress = () => {
        setAddress(profile?.address || "");
        setVisible(true);
    };

    const handleSaveAddress = async () => {
        if (!address.trim()) {
            Alert.alert(
                "Address Required",
                "Please enter your delivery address."
            );
            return;
        }

        try {
            setSaving(true);

            const updatedProfile = await updateProfile(
                profile.id,
                {
                    address: address.trim(),
                }
            );

            // Update Zustand profile
            setProfile(updatedProfile);

            // CLose modal
            setVisible(false);
            Alert.alert(
                "Success",
                "Delivery address updated successfully."
            );
        } catch (error) {
            Alert.alert(
                "Error",
                error.message || "Failed to update address."
            );
        } finally {
            setSaving(false);
        }
    }
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            console.log("LOGOUT ERROR:", error);

                            Alert.alert(
                                "Logout Failed",
                                error?.message || "Unable to logout. Please try again."
                            );
                        }
                    },
                },
            ]
        );
    };

    useFocusEffect(
        useCallback(() => {
            const fetchOrderCount = async () => {
                if (!profile?.id) {
                    setOrderCount(0);
                    return;
                }

                try {
                    const orders = await getMyOrders(profile.id);

                    setOrderCount(orders?.length || 0);
                } catch (error) {
                    console.log("GET ORDER COUNT ERROR:", error);
                }
            };

            fetchOrderCount();
        }, [profile?.id])
    );

    if (showAboutUs) return <Aboutus onBack={() => setShowAboutUs(false)} />



    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>


            {/* PROFILE CARD */}
            {/* PROFILE CARD */}
            <View style={styles.profileCard}>

                {!profile ? (
                    <View style={styles.profileLoader}>
                        <ActivityIndicator
                            size="small"
                            color={COLORS.primary}
                        />
                    </View>
                ) : (
                    <>
                        {/* EDIT PROFILE - TOP RIGHT */}
                        <TouchableOpacity
                            style={styles.editProfileButton}
                            onPress={() => setEditModalVisible(true)}
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name="pencil-outline"
                                size={19}
                                color={COLORS.primary}
                            />
                        </TouchableOpacity>

                        {/* PROFILE IMAGE */}
                        <View style={styles.imageSection}>
                            <ProfileImagePreview
                                uri={profile?.avatar_url}
                                style={styles.profileImage}
                            />
                        </View>

                        {/* PROFILE INFO */}
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>
                                {profile.name}
                            </Text>

                            <Text style={styles.profileEmail}>
                                {profile.email}
                            </Text>
                        </View>
                    </>
                )}

            </View>

            {/* DELIVERY ADDRESS */}
            <View style={styles.addressCard}>

                <View style={styles.addressHeader}>

                    <View style={styles.addressTitleContainer}>

                        <Text style={styles.addressTitle}>
                            Delivery Address
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.editButton} onPress={handleEditAddress}  >

                        <Ionicons name="pencil-outline" size={15} color={COLORS.primary} />

                        <Text style={styles.editText}>
                            Edit
                        </Text>
                    </TouchableOpacity>

                </View>


                <View style={styles.addressContent}>
                    <View style={styles.sectionIconContainer}>
                        <Ionicons name="location-outline" color={COLORS.primary} size={18} />
                    </View>
                    <View style={styles.addressTextContainer}>

                        <Text style={styles.addressText}>
                            {profile?.address
                                ? profile.address
                                : "No delivery address added."}
                        </Text>
                    </View>

                </View>

            </View>


            {/* MY ORDERS */}<TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                    router.push({
                        pathname: "/(customer)/cart",
                        params: {
                            page: "orders",
                        },
                    })
                }
                activeOpacity={0.75}
            >

                <View style={styles.menuIconContainer}>
                    <Ionicons name="receipt-outline" size={21} color={COLORS.primary} />
                </View>

                <Text style={styles.menuText}>
                    My Orders
                </Text>
                <View style={styles.orderCountBadge}>
                    <Text style={styles.orderCountText}>
                        {orderCount}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#777777" />

            </TouchableOpacity>


            {/* ABOUT US */}
            <TouchableOpacity style={styles.menuCard} onPress={() => setShowAboutUs(true)} activeOpacity={0.75} >

                <View style={styles.menuIconContainer}>
                    <Ionicons name="information-circle-outline" size={21} color={COLORS.primary} />
                </View>

                <View style={styles.menuContent}>

                    <Text style={styles.menuTitle}>
                        About Us
                    </Text>

                    <Text style={styles.menuSubtitle}>
                        Learn more about PizzaBox
                    </Text>

                </View>

                <Ionicons name="chevron-forward" size={20} color="#777777" />

            </TouchableOpacity>


            {/* FEEDBACK */}
            <TouchableOpacity style={styles.menuCard} onPress={handleFeedback} activeOpacity={0.75}  >
                <View style={styles.menuIconContainer}>
                    <Ionicons name="chatbubble-ellipses-outline" size={21} color={COLORS.primary}
                    />
                </View>

                <View style={styles.menuContent}>

                    <Text style={styles.menuTitle}>
                        Tell us what you think
                    </Text>

                    <Text style={styles.menuSubtitle}>
                        Share feedback or suggestions
                    </Text>

                </View>

                <Ionicons name="chevron-forward" size={20} color="#777777" />

            </TouchableOpacity>


            {/* LOGOUT */}
            <TouchableOpacity style={styles.logoutCard} onPress={handleLogout} activeOpacity={0.75} >
                <View style={styles.logoutIconContainer}>
                    <Ionicons name="log-out-outline" size={21} color={COLORS.error} />
                </View>

                <Text style={styles.logoutText}>
                    Logout
                </Text>

                <Ionicons name="chevron-forward" size={20} color="#777777" />

            </TouchableOpacity>


            {/* ADDRESS MODAL */}
            <AddressModal
                visible={visible}
                onClose={() => setVisible(false)}
                onSave={handleSaveAddress}
                saving={saving}
                address={address}
                onChangeAddress={setAddress}
            />


            <EditProfileModal
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                profile={profile}

            />

        </View>
    )
}

export default Profile