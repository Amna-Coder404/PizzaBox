import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

import useNetWorkStatus from "../../hooks/useNetworkStatus";
import styles from "../../styles/netInfo.stlye";

const InternetBanner = () => {
    const { isOnline } = useNetWorkStatus();

    const slideAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: isOnline ? -100 : 0,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
        }).start();
    }, [isOnline]);

    return (
        <Animated.View
            style={[
                styles.banner,
                {
                    transform: [
                        {
                            translateY: slideAnim,
                        },
                    ],
                },
            ]}
        >
            <View style={styles.iconContainer}>
                <Ionicons
                    name="cloud-offline-outline"
                    size={22}
                    color="#fff"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    You're offline
                </Text>

                <Text style={styles.message}>
                    Some features may be unavailable until you're back online.
                </Text>
            </View>

            <View style={styles.statusDot} />
        </Animated.View>
    );
};

export default InternetBanner;

