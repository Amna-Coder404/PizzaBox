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
        paddingTop: 18,
    },

    /* ===========================
          Header
    =========================== */

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },

    logo: {
        width: 150,
        height: 45,
        resizeMode: "contain",
    },

    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingHorizontal: 18,
        height: 52,
        borderRadius: 26,
    },

    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 8,
    },

    /* ===========================
          Categories
    =========================== */

    categoryContainer: {
        marginBottom: 22,
    },

    categoryContent: {
        paddingRight: 10,
    },

    categoryItem: {
        alignItems: "center",
        marginRight: 18,
    },

    activeCategory: {},

    categoryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#171717",
        borderWidth: 1,
        borderColor: "#2A2A2A",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    activeCategoryIcon: {
        borderColor: COLORS.primary,
        backgroundColor: "#241507",
    },

    categoryText: {
        color: COLORS.gray,
        fontSize: 15,
        fontWeight: "600",
    },

    activeCategoryText: {
        color: COLORS.primary,
    },

    /* ===========================
          Pizza List
    =========================== */

    listContent: {
        paddingBottom: 30,
    },

    pizzaCard: {
        flexDirection: "row",
        backgroundColor: "#171717",
        borderRadius: 18,
        padding: 12,
        borderWidth: 1,
        borderColor: "#262626",
        marginBottom: 16,
    },

    pizzaImage: {
        width: 110,
        height: 110,
        borderRadius: 18,
    },

    pizzaInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-between",
    },

    /* ===========================
          Pizza Details
    =========================== */

    pizzaName: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "700",
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        marginBottom: 8,
    },

    statusDot: {
        width: 9,
        height: 9,
        borderRadius: 5,
        marginRight: 7,
    },

    availableText: {
        color: COLORS.success,
        fontSize: 15,
        fontWeight: "600",
    },

    unavailableText: {
        color: COLORS.red,
        fontSize: 15,
        fontWeight: "600",
    },

    description: {
        color: COLORS.gray,
        fontSize: 14,
        lineHeight: 20,
    },

    price: {
        marginTop: 12,
        color: COLORS.white,
        fontSize: 30,
        fontWeight: "700",
    },

    /* ===========================
          Add Button
    =========================== */

    rightContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },

    addIconButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    disabledButton: {
        borderColor: "#444",
        opacity: 0.45,
    },

    /* ===========================
          Empty State
    =========================== */

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyTitle: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "700",
        marginTop: 20,
    },

    emptySubtitle: {
        marginTop: 10,
        color: COLORS.gray,
        textAlign: "center",
        paddingHorizontal: 35,
        lineHeight: 22,
    },
});