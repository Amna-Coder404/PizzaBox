import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

const NotFound = ({
    icon,
    title = "Nothing Found",
    description = "There is nothing to display here.",
    children,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity,
                        transform: [{ translateY }],
                    },
                ]}
            >
                {icon && (
                    <Icon
                        source={icon}
                        size={70}
                        color="#FF4D00"
                        style={styles.icon}
                    />
                )}

                <Text style={styles.title}>
                    {title}
                </Text>

                {description ? (
                    <Text style={styles.description}>
                        {description}
                    </Text>
                ) : null}

                {children}
            </Animated.View>
        </View>
    );
};

export default NotFound;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200
        // paddingHorizontal: 24,
    },

    content: {
        alignItems: "center",
    },

    icon: {
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFFFFF",
        textAlign: "center",
    },

    description: {
        marginTop: 10,
        fontSize: 15,
        color: "#9CA3AF",
        textAlign: "center",
        lineHeight: 22,
        maxWidth: 300,
    },
});