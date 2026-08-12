
import { StyleSheet } from "react-native";
import COLORS from "../constants/color";


export default StyleSheet.create({

    // SCREEN
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 18,
    },

    // HEADER
    header: {
        marginTop: 18,
        marginBottom: 25,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: "700",
    },

    // PROFILE CARD
    profileCard: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.card,

        borderRadius: 18,

        padding: 18,

        marginBottom: 16,
    },

    avatar: {
        width: 100,
        height: 100,

    },

    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },

    profileName: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",

        marginBottom: 6,
    },

    profileEmail: {
        color: "#AAAAAA",
        fontSize: 15,
    },

    // ADDRESS CARD
    addressCard: {
        backgroundColor: COLORS.card,

        borderRadius: 18,

        padding: 18,

        marginBottom: 16,
    },

    addressHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 16,
    },

    addressTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    editButton: {
        paddingHorizontal: 4,
        paddingVertical: 2,
    },

    editText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "700",
    },

    addressContent: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    addressIconContainer: {
        width: 30,

        alignItems: "center",
        justifyContent: "flex-start",

        marginTop: 2,
    },

    addressTextContainer: {
        flex: 1,
        marginLeft: 10,
    },

    addressText: {
        color: "#B5B5B5",
        fontSize: 15,
        lineHeight: 24,
    },

    // MENU CARDS
    menuCard: {
        height: 65,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.card,

        borderRadius: 17,

        paddingHorizontal: 17,

        marginBottom: 14,
    },

    menuIconContainer: {
        width: 38,
        height: 38,

        alignItems: "center",
        justifyContent: "center",
    },

    menuIcon: {
        color: "#C7C7C7",
    },

    menuText: {
        flex: 1,

        color: "#FFFFFF",

        fontSize: 17,
        fontWeight: "500",

        marginLeft: 13,
    },

    menuArrow: {
        color: "#AAAAAA",
    },

    // LOGOUT
    logoutCard: {
        height: 65,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.card,

        borderRadius: 17,

        paddingHorizontal: 17,

        marginBottom: 15,
    },

    logoutIcon: {
        color: "#C7C7C7",
    },

    logoutText: {
        flex: 1,
        color: "#FFFFFF",

        fontSize: 17,
        fontWeight: "500",

        marginLeft: 13,
    },

    // BOTTOM SPACE
    content: {
        paddingBottom: 110,
    },

    // MY ORDERS SCREEN
    ordersContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    ordersHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    backButton: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",

        marginRight: 10,
    },

    ordersTitle: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
    },

    // ORDERS LIST
    listContent: {
        paddingBottom: 110,
    },

    // ORDER CARD
    orderCard: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
    },

    // ORDER HEADER
    orderHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 16,
    },

    orderNumber: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    orderDate: {
        color: "#888888",
        fontSize: 13,

        marginTop: 5,
    },

    // ORDER TOTAL
    total: {
        color: COLORS.primary,
        fontSize: 17,
        fontWeight: "700",
    },

    // STATUS
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.surface,

        borderRadius: 14,

        padding: 12,

        marginBottom: 14,
    },

    statusIcon: {
        width: 42,
        height: 42,

        borderRadius: 21,

        backgroundColor: COLORS.card,

        alignItems: "center",
        justifyContent: "center",

        marginRight: 12,
    },

    statusLabel: {
        color: "#888888",
        fontSize: 12,

        marginBottom: 3,
    },

    statusValue: {
        color: COLORS.primary,

        fontSize: 15,
        fontWeight: "700",

        textTransform: "capitalize",
    },

    // DELIVERY ADDRESS
    addressContainer: {
        flexDirection: "row",
        alignItems: "flex-start",

        paddingVertical: 12,

        borderTopWidth: 1,
        borderTopColor: "#292929",
    },

    address: {
        flex: 1,

        color: "#B5B5B5",

        fontSize: 14,
        lineHeight: 20,

        marginLeft: 9,
    },

    // ORDER FOOTER
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderTopWidth: 1,
        borderTopColor: "#292929",

        paddingTop: 14,

        marginTop: 4,
    },

    label: {
        color: "#888888",
        fontSize: 12,

        marginBottom: 4,
    },

    paymentStatus: {
        color: "#FFFFFF",

        fontSize: 14,
        fontWeight: "600",

        textTransform: "capitalize",
    },

    totalContainer: {
        alignItems: "flex-end",
    },

    // EMPTY ORDERS
    emptyContainer: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 30,
    },

    emptyTitle: {
        color: "#FFFFFF",

        fontSize: 19,
        fontWeight: "700",

        marginTop: 14,
    },

    emptyText: {
        color: "#888888",
        fontSize: 14,
        textAlign: "center",
        marginTop: 6,
    },
});