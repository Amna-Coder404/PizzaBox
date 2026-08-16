import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View, } from "react-native";
import { SceneMap, TabBar, TabView, } from "react-native-tab-view";

import MyOrders from "../orders/MyOrders";
import CartContent from "./CartContent";

import COLORS from "../../constants/color";



const CartPager = ({ initialPage = "cart", paymentMethod, setPaymentMethod, onCheckout }) => {

    const getInitialIndex = () => {
        return initialPage === "orders" ? 1 : 0;
    };

    const [index, setIndex] = useState(getInitialIndex());


    useFocusEffect(
        useCallback(() => {
            setIndex(initialPage === "orders" ? 1 : 0);
        }, [initialPage])
    );


    //  * CART SCREEN
    const CartRoute = () => (
        <View style={styles.scene}>
            <CartContent
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onCheckout={onCheckout}
            />
        </View>
    );


    //  * MY ORDERS SCREEN

    const OrdersRoute = () => (
        <View style={styles.scene}>
            <MyOrders />
        </View>
    );


    //  * TAB ROUTES
    const [routes] = useState([
        {
            key: "cart",
            title: "Cart",
        },
        {
            key: "orders",
            title: "My Orders",
        },
    ]);


    //  * Scenes

    const renderScene = SceneMap({
        cart: CartRoute,
        orders: OrdersRoute,
    });

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    {index === 0
                        ? "My Cart"
                        : "My Orders"}
                </Text>
            </View>

            {/* SWIPEABLE TABS */}
            <TabView navigationState={{ index, routes, }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={true}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        style={styles.tabBar}
                        indicatorStyle={styles.indicator}
                        activeColor="#FFFFFF"
                        inactiveColor={COLORS.text}
                        pressColor="transparent"
                        tabStyle={styles.tab}
                        labelStyle={styles.tabLabel}
                    />
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.text,
    },

    tabBar: {
        marginHorizontal: 16,
        marginBottom: 10,

        backgroundColor: COLORS.surface,

        borderRadius: 12,
        elevation: 0,
        shadowOpacity: 0,
    },

    indicator: {
        backgroundColor: COLORS.primary,
        height: "100%",
        borderRadius: 9,
        bottom: 0,
    },

    tab: {
        minHeight: 44,
    },

    tabLabel: {
        fontSize: 14,
        fontWeight: "600",

        textTransform: "none",
    },

    scene: {
        flex: 1,
    },
});

export default CartPager;