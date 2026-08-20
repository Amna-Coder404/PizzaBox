import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollContent: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 30,
    },

    /* PROFILE CARD */

    profileCard: {
        backgroundColor: "#171717",
        borderRadius: 22,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#292929",
        marginBottom: 24,
    },

    coverImage: {
        width: "100%",
        height: 125,
        resizeMode: "cover",
    },

    profileContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingBottom: 20,
        marginTop: -42,
    },

    avatarContainer: {
        position: "relative",
    },

    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
        borderWidth: 4,
        borderColor: "#171717",
        backgroundColor: "#222222",
    },

    editButton: {
        position: "absolute",
        right: -2,
        bottom: 2,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#171717",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 15,
        paddingTop: 34,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    ownerText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "700",
        maxWidth: "75%",
    },

    adminBadge: {
        width: 19,
        height: 19,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 7,
    },

    roleText: {
        marginTop: 3,
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "600",
    },

    email: {
        marginTop: 5,
        color: COLORS.muted,
        fontSize: 13,
    },


    /* RESTAURANT INFO */

    restaurantInfo: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#292929",
        paddingHorizontal: 18,
        paddingVertical: 15,
    },

    restaurantIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "rgba(255, 77, 0, 0.12)",
        justifyContent: "center",
        alignItems: "center",
    },

    restaurantDetails: {
        flex: 1,
        marginLeft: 12,
    },

    restaurantLabel: {
        color: COLORS.muted,
        fontSize: 12,
    },

    restaurantName: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
        marginTop: 2,
    },

    activeBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(34, 197, 94, 0.10)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    activeDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#22C55E",
        marginRight: 6,
    },

    activeText: {
        color: "#22C55E",
        fontSize: 12,
        fontWeight: "600",
    },

    historyCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginTop: 12,
        gap: 12,
        marginBottom: 12

    },

    historyIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },

    historyContent: {
        flex: 1,
    },

    historyTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "600",
    },

    historyDescription: {
        color: COLORS.muted,
        fontSize: 12,
        marginTop: 4,
    },

    historyArrow: {
        marginLeft: 4,
    },

    /* LOGOUT */

    logoutCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#171717",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#292929",
        paddingHorizontal: 16,
        height: 64,
    },

    logoutIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "rgba(239, 68, 68, 0.10)",
        justifyContent: "center",
        alignItems: "center",
    },

    logoutText: {
        color: "#EF4444",
        fontSize: 15,
        fontWeight: "600",
        flex: 1,
        marginLeft: 13,
    },

    // addinal
    iconStyle: {
        fontSize: 20,
        color: COLORS.muted
    }
    , statsCard: {
        flexDirection: "row",
        backgroundColor: "#171717",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#292929",
        marginBottom: 22,
        overflow: "hidden",
    },

    statItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
    },

    statValue: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: "700",
        marginTop: 8,
    },

    statLabel: {
        color: COLORS.muted,
        fontSize: 12,
        marginTop: 4,
    },

    statDivider: {
        width: 1,
        backgroundColor: "#292929",
        marginVertical: 15,
    },

    editProfileButton: {
        marginTop: 14,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },

    editProfileText: {
        color: COLORS.white,
        fontSize: 13,
        fontWeight: "600",
    },
});