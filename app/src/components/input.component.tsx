import { StyleSheet, TextInput, View, Text } from "react-native";
import { theme } from "../theme/theme";
import { RFValue } from "react-native-responsive-fontsize";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
    Icon: () => React.JSX.Element;
    title: string;
    placeHolder?: string;
    onChange: (value: string) => void;
    secure?: boolean;
    validInput: boolean;
}

export interface IInputProp<T> {
    value: T;
    valid: boolean;
}

export const InputComponent = (props: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.container,
            width: "90%",
            height: RFValue(65),
            borderRadius: RFValue(10),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderColor: props.validInput ? theme.primary : "#b52039",
            borderWidth: isSelected || !props.validInput ? 2 : 0
        },
        input: {
            width: "85%",
            height: "50%",
            fontFamily: "barlow-bold",
            fontSize: RFValue(15),
            color: theme.text
        },
        title: {
            color: theme.containerText,
            fontFamily: "barlow-bold",
            fontSize: RFValue(12),
        },
        inputContainer: {
            flexDirection: "column",
            height: "80%",
            width: "80%",
            marginLeft: RFValue(10),
            justifyContent: "center"
        },
        alertIcon: {
            position: "absolute",
            right: RFValue(10)
        }
    });

    return (
        <View style={ styles.container }>
            <props.Icon/>
            <View style={ styles.inputContainer }>
                <Text style={ styles.title }>{ props.title }</Text>
                <TextInput
                    placeholder={ props.placeHolder }
                    secureTextEntry={ props.secure }
                    style={ styles.input }
                    onFocus={ () => {
                        setIsSelected(true)
                    } }
                    onBlur={ () => {
                        setIsSelected(false)
                    } }
                    onChangeText={ props.onChange }
                />
            </View>
            { !props.validInput &&
                <Ionicons style={ styles.alertIcon } color="#b52039" size={ RFValue(22) } name="alert-circle-outline"/>
            }
        </View>
    );
}