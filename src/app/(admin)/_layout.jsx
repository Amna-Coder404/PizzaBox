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

export default function AdminLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#888",

                tabBarShowLabel: true,

                tabBarStyle: {
                    position: "absolute",
                    left: 16,
                    right: 16,
                    bottom: 20,

                    height: 78,
                    borderRadius: 20,

                    backgroundColor: "#1B1B1B",
                    borderTopWidth: 0,

                    elevation: 10,

                    shadowOpacity: 0.15,
                    shadowRadius: 10,
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
                    title: "Orders",
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            name="receipt"
                            color={color}
                            size={size}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="menu"
                options={{
                    title: "Menu",
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            name="pizza"
                            color={color}
                            size={size}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="addPizza"
                options={{
                    title: "Create",
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            name="add-circle"
                            color={color}
                            size={size}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size, focused }) => (
                        <TabIcon
                            name="person"
                            color={color}
                            size={size}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}