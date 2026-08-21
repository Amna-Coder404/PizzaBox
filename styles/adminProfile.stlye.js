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
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 18,
        paddingBottom: 18,

        borderBottomWidth: 1,
        borderBottomColor: "#292929",
    },

    profileHeaderTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "700",
    },

    profileHeaderSubtitle: {
        color: COLORS.muted,
        fontSize: 12,
        marginTop: 3,
    },

    editProfileButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 77, 0, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(255, 77, 0, 0.25)",
    },
    /* PROFILE CARD */
    profileCard: {
        borderRadius: 22,
        borderWidth: 1,
        marginBottom: 24,
        overflow: "hidden",
        paddingTop: 22,
    },

    profileContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingBottom: 22,
    },

    avatarContainer: {
        position: "relative",
    },

    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        borderWidth: 2,
        borderColor: COLORS.primary,
        backgroundColor: "#222222",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    ownerText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "700",
        maxWidth: "78%",
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
        marginTop: 4,
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "600",
    },

    email: {
        marginTop: 5,
        color: COLORS.muted,
        fontSize: 12,
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

        borderWidth: 1,
        borderColor: "#292929",

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
        position: "absolute",
        top: 14,
        right: 14,

        width: 36,
        height: 36,
        borderRadius: 18,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "rgba(255, 77, 0, 0.10)",

        borderWidth: 1,
        borderColor: "rgba(255, 77, 0, 0.25)",

        zIndex: 10,
    },

});