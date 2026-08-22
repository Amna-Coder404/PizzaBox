import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import COLORS from "../../../constants/color";
import { getUserLocation } from "../../../services/location";
import { updateProfileLocation } from "../../../services/profile";
import useAuthStore from "../../../store/authStore";

import styles from "../../../styles/location.style";

const Location = ({ visible, onClose }) => {
    const { session, setProfile } = useAuthStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAllowLocation = async () => {
        if (loading) return;

        setLoading(true);
        setError("");

        try {
            // Get GPS + readable address
            const location = await getUserLocation();

            // Make sure user is logged in
            if (!session?.user?.id) {
                throw new Error(
                    "User session not found. Please login again."
                );
            }

            // Save location to Supabase
            const updatedProfile =
                await updateProfileLocation(
                    session.user.id,
                    location
                );

            // Update Zustand
            setProfile(updatedProfile);

            // Close modal
            onClose();

        } catch (error) {
            console.log(
                "LOCATION ERROR:",
                error?.message || error
            );

            setError(
                error?.message ||
                "Unable to get your location."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>

                <View style={styles.container}>

                    {/* CLOSE */}

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                        disabled={loading}
                    >
                        <Ionicons
                            name="close"
                            size={24}
                            color={COLORS.text}
                        />
                    </TouchableOpacity>

                    {/* ICON */}

                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="location"
                            size={42}
                            color={COLORS.primary}
                        />
                    </View>

                    {/* TITLE */}

                    <Text style={styles.title}>
                        Change Location
                    </Text>

                    {/* DESCRIPTION */}

                    <Text style={styles.description}>
                        PizzaBox needs your location to set
                        your delivery address and provide
                        accurate delivery.
                    </Text>

                    {/* ERROR */}

                    {error ? (
                        <Text style={styles.errorText}>
                            {error}
                        </Text>
                    ) : null}

                    {/* BUTTON */}

                    <TouchableOpacity
                        style={[
                            styles.allowButton,
                            loading &&
                            styles.disabledButton,
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

                                <Text
                                    style={
                                        styles.allowButtonText
                                    }
                                >
                                    Use Current Location
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
                            Your location is used only to
                            provide your delivery address.
                        </Text>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default Location;