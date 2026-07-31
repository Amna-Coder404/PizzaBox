import { StyleSheet } from "react-native";
import COLORS from "../constants/color";


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 22,
    },


    content: {
        flex: 1,
        justifyContent: "center",
    },


    logoContainer: {
        alignItems: "center",
        marginBottom: 35,
    },


    logoWrapper: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: COLORS.card,
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },


    logo: {
        width: 115,
        height: 115,
        borderRadius: 60,
    },


    title: {
        fontSize: 38,
        fontWeight: "900",
        color: COLORS.primary,
        marginTop: 18,
        letterSpacing: 0.5,
    },


    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 16,
        marginTop: 6,
    },


    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 25,
        padding: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },


    heading: {
        color: COLORS.white,
        fontSize: 25,
        fontWeight: "800",
    },


    description: {
        color: COLORS.textSecondary,
        marginTop: 8,
        marginBottom: 25,
        fontSize: 15,
    },



    inputBox: {
        height: 58,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
    },


    input: {
        flex: 1,
        marginLeft: 12,
        color: COLORS.white,
        fontSize: 16,
    },



    forgotText: {
        color: COLORS.primary,
        textAlign: "right",
        fontWeight: "700",
        marginBottom: 22,
    },



    loginButton: {
        marginTop: 5,
        height: 58,
        borderRadius: 16,
    },



    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },


    normalText: {
        color: COLORS.textSecondary,
        fontSize: 15,
    },


    link: {
        color: COLORS.primary,
        fontWeight: "800",
        marginLeft: 5,
        fontSize: 15,
    },


});


export default styles;