import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        gap: 12,
        paddingHorizontal: 20,
        paddingBottom: 100
    },

    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 18,
    },
    //Header

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        // paddingHorizontal: 20
    },
    rightIcons: {
        flexDirection: "row",
        gap: 20
    }
    ,
    logo: {
        width: 120,
        height: 130,
        resizeMode: "contain",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: COLORS.white,
    },

    subtitle: {
        marginTop: 6,
        fontSize: 15,
        color: COLORS.gray,
        lineHeight: 22,
    },

});