import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
    },

    // HEADER
    header: {
        marginTop: 15,
        marginBottom: 15,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
    },

    // FLATLIST
    list: {
        paddingTop: 5,
        paddingBottom: 310,
    },

    // CART CARD
    card: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.card,

        borderRadius: 18,

        padding: 12,
        marginBottom: 12,

        minHeight: 115,
    },

    image: {
        width: 85,
        height: 85,
        borderRadius: 14,
    },

    info: {
        flex: 1,
        marginLeft: 13,
    },

    name: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    size: {
        color: "#B5B5B5",
        fontSize: 14,
        marginTop: 3,
    },

    price: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
        marginTop: 5,
    },

    // DELETE
    deleteBtn: {
        position: "absolute",
        top: 7,
        right: 7,
    },

    // QUANTITY
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",

        alignSelf: "flex-start",

        backgroundColor: "#111",

        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#333",

        paddingHorizontal: 7,
        paddingVertical: 4,

        marginTop: 7,
    },

    quantityButton: {
        paddingHorizontal: 7,
        paddingVertical: 1,
    },

    quantityText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginHorizontal: 10,
    },

    // FOOTER
    bottomContainer: {
        position: "absolute",

        left: 0,
        right: 0,
        bottom: 98,

        backgroundColor: COLORS.card,

        // borderTopLeftRadius: 24,
        // borderTopRightRadius: 24,

        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 25,

        borderTopWidth: 1,
        borderColor: "#2C2C2C",
    },

    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: 8,
    },

    label: {
        color: "#AAA",
        fontSize: 15,
    },

    value: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "#333",

        marginVertical: 10,
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: 12,
    },

    totalLabel: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
    },

    totalPrice: {
        color: COLORS.primary,
        fontSize: 25,
        fontWeight: "800",
    },

    // EMPTY CART
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginTop: 20,
    },

    emptyText: {
        color: "#999",
        fontSize: 16,
        marginTop: 8,
        textAlign: "center",
    },
});