import { ActivityIndicator, Image } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

import COLORS from "../constants/color";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function Loader() {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 2500,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, []);

    const logoStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotation.value}deg`,
                },
            ],
        };
    });

    return (
        <Animated.View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#121212",
            }}
        >
            <AnimatedImage
                source={require("../assets/images/app-images/logo.png")}
                style={[
                    {
                        width: 130,
                        height: 130,
                        marginBottom: 24,
                    },
                    logoStyle,
                ]}
                resizeMode="contain"
            />

            <ActivityIndicator
                size="large"
                color={COLORS.primary}
            />
        </Animated.View>
    );
}