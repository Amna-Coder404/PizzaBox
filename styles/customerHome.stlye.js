import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../constants/color";

const { width } = Dimensions.get("window");

export default StyleSheet.create({

    /*CONTAINER*/

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        gap: 12,
        paddingHorizontal: 20,
        paddingBottom: 72,
    },

    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 18,
    },

    /*HEADER*/

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rightIcons: {
        flexDirection: "row",
        gap: 20,
    },

    logo: {
        width: 120,
        height: 130,
        resizeMode: "contain",
    },

    /*CATEGORY FILTER*/


    categoryScroll: {
        height: 50,
        flexGrow: 0,
    },

    categoryContainer: {
        alignItems: "center",
        paddingHorizontal: 4,
        gap: 10,
        // paddingBottom: 12
    },

    categoryChip: {
        height: 36,
        paddingHorizontal: 16,
        borderRadius: 18,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
    },

    activeCategoryChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },

    categoryText: {
        color: COLORS.muted,
        fontSize: 14,
        fontWeight: "600",
    },

    activeCategoryText: {
        color: COLORS.white,
    },
    /*BANNER*/

    bannerContainer: {
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 12,
        height: 210,
        marginBottom: 12,
    },

    bannerImage: {
        width: "100%",
        borderRadius: 12,
        height: 200,
    },

    /*PIZZA LIST*/

    listContent: {
        paddingBottom: 30,
    },

    pizzaCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#171717",
        borderRadius: 18,
        padding: 12,
        borderWidth: 1,
        borderColor: "#262626",
        marginBottom: 16,
        width: "100%",
        gap: 12,
    },

    pizzaImage: {
        width: width * 0.21,
        height: width * 0.26,
        maxWidth: 140,
        maxHeight: 120,
        minWidth: 80,
        minHeight: 90,
        borderRadius: 16,
    },

    rightContent: {
        justifyContent: "space-between",
        flexDirection: "row",
    },

    pizzaInfo: {
        flex: 1,
        minWidth: 0,
    },
    pizzaName: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
        flex: 1,
        minWidth: 0,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },

    availableText: {
        color: COLORS.success,
        fontSize: 13,
        fontWeight: "600",
    },

    unavailableText: {
        color: COLORS.error,
        fontSize: 13,
        fontWeight: "600",
    },

    description: {
        width: 200,
        color: COLORS.text,
        fontSize: 13,
    },

    price: {
        marginTop: 8,
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "700",
    },

    buttonContainer: {
        marginTop: 80,
    },

    orderBtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        borderRadius: 16,
        justifyContent: "center",
    },

    btnText: {
        color: COLORS.white,
    },

    disabledButton: {
        borderColor: "#444",
        opacity: 0.45,
    },

    /*EMPTY STATE*/

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