import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        flex: 1,
        paddingHorizontal: 18,
    },

    /* ===========================
          Header
    =========================== */

    header: {
        marginTop: 20,
        marginBottom: 24,
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

    /* ===========================
          Section Header
    =========================== */

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    sectionTitle: {
        fontSize: 34,
        fontWeight: "700",
        color: COLORS.white,
    },

    totalBadge: {
        backgroundColor: "#1B1B1B",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#2A2A2A",
    },

    totalText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "600",
    },

    /* ===========================
          Status Tabs
    =========================== */

    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#151515",
        borderRadius: 16,
        padding: 6,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#242424",
    },

    tab: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    activeTab: {
        backgroundColor: COLORS.primary,
    },

    tabText: {
        color: COLORS.gray,
        fontWeight: "600",
        fontSize: 14,
    },

    activeTabText: {
        color: "#fff",
    },

    countBadge: {
        marginLeft: 6,
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#303030",
    },

    countText: {
        fontSize: 11,
        color: "#fff",
        fontWeight: "700",
    },

    /* ===========================
          Timeline
    =========================== */

    listContainer: {
        paddingBottom: 40,
    },

    timelineContainer: {
        flexDirection: "row",
    },

    timeline: {
        width: 28,
        alignItems: "center",
    },

    timelineLine: {
        flex: 1,
        width: 2,
        backgroundColor: "#303030",
    },

    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginVertical: 6,
    },

    /* ===========================
          Order Card
    =========================== */

    orderCard: {
        flex: 1,
        backgroundColor: "#171717",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#242424",
        padding: 18,
        marginBottom: 18,
    },

    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    orderId: {
        color: COLORS.white,
        fontWeight: "700",
        fontSize: 16,
    },

    orderTime: {
        color: COLORS.gray,
        fontSize: 14,
    },

    cardBody: {
        flexDirection: "row",
        alignItems: "center",
    },

    pizzaImage: {
        width: 78,
        height: 78,
        borderRadius: 39,
        marginRight: 16,
    },

    orderInfo: {
        flex: 1,
    },

    pizzaName: {
        color: COLORS.white,
        fontSize: 15,
        marginBottom: 6,
    },

    price: {
        marginTop: 8,
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.white,
    },

    arrowContainer: {
        paddingLeft: 10,
    },

    /* ===========================
          Footer
    =========================== */

    cardFooter: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },

    statusText: {
        fontWeight: "600",
        fontSize: 14,
    },

    /* ===========================
          Empty State
    =========================== */

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyTitle: {
        marginTop: 20,
        fontSize: 22,
        color: COLORS.white,
        fontWeight: "700",
    },

    emptySubtitle: {
        marginTop: 8,
        color: COLORS.gray,
        textAlign: "center",
        lineHeight: 22,
        paddingHorizontal: 40,
    },
});