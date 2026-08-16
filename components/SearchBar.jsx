import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Searchbar } from "react-native-paper";

const AppSearchBar = ({
    visible,
    value,
    onChangeText,
    placeholder = "Search pizzas...",
}) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [visible]);

    return (
        <Animated.View
            style={{
                overflow: "hidden",
                opacity: animation,
                maxHeight: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 70],
                }),
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-10, 0],
                        }),
                    },
                ],
            }}
        >
            <Searchbar
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#fff"
                iconColor="#fff"
                inputStyle={{ color: "#fff" }}
                elevation={0}
                style={{
                    marginHorizontal: 16,
                    // marginVertical: 10,
                    borderRadius: 999,
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: "#fff",
                }}
            />
        </Animated.View>
    );
};

export default AppSearchBar;