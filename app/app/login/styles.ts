import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "100%",
        height: RFValue(150),
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        gap: 10
    },
    video: {
        height: RFValue(150),
        width: RFValue(150),
        borderRadius: RFValue(100)
    }
})