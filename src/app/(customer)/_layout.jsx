import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Animated, {
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import COLORS from "../../../constants/color";




function TabIcon({ name, color, size, focused }) {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withSpring(focused ? 1.15 : 1),
            },
        ],
    }));

    return (
        <Animated.View style={animatedStyle}>
            <Ionicons
                name={name}
                size={size}
                color={color}
            />
        </Animated.View>
    );
}


export default function CustomerLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#888",
                tabBarShowLabel: true,

                tabBarStyle: {
                    position: "absolute",
                    height: 78,
                    backgroundColor: "#1B1B1B",
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginBottom: 6,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}