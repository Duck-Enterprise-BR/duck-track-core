import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../../src/theme/theme";
import Icon from "@expo/vector-icons/FontAwesome";

type Props = {
    title: string;
    onPressState: (state: boolean) => void;
    initialState: boolean;
}

export const ToggleCardComponent = (props: Props) => {
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        setState(props.initialState);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity
                onPress={() => {
                    setState(!state);
                    props.onPressState(!state);
                }}
                activeOpacity={0.7}
                style={styles.toggle}
            >
                <Icon
                    name="toggle-on"
                    style={{
                        transform: [{ scaleX: state ? 1 : -1 }]
                    }}
                    size={RFValue(27)}
                    color={state ? theme.primary : theme.background}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.container,
        width: "96%",
        height: RFValue(35),
        borderBottomWidth: 1,
        borderColor: theme.container,
        marginLeft: RFValue(6),
        justifyContent: "center",
        borderRadius: RFValue(10)
    },
    toggle: {
        position: "absolute",
        right: RFValue(15),
    },
    title: {
        fontFamily: "barlow-medium",
        marginLeft: RFValue(15),
        fontSize: RFValue(15),
        color: theme.text
    }
})