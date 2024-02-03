import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { OrderDTO } from "../home.dto";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../../../src/theme/theme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

type Props = {
    order: OrderDTO;
    onPress: (order: OrderDTO) => void;
}

export const CardComponent = (props: Props) => {
    return (
        <TouchableOpacity
            onPress={ () => {
                props.onPress(props.order);
            } }
            activeOpacity={ 0.7 } style={ styles.container }>
            <View style={ styles.iconContainer }>
                <Icon
                    color={ theme.containerText }
                    size={ RFValue(40) }
                    name={ !props.order.delivered ? "truck-fast-outline" : "truck-check-outline" }
                />
            </View>
            <View style={ styles.textContainer }>
                <Text style={ styles.name }>{ props.order.name }</Text>
                <Text style={ styles.code }>{ props.order.code }</Text>
                <Text style={ styles.code }>{ props.order.delivered ? "Entregue" : "A caminho" }</Text>
            </View>
            <Icon
                style={ styles.rightIcon }
                name="chevron-right"
                color={ theme.containerText }
                size={ RFValue(25) }
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: RFValue(70),
        width: "100%",
        backgroundColor: theme.container,
        //marginHorizontal: RFValue(6),
        borderRadius: RFValue(10),
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: RFValue(15)
    },
    textContainer: {
        flexDirection: "column",
        paddingHorizontal: RFValue(10)
    },
    name: {
        fontFamily: "barlow-bold",
        fontSize: RFValue(17),
        color: theme.text
    },
    code: {
        fontFamily: "barlow-regular",
        fontSize: RFValue(12),
        color: theme.containerText
    },
    iconContainer: {
        height: RFValue(50),
        width: RFValue(50),
        borderColor: theme.primary,
        borderRadius: RFValue(10),
        alignItems: "center",
        justifyContent: "center"
    },
    iconContainerBorder: {
        height: RFValue(50),
        width: RFValue(50),
        borderColor: theme.primary,
        borderWidth: 1,
        borderRadius: RFValue(10)
    },
    rightIcon: {
        position: "absolute",
        right: 10
    }
});