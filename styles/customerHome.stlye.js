import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../constants/color";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        gap: 12,
        paddingHorizontal: 20,
        paddingBottom: 72
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

    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingHorizontal: 18,
        height: 52,
        borderRadius: 26,
    },

    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 8,
    },
    bannerContainer: {
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 12,
        // width: 400,
        height: 210,
        marginBottom: 12
    },
    bannerImage: {
        width: "100%",
        borderRadius: 12,
        height: 200,
    },
    /*
          Categories
 */

    categoryContainer: {
        marginBottom: 22,
    },

    categoryContent: {
        paddingRight: 10,
    },

    categoryItem: {
        alignItems: "center",
        marginRight: 18,
    },

    activeCategory: {},

    categoryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#171717",
        borderWidth: 1,
        borderColor: "#2A2A2A",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    activeCategoryIcon: {
        borderColor: COLORS.primary,
        backgroundColor: "#241507",
    },

    categoryText: {
        color: COLORS.gray,
        fontSize: 15,
        fontWeight: "600",
    },

    activeCategoryText: {
        color: COLORS.primary,
    },

    /*
          Pizza List
 */

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
        gap: 12
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
        flexDirection: "row"
    },
    pizzaInfo: {
        gap: 12
    },


    pizzaName: {
        color: COLORS.white,
        fontSize: width < 380 ? 18 : 22,
        fontWeight: "700",
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
        justifyContent: "center"
    },
    btnText: {
        color: COLORS.white,
    },

    disabledButton: {
        borderColor: "#444",
        opacity: 0.45,
    },

    /*
          Empty State
 */

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