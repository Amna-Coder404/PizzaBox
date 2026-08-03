import { Button } from "react-native-paper";
import COLORS from "../constants/color";

export default function AppButton({
    title,
    icon,
    onPress,
    loading,
    disabled,
}) {
    return (
        <Button
            mode="contained"
            icon={icon}
            loading={loading}
            disabled={disabled || loading}
            onPress={onPress}
            buttonColor={COLORS.primary}
            textColor={COLORS.white}
            style={{
                height: 55,
                borderRadius: 14,
                justifyContent: "center",
            }}
        >
            {title}
        </Button>
    );
}