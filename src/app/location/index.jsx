import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator, Text, TouchableOpacity, View
} from "react-native";


import { getUserLocation } from "../../../services/location";
import { updateProfileLocation } from "../../../services/profile";
import useAuthStore from "../../../store/authStore";

import styles from "../../../styles/location.style";
import COLORS from "../../../constants/color";

const Location = () => {
    const router = useRouter();

    const { session, setProfile } = useAuthStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAllowLocation = async () => {
        if (loading) return;

        setLoading(true);
        setError("");

        try {
            // Make sure the user is logged in
            if (!session?.user?.id) {
                throw new Error(
                    "Your session has expired. Please login again."
                );
            }

            // Get GPS coordinates + readable address
            const location = await getUserLocation();

            console.log("USER LOCATION:", location);

            // Save location in Supabase
            const updatedProfile = await updateProfileLocation(
                session.user.id,
                location
            );

            // Update Zustand
            setProfile(updatedProfile);

            // Location is now saved → enter customer app
            router.replace("/(customer)");
        } catch (error) {
            console.log(
                "LOCATION ERROR:",
                error?.message || error
            );

            setError(
                error?.message ||
                "Unable to get your location. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* LOCATION ICON */}
            <View style={styles.iconContainer}>
                <Ionicons
                    name="location"
                    size={42}
                    color={COLORS.primary}
                />
            </View>

            {/* TITLE */}
            <Text style={styles.title}>
                Allow Location Access
            </Text>

            {/* DESCRIPTION */}
            <Text style={styles.description}>
                PizzaBox needs your location to set your
                delivery address and provide accurate
                delivery.
            </Text>

            {/* ERROR */}
            {error ? (
                <View style={styles.errorContainer}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={20}
                        color={COLORS.error}
                    />

                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                </View>
            ) : null}

            {/* ALLOW LOCATION BUTTON */}
            <TouchableOpacity
                style={[
                    styles.allowButton,
                    loading && styles.disabledButton,
                ]}
                onPress={handleAllowLocation}
                disabled={loading}
                activeOpacity={0.8}
            >
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={COLORS.white}
                    />
                ) : (
                    <>
                        <Ionicons
                            name="location-outline"
                            size={20}
                            color={COLORS.white}
                        />

                        <Text style={styles.allowButtonText}>
                            Allow Location
                        </Text>
                    </>
                )}
            </TouchableOpacity>

            {/* INFORMATION */}
            <View style={styles.infoBox}>
                <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color={COLORS.muted}
                />

                <Text style={styles.infoText}>
                    Your location is used to set your delivery
                    address and help us deliver your orders
                    accurately.
                </Text>
            </View>

        </View>
    );
};

export default Location;