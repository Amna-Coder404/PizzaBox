import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";

const AppButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={loading || disabled}
            style={[
                styles.button,
                disabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={COLORS.white} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        height: 55,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },
    disabled: {
        opacity: 0.6,
    },
});

export default AppButton;