import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../src/theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    header: {
        height: RFValue(40),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(5)
    },
    namesContainer: {
        width: "100%",
        height: RFValue(50),
        paddingHorizontal: RFValue(15)
    },
    welcome: {
        fontFamily: "barlow-bold",
        fontSize: RFValue(13),
        color: theme.containerText
    },
    name: {
        fontFamily: "hind-bold",
        fontSize: RFValue(25),
        color: theme.text
    },
    addButton: {
        position: "absolute",
        backgroundColor: theme.primary,
        height: RFValue(50),
        width: RFValue(50),
        right: RFValue(15),
        bottom: RFValue(15),
        borderRadius: RFValue(50),
        alignItems: "center",
        justifyContent: "center"
    },
    list: {
        flex: 1,
        marginTop: RFValue(5)
    },
    filterButton: {
        borderRadius: RFValue(10),
    },
    filterButtonSelected: {
        borderColor: theme.text,
        borderWidth: 1,
        borderRadius: RFValue(10),
    },
    filterTitle: {
        marginHorizontal: RFValue(5),
        color: theme.containerText,
        fontFamily: "barlow-medium"
    },
    filterTitleSelected: {
        marginHorizontal: RFValue(5),
        color: theme.text,
        fontFamily: "barlow-medium"
    },
    filterContainer: {
        marginTop: RFValue(10),
        width: RFValue(200),
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: RFValue(15)
    }
});