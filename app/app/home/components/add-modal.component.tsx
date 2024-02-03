import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { InputComponent, IInputProp } from "../../../src/components/input.component";
import { ButtonComponent } from "../../../src/components/button.component";
import { HomeService } from "../home.service";
import { AxiosError } from "axios";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../../src/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
    showClose?: boolean;
    onClose?: (state: boolean) => void;
    props?: IAlertProps;
    show?: boolean;
}

export interface IAlertProps {
    title: string;
    buttonTitle: string;
}

export const AddModalComponent = (props: Props) => {
    const service = new HomeService();

    const [code, setCode] = useState<IInputProp<string>>({
        value: "",
        valid: true
    });

    const [name, setName] = useState<IInputProp<string>>({
        value: "",
        valid: true
    });

    const [loading, setLoading] = useState<boolean>(false);

    const validate = (): boolean => {
        const regex: RegExp = /^[A-Za-z]{2}\d{9}[A-Za-z]{2}$/;
        setName({
            value: name.value,
            valid: name.value.length >= 2
        });
        setCode({
            value: code.value,
            valid: regex.test(code.value)
        });
        return regex.test(code.value) && name.value.length >= 2;
    }

    const resetValues = () => {
        setName({
            value: "",
            valid: true
        });
        setCode({
            value: "",
            valid: true
        });
    }

    const onAdd = async () => {
        setLoading(true);

        if (validate()) {
            await service.addOrder({ name: name.value, code: code.value })
                .then(() => {
                    setLoading(false);
                    resetValues();
                    if (props.onClose) {
                        props.onClose(false);
                    }
                })
                .catch((error: AxiosError) => {
                    setLoading(false);
                })
        }
        setLoading(false);
    }

    return props.show ? (
        <View style={ styles.container }>
            <View style={ styles.modalContainer }>
                <View style={ styles.header }>
                    <Text style={ styles.headerTitle }>{ props.props?.title }</Text>
                    { props.showClose &&
                        < TouchableOpacity onPress={ () => {
                            if (props.onClose) {
                                resetValues();
                                props.onClose(false);
                            }
                        } } style={ styles.closeButton } activeOpacity={ 0.5 }>
                            <Ionicons size={ RFValue(25) } color={ theme.containerText } name="close-sharp"/>
                        </TouchableOpacity>
                    }
                </View>
                <View style={ styles.inputsContainer }>
                    <InputComponent
                        onChange={ (value: string) => {
                            setName({
                                value: value,
                                valid: name.valid
                            })
                        } }
                        validInput={ name.valid }
                        title="Nome da encomenda"
                        placeHolder="ex: Monitor"
                        Icon={ () => <Ionicons
                            size={ RFValue(15) }
                            name="cube-outline"
                            color={ theme.containerText }
                        /> }
                    />
                    <InputComponent
                        onChange={ (value: string) => {
                            setCode({
                                value: value,
                                valid: code.valid
                            })
                        } }
                        validInput={ code.valid }
                        title="Código da encomenda"
                        placeHolder="ex: QW123456789PP"
                        Icon={ () => <Ionicons
                            size={ RFValue(15) }
                            name="cube-outline"
                            color={ theme.containerText }
                        /> }
                    />
                </View>

                <View style={ styles.buttonContainer }>
                    <ButtonComponent
                        loading={ loading }
                        title={ props.props?.buttonTitle ?? "" }
                        onPress={ onAdd }/>
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
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalContainer: {
        height: RFValue(270),
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
        color: theme.text
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
    },
    inputsContainer: {
        flex: 1,
        alignItems: "center",
        paddingVertical: RFValue(10),
        gap: RFValue(10)
    }
});