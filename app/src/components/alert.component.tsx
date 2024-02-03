import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ButtonComponent } from "./button.component";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
    onPress: () => void;
    showClose?: boolean;
    onClose?: () => void;
    props?: IAlertProps;
    show?: boolean;
}

export interface IAlertProps {
    title: string;
    buttonTitle: string;
    bodyText: string;
    loadingButton?: boolean;
}

export const AlertComponent = (props: Props) => {
    return props.show ? (
        <View style={ styles.container }>
            <View style={ styles.modalContainer }>
                <View style={ styles.header }>
                    <Text style={ styles.headerTitle }>{ props.props?.title }</Text>
                    { props.showClose &&
                        < TouchableOpacity onPress={ props.onClose } style={ styles.closeButton } activeOpacity={ 0.5 }>
                            <Ionicons size={ RFValue(25) } name="close-sharp"/>
                        </TouchableOpacity>
                    }
                </View>
                <Text
                    style={ styles.bodyText }>{ props.props?.bodyText }</Text>
                <View style={ styles.buttonContainer }>
                    <ButtonComponent
                        loading={ props.props?.loadingButton ?? false }
                        title={ props.props?.buttonTitle ?? "" }
                        onPress={ props.onPress }/>
                </View>
            </View>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalContainer: {
        height: RFValue(200),
        width: "90%",
        backgroundColor: theme.background,
        elevation: 5,
        borderRadius: RFValue(10)
    },
    header: {
        width: "100%",
        height: RFValue(45),
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
        borderBottomColor: theme.container,
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        fontFamily: "barlow-bold",
        fontSize: RFValue(16),
        color: theme.primary
    },
    buttonContainer: {
        width: "100%",
        height: RFValue(50),
        alignSelf: "flex-end",
        position: "absolute",
        bottom: RFValue(15),
        alignItems: "center"
    },
    bodyText: {
        fontFamily: "barlow-medium",
        fontSize: RFValue(15),
        color: theme.containerText,
        margin: RFValue(17)
    },
    closeButton: {
        position: "absolute",
        right: RFValue(10),
        top: RFValue(10)
    }
});