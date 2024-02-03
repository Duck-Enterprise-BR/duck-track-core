import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../src/theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        gap: 10
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
    title: {
        fontFamily: "hind-bold",
        fontSize: RFValue(25),
        color: theme.text
    },
    optionsContainer: {
        //backgroundColor: theme.container,
        flex: 1
    }
});