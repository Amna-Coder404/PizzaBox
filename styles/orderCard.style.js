import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({

    card: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.cardLight,
    },

    /* HEADER */

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    orderNumber: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "800",
    },

    date: {
        color: "#888",
        fontSize: 12,
        marginTop: 4,
    },

    statusBadge: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
        textTransform: "capitalize",
    },

    /* CUSTOMER */

    customerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        justifyContent: "space-between",

        marginBottom: 12,
    },

    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    avatorImage: {
        width: 50,
        height: 50,
        borderRadius: 45,
        borderColor: COLORS.primary,
        borderWidth: 1

    },
    customerName: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
    },

    customerId: {
        color: "#888",
        fontSize: 11,
        marginTop: 3,
    },

    /* ADDRESS */

    addressBox: {
        flexDirection: "row",
        alignItems: "center",

    },

    address: {
        flex: 1,
        color: COLORS.text,
        fontSize: 13,
        marginLeft: 8,
        lineHeight: 18,
    },

    /* ITEMS */

    itemsContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.cardLight,
        paddingVertical: 12,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    pizzaImage: {
        width: 58,
        height: 58,
        borderRadius: 12,
    },

    itemInfo: {
        flex: 1,
        marginLeft: 10,
    },

    pizzaName: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "700",
    },

    pizzaDetails: {
        color: "#999",
        fontSize: 12,
        marginTop: 5,
        textTransform: "capitalize",
    },

    itemPrice: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "700",
    },

    /* FOOTER */

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingTop: 14,
    },

    paymentLabel: {
        color: "#888",
        fontSize: 11,
    },

    paymentStatus: {
        color: COLORS.secondary,
        fontSize: 13,
        fontWeight: "700",
        marginTop: 3,
        textTransform: "capitalize",
    },

    totalBox: {
        alignItems: "flex-end",
    },

    totalLabel: {
        color: "#888",
        fontSize: 11,
    },

    total: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "800",
        marginTop: 2,
    },

});