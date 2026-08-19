import { StyleSheet } from "react-native";
import COLORS from "../constants/color";


export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },


    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background
    },


    loading: {
        color: "#fff",
        fontSize: 16
    },


    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },


    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700"
    },


    image: {
        width: "100%",
        height: 280,
        resizeMode: "cover",
    },


    content: {
        padding: 20,
    },


    name: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 10
    },


    categoryBox: {
        alignSelf: "flex-start",
        backgroundColor: COLORS.primary,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 15
    },


    category: {
        color: "#fff",
        fontWeight: "600"
    },


    description: {
        color: "#aaa",
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 20
    },


    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12
    },


    sizeRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 25
    },


    sizeButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: COLORS.card,
        borderRadius: 12,
        alignItems: "center"
    },


    activeSize: {
        backgroundColor: COLORS.primary
    },


    sizeText: {
        color: "#aaa",
        textTransform: "capitalize",
        fontWeight: "600"
    },


    activeSizeText: {
        color: "#fff"
    },


    priceBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.card,
        padding: 16,
        borderRadius: 15,
        marginBottom: 20
    },


    priceLabel: {
        color: "#aaa",
        fontSize: 16
    },


    price: {
        color: COLORS.secondary,
        fontSize: 22,
        fontWeight: "800"
    },


    quantityBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        marginBottom: 25
    },


    quantity: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700"
    },


    totalBox: {
        backgroundColor: COLORS.card,
        padding: 16,
        borderRadius: 15,
        marginBottom: 20,
    },

    totalText: {
        color: "#aaa",
        fontSize: 18
    },


    totalPrice: {
        color: COLORS.secondary,
        fontSize: 24,
        fontWeight: "900"
    },


    cartButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 18,
        marginBottom: 30
    },


    cartText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginTop: 25,
        marginBottom: 30,
    },
    button: {
        flex: 1,
    },
    totalText: {
        color: "#aaa",
        fontSize: 16,
    },

    totalPrice: {
        color: COLORS.secondary,
        fontSize: 17,
        fontWeight: "700",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    summaryDivider: {
        height: 1,
        backgroundColor: "#333",
        marginVertical: 4,
    },

    finalTotalText: {
        color: "#fff",
        fontSize: 19,
        fontWeight: "800",
    },

    finalTotalPrice: {
        color: COLORS.primary,
        fontSize: 22,
        fontWeight: "900",
    },
});