
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../../constants/color";
import useAuthStore from '../../../store/authStore';
import styles from "../../../styles/profile.style";

const Profile = () => {
    const { logout, profile } = useAuthStore();


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

                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addressContent}>
                    <View style={styles.addressIconContainer}>
                        <Ionicons name="location-outline" size={30} color={COLORS.primary} />
                    </View>

                    <View style={styles.addressTextContainer}>
                        <Text style={styles.addressText}>123, Main Street,</Text>
                        <Text style={styles.addressText}>Downtown,</Text>
                        <Text style={styles.addressText}>New York, NY 10001</Text>

                    </View>
                </View>
            </View>

            {/* MENU CARDS */}
            <View style={styles.menuCard}>
                <View style={styles.menuIconContainer}>
                    <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.menuText}>My Orders</Text>
                <Ionicons name="chevron-forward" size={22} color="#AAAAAA" />
            </View>

            {/* LOGOUt CARDS */}
            <TouchableOpacity style={styles.logoutCard} onPress={logout}>
                <View style={styles.menuIconContainer}>
                    <Ionicons name="log-out-outline" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.menuText}>Logout</Text>
                <Ionicons name="chevron-forward" size={22} color="#AAAAAA" />
            </TouchableOpacity>
        </View>
    )
}

export default Profile