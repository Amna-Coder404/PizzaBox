import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 20,
    },

    /* ===========================
          Header Logo
    =========================== */

    logoContainer: {
        alignItems: "center",
        marginBottom: 22,
    },

    logo: {
        width: 150,
        height: 45,
        resizeMode: "contain",
    },

    /* ===========================
          Profile Card
    =========================== */

    profileCard: {
        backgroundColor: "#1A1A1A",
        borderRadius: 22,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2A2A2A",
        marginBottom: 20,
    },

    coverImage: {
        height: 120,
        width: "100%",
    },

    profileContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
        marginTop: -40,
    },

    avatarContainer: {
        position: "relative",
    },

    avatar: {
        width: 95,
        height: 95,
        borderRadius: 48,
        borderWidth: 4,
        borderColor: "#1A1A1A",
    },

    editButton: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 16,
    },

    restaurantName: {
        color: COLORS.white,
        fontSize: 28,
        fontWeight: "700",
    },

    ownerText: {
        marginTop: 6,
        color: COLORS.white,
        fontSize: 16,
    },

    email: {
        marginTop: 8,
        color: COLORS.gray,
        fontSize: 15,
    },

    verifiedIcon: {
        marginLeft: 8,
    },

    /* ===========================
          Statistics Card
    =========================== */

    statsCard: {
        flexDirection: "row",
        backgroundColor: "#171717",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#262626",
        marginBottom: 22,
        overflow: "hidden",
    },

    statItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
    },

    divider: {
        width: 1,
        backgroundColor: "#2A2A2A",
    },

    statValue: {
        marginTop: 12,
        color: COLORS.white,
        fontSize: 28,
        fontWeight: "700",
    },

    statLabel: {
        marginTop: 8,
        color: COLORS.gray,
        fontSize: 14,
    },

    /* ===========================
          Menu Sections
    =========================== */

    menuCard: {
        backgroundColor: "#171717",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#262626",
        marginBottom: 18,
        overflow: "hidden",
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        height: 62,
    },

    menuIcon: {
        width: 30,
        alignItems: "center",
    },

    menuTitle: {
        flex: 1,
        marginLeft: 14,
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "500",
    },

    menuArrow: {
        color: COLORS.gray,
    },

    menuDivider: {
        height: 1,
        backgroundColor: "#2A2A2A",
        marginLeft: 60,
    },

    logoutText: {
        color: "#EF4444",
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
        marginLeft: 14,
    },

    /* ===========================
          Bottom Spacing
    =========================== */

    bottomSpace: {
        height: 30,
    },
});