
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
});