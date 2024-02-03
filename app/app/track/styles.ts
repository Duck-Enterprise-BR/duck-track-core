import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../src/theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    header: {
        height: RFValue(60),
        backgroundColor: theme.background,
        borderColor: theme.container,
        borderBottomWidth: 1
    },
    backButton: {
        height: RFValue(40),
        width: RFValue(40),
        position: "absolute",
        left: RFValue(15),
        top: RFValue(15)
    },
    delete: {
        height: RFValue(40),
        width: RFValue(40),
        position: "absolute",
        right: RFValue(15),
        top: RFValue(15)
    },
    headerTextContainer: {
        flex: 1,
        marginHorizontal: RFValue(50),
        //backgroundColor: theme.containerText,
        justifyContent: "center",
        paddingHorizontal: RFValue(15)
    },
    name: {
        fontFamily: "barlow-bold",
        fontSize: RFValue(16),
        color: theme.text
    },
    code: {
        fontFamily: "barlow-medium",
        fontSize: RFValue(12),
        color: theme.containerText
    },
    list: {
        flex: 1,
        marginTop: RFValue(4)
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundContainerText: {
        fontFamily: "barlow-bold",
        fontSize: RFValue(15),
        color: theme.containerText
    }
});