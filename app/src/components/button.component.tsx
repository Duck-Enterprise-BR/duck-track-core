import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../theme/theme";

type Props = {
    title: string;
    onPress: () => void;
    opacity?: number;
    loading: boolean;
}

export const ButtonComponent = (props: Props) => {
    return (
        <TouchableOpacity onPress={ props.loading ? () => {
            console.log("loading");
        } : props.onPress } style={ styles.baseContainer } activeOpacity={ props.opacity ?? 0.7 }>
            <View style={ styles.container }>
                { props.loading &&
                    <ActivityIndicator
                        color={ theme.background }
                        size={ RFValue(20) }
                    />
                }
                { !props.loading &&
                    <Text style={ styles.title }>{ props.title }</Text>
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        backgroundColor: theme.primary,
        width: "90%",
        height: RFValue(50),
        borderRadius: RFValue(10)
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    title: {
        color: theme.buttonTitle,
        fontFamily: "barlow-bold",
        fontSize: RFValue(16)
    }
});