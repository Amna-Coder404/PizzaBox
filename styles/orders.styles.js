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
    /* STATUS FILTER */

    statusScroll: {
        height: 50,
        flexGrow: 0,
    },

    statusContainer: {
        alignItems: "center",
        paddingHorizontal: 4,
        gap: 10,
    },

    statusChip: {
        height: 36,
        paddingHorizontal: 16,
        borderRadius: 18,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
    },

    activeStatusChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },

    statusText: {
        color: COLORS.muted,
        fontSize: 14,
        fontWeight: "600",
    },

    activeStatusText: {
        color: COLORS.white,
    },
});