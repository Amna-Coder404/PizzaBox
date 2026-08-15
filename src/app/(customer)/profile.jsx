
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import Aboutus from "../../../components/Aboutus";
import MyOrders from "../../../components/orders/MyOrders";
import AddressModal from "../../../components/pizza/AddressModal";
import COLORS from "../../../constants/color";
import { updateProfile } from "../../../services/profile";
import useAuthStore from '../../../store/authStore';
import styles from "../../../styles/profile.style";

const Profile = () => {
    const { logout, profile, setProfile } = useAuthStore();
    const [visible, setVisible] = useState(false);
    const [address, setAddress] = useState(profile?.address || "");
    const [saving, setSaving] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);


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


    if (showOrders) return <MyOrders onBack={() => setShowOrders(false)} />
    if (showAboutUs) return <Aboutus onBack={() => setShowAboutUs(false)} />



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>

            </View>

            {/* PROFILE CARD */}
            <View style={styles.profileCard}>

                <Image source={{ uri: profile?.avatar_url }} style={styles.avatar} />



                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>
                        {profile?.name}
                    </Text>

                    <Text style={styles.profileEmail}>
                        {profile?.email}
                    </Text>
                </View>

            </View>

            {/* ADDRESS CARD */}
            <View style={styles.addressCard}>
                <View style={styles.addressHeader}>
                    <Text style={styles.addressTitle}>Delivery Address</Text>

                    <TouchableOpacity style={styles.editButton} onPress={handleEditAddress}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addressContent}>
                    <View style={styles.addressIconContainer}>
                        <Ionicons name="location-outline" size={30} color={COLORS.primary} />
                    </View>

                    <View style={styles.addressTextContainer}>
                        {profile?.address ? (
                            <Text style={styles.addressText}>
                                {profile.address}
                            </Text>
                        ) : (
                            <Text style={styles.addressText}>
                                No delivery address added.
                            </Text>
                        )}

                    </View>
                </View>
            </View>


            {/* MENU CARDS */}
            <TouchableOpacity style={styles.menuCard} onPress={() => setShowOrders(true)}>
                <View style={styles.menuIconContainer}>
                    <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.menuText}>My Orders</Text>
                <Ionicons name="chevron-forward" size={22} color="#AAAAAA" />
            </TouchableOpacity>


            {/* ABOUT US */}
            <TouchableOpacity style={styles.menuCard} onPress={() => setShowAboutUs(true)}>
                <View style={styles.menuIconContainer}>
                    <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />

                </View>
                <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>
                        About Us
                    </Text>

                    <Text style={styles.menuSubtitle}>
                        Learn more about PizzaBox
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#AAAAAA" />

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.feedbackCard}
                onPress={handleFeedback}
                activeOpacity={0.8}
            >
                <View style={styles.feedbackIconContainer}>
                    <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={24}
                        color={COLORS.primary}
                    />
                </View>

                <View style={styles.feedbackContent}>
                    <Text style={styles.feedbackTitle}>
                        💬 Tell us what you think
                    </Text>

                    <Text style={styles.feedbackSubtitle}>
                        Have a suggestion or found something we can improve?
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={22}
                    color="#AAAAAA"
                />
            </TouchableOpacity>



            {/* LOGOUt CARDS */}
            <TouchableOpacity style={styles.logoutCard} onPress={logout}>
                <View style={styles.menuIconContainer}>
                    <Ionicons name="log-out-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.menuText}>Logout</Text>
                <Ionicons name="chevron-forward" size={22} color="#AAAAAA" />
            </TouchableOpacity>


            {/* ADDRESS MODAL  */}
            <AddressModal
                visible={visible}
                onClose={() => setVisible(false)}
                onSave={handleSaveAddress}
                saving={saving}
                address={address}
                onChangeAddress={setAddress}
            />
        </View>
    )
}

export default Profile