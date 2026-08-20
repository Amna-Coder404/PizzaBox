import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    // BANNER
    banner: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,

        zIndex: 9999,
        elevation: 9999,

        minHeight: 72,

        paddingHorizontal: 18,
        paddingVertical: 12,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#181818",

        borderBottomWidth: 1,
        borderBottomColor: "#2A2A2A",

        shadowOffset: {
            width: 0,
            height: 4,
        },

        shadowOpacity: 0.25,
        shadowRadius: 8,

        shadowColor: "#000",
    },

    iconContainer: {
        width: 42,
        height: 42,

        borderRadius: 14,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: COLORS.primary,
    },

    textContainer: {
        flex: 1,
        marginLeft: 12,
        marginRight: 10,
    },

    title: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 3,
    },

    message: {
        color: "#A8A8A8",
        fontSize: 12,
        lineHeight: 17,
    },

    statusDot: {
        width: 9,
        height: 9,
        borderRadius: 5,

        backgroundColor: "#FF4D00",
    },


    // NO INTERNET 
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    content: {
        width: "90%",
        maxWidth: 380,
        backgroundColor: "#1F1F1F",
        borderRadius: 18,
        padding: 24,
        alignItems: "center",
    },

    cardText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "700",
        marginTop: 14,
    },
    cardDec: {
        color: "#aaa",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 21,
    },
    cardButton: {
        marginTop: 20,
        backgroundColor: "#FF4D00",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    btnText: {
        color: COLORS.white,
        fontWeight: "700",
    }
})

