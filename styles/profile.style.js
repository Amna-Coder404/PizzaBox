import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({

    // PROFILE SCREEN

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 18,
    },

    header: {
        marginTop: 18,
        marginBottom: 18,
    },

    title: {
        color: COLORS.white,
        fontSize: 26,
        fontWeight: "700",
    },

    // PROFILE HEADER

    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#292929",
    },

    avatar: {
        width: 78,
        height: 78,
        borderRadius: 45,
        backgroundColor: COLORS.surface,
    },

    profileInfo: {
        flex: 1,
        marginLeft: 14,
    },

    profileName: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 5,
    },

    profileEmail: {
        color: COLORS.muted,
        fontSize: 13,
        marginBottom: 8,
    },
    orderCountBadge: {
        minWidth: 26,
        height: 26,
        paddingHorizontal: 7,
        borderRadius: 13,
        backgroundColor: "rgba(255, 77, 0, 0.10)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    orderCountText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "700",
    },

    // DELIVERY ADDRESS

    addressCard: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#292929",
    },

    addressHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    addressTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    addressTitleIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: "rgba(34, 197, 94, 0.10)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 9,
    },

    addressTitle: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "700",
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: "rgba(255, 77, 0, 0.10)",
    },

    editText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "700",
    },

    addressContent: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 11,
    },

    addressIconContainer: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1,
    },

    addressTextContainer: {
        flex: 1,
        marginLeft: 8,
    },

    addressText: {
        color: COLORS.muted,
        fontSize: 13,
        lineHeight: 19,
    },


    // MENU CARDS

    menuCard: {
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderRadius: 15,
        paddingHorizontal: 13,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#292929",
    },

    // MY ORDERS ICON

    ordersIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "rgba(255, 77, 0, 0.10)",
        alignItems: "center",
        justifyContent: "center",
    },

    // ABOUT US ICON

    aboutIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "rgba(59, 130, 246, 0.10)",
        alignItems: "center",
        justifyContent: "center",
    },

    // FEEDBACK ICON

    feedbackIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "rgba(168, 85, 247, 0.10)",
        alignItems: "center",
        justifyContent: "center",
    },

    // LOGOUT ICON

    logoutIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "rgba(239, 68, 68, 0.10)",
        alignItems: "center",
        justifyContent: "center",
    },

    menuText: {
        flex: 1,
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 11,
    },

    menuArrow: {
        color: "#777777",
    },


    // ABOUT US MENU

    menuContent: {
        flex: 1,
        marginLeft: 11,
        marginRight: 8,
        justifyContent: "center",
    },

    menuTitle: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "600",
    },

    menuSubtitle: {
        color: COLORS.muted,
        fontSize: 11,
        marginTop: 2,
        lineHeight: 15,
    },


    // FEEDBACK

    feedbackCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#292929",
        padding: 12,
        marginTop: 2,
        marginBottom: 8,
    },

    feedbackContent: {
        flex: 1,
        marginLeft: 11,
        marginRight: 8,
    },

    feedbackTitle: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "600",
    },

    feedbackSubtitle: {
        color: COLORS.muted,
        fontSize: 11,
        lineHeight: 15,
        marginTop: 3,
    },


    // LOGOUT

    logoutCard: {
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderRadius: 15,
        paddingHorizontal: 13,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#292929",
    },

    logoutText: {
        flex: 1,
        color: COLORS.error,
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 11,
    },


    // MY ORDERS
    myOrderHeader: {
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 4,
        marginBottom: 12,
        position: "relative",
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.card,
    },

    myorder: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "700",
    },

    orderCountBadge: {
        minWidth: 32,
        height: 32,
        paddingHorizontal: 8,
        borderRadius: 16,
        backgroundColor: "rgba(255, 77, 0, 0.10)",
        alignItems: "center",
        justifyContent: "center",
    },

    orderCountText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "700",
    },

    // ORDERS SCREEN

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
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "700",
    },

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

    orderHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    orderNumber: {
        color: COLORS.white,
        fontSize: 17,
        fontWeight: "700",
    },

    orderDate: {
        color: "#888888",
        fontSize: 13,
        marginTop: 5,
    },

    total: {
        color: COLORS.primary,
        fontSize: 17,
        fontWeight: "700",
    },


    // ORDER STATUS

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


    // DELIVERY ADDRESS IN ORDER

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
        color: COLORS.white,
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
        color: COLORS.white,
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


    // ABOUT US

    aboutusHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },

    aboutContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 30,
    },

    aboutTitle: {
        color: COLORS.white,
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 24,
    },

    aboutText: {
        color: COLORS.muted,
        fontSize: 15,
        lineHeight: 24,
        marginBottom: 18,
    },

    aboutFooter: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "600",
        lineHeight: 22,
        marginTop: 10,
    },

    funText: {
        color: COLORS.white,
        fontSize: 15,
        lineHeight: 23,
        fontWeight: "600",
        marginBottom: 18,
    },

});