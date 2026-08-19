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
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    hideButton: {
        padding: 6,
    },
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

    // STATUS
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,

        backgroundColor: "#2A1A12",
        borderWidth: 1,
        borderColor: COLORS.primary,

        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
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
    dropdownContainer: {
        position: "relative",
        zIndex: 100,
    },

    statusBadge: {
        minWidth: 130,
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.primary,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    statusText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
    },

    dropdown: {
        position: "absolute",
        top: 46,
        right: 0,
        width: 180,

        backgroundColor: COLORS.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.surface,

        padding: 6,

        zIndex: 1000,

        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },

    statusOption: {
        minHeight: 42,
        paddingHorizontal: 12,
        borderRadius: 8,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectedStatus: {
        backgroundColor: COLORS.surface,
    },

    statusOptionText: {
        color: "#fff",
        fontSize: 14,
    },

    selectedStatusText: {
        color: COLORS.primary,
        fontWeight: "600",
    },

    cancelledBadge: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#2A1515",
        borderWidth: 1,
        borderColor: "#EF4444",
    },

    cancelledStatusText: {
        color: "#EF4444",
        fontSize: 13,
        fontWeight: "700",
        textTransform: "uppercase",
    },
    refundedStatus: {
        color: "#22C55E",
        fontWeight: "700",
    },
});