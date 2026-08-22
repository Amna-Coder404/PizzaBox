import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    /* CONTAINER */

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingBottom: 80,
    },

    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 18,
    },

    /* HEADER */

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },

    logo: {
        width: 120,
        height: 120,
        resizeMode: "contain",
    },

    /* CATEGORY LIST */

    categoryList: {
        gap: 10,
        paddingBottom: 18,


    },

    categoryCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: COLORS.surface,
        overflow: "hidden",
        padding: 12,

        height: 52
    },

    categoryMain: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,

        gap: 7,
    },

    categoryName: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "600",
        maxWidth: 100,
    },
    activeBorderColor: {
        borderColor: COLORS.primary,
        borderWidth: 1,
    },
    activeCategoryName: {
        color: COLORS.primary,
    },

    categoryActions: {
        flexDirection: "row",
        gap: 6,
        paddingRight: 8,
    },

    categoryAction: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
    },

    addCategoryCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 14,
        height: 44,
        borderRadius: 24,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: COLORS.primary,
        backgroundColor: COLORS.card,
    },

    addCategoryText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "700",
    },

    /* PIZZA LIST */

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
        marginTop: 12
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

    /* PIZZA DETAILS */

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
        color: COLORS.error,
        fontSize: 15,
        fontWeight: "600",
    },

    description: {
        color: COLORS.text,
        fontSize: 14,
        lineHeight: 20,
    },

    price: {
        marginTop: 12,
        color: COLORS.white,
        fontSize: 30,
        fontWeight: "700",
    },

    /* PIZZA ACTIONS */

    rightContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        gap: 12,
    },

    actionButton: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    disabledButton: {
        borderColor: "#444",
        opacity: 0.45,
    },

    /* EMPTY STATE */

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

    /* MENU TEXT */
    noCategoriesText: {
        color: COLORS.gray,
        fontSize: 14,
        marginBottom: 18,
    },

    cateContainer: {
        width: "100%",
        flexDirection: "row",
        gap: 50,
        alignItems: "baseline",

    },

    noCategoryMessage: {
        paddingHorizontal: 4,
        paddingBottom: 8,
    },

    noCategoryText: {
        fontSize: 13,
        color: COLORS.muted,
    },
});