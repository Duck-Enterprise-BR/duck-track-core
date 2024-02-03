import { View, Text, StyleSheet, FlatList } from "react-native";
import { TrackEventDTO } from "../track.dto";
import { RFValue } from "react-native-responsive-fontsize";
import { useEffect } from "react";
import { theme } from "../../../src/theme/theme";

interface Props {
    event: TrackEventDTO;
}

export const CardComponent = (props: Props) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.status }>Status: { props.event.status }</Text>
            <Text style={ styles.location }>Local: { props.event.location }</Text>
            <Text style={ styles.date }>Data: { props.event.date } - { props.event.time }</Text>

            { props.event.subStatus.length > 0 &&
                <View style={ styles.subsStatusContainer }>
                    <FlatList
                        data={ props.event.subStatus }
                        renderItem={ ({ item }) => {
                            return <Text style={ styles.subStatus }>{ item }</Text>
                        } }
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.container,
        marginVertical: 1,
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(5),
        borderRadius: RFValue(10),
        width: "96%",
        marginLeft: RFValue(6)
    },
    subsStatusContainer: {
        borderColor: theme.containerText,
        borderWidth: 1,
        borderRadius: RFValue(5),
        paddingHorizontal: RFValue(5)
    },
    status: {
        fontFamily: "barlow-bold",
        fontSize: RFValue(15),
        color: theme.text
    },
    location: {
        fontFamily: "barlow-bold",
        fontSize: RFValue(13),
        color: theme.text
    },
    date: {
        fontFamily: "barlow-medium",
        fontSize: RFValue(13),
        color: theme.containerText
    },
    subStatus: {
        fontFamily: "barlow-medium",
        fontSize: RFValue(11),
        color: theme.containerText
    }
})