import { View, Text, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { api, ApiResponseInterface } from "../../src/utils/api.utils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBarComponent } from "../../src/components/status-bar.component";
import { AlertComponent } from "../../src/components/alert.component";
import { CardComponent } from "./components/card.component";
import { authRouter } from "../../src/utils/router.utils";
import { TrackDTO } from "./track.dto";
import { RFValue } from "react-native-responsive-fontsize";
import { styles } from "./styles";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../../src/theme/theme";

const Track = () => {
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [data, setData] = useState<TrackDTO | null>(null);

    const { code, name, id } = useLocalSearchParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsRefreshing(true);
        const result = await api.get<ApiResponseInterface<TrackDTO>>(`/track/find/${ code }`);
        setData(result.data.result ?? null);
        setIsRefreshing(false);
    }

    const onBack = () => {
        router.back();
    }

    const onDelete = async () => {
        setLoadingDelete(true);
        await api.get<ApiResponseInterface<any>>(`/order/delete/${ id }`)
            .then(() => {
                authRouter.replace("/home/");
            });
        setLoadingDelete(false);
    }

    const onDeleteModal = (state: boolean) => {
        setShowDelete(state);
    }

    return (
        <View style={ styles.container }>
            <StatusBarComponent/>
            <View style={ styles.header }>
                <TouchableOpacity onPress={ onBack } activeOpacity={ 0.7 } style={ styles.backButton }>
                    <Ionicons size={ RFValue(30) } color={ theme.containerText } name="chevron-back-outline"/>
                </TouchableOpacity>
                <View style={ styles.headerTextContainer }>
                    <Text style={ styles.name }>{ name }</Text>
                    <Text style={ styles.code }>{ data?.code } | UA: { data?.lastUpdated }</Text>
                </View>
                <TouchableOpacity onPress={ () => {
                    onDeleteModal(true);
                } } activeOpacity={ 0.7 } style={ styles.delete }>
                    <Ionicons color={ theme.containerText } size={ RFValue(30) } name="trash-outline"/>
                </TouchableOpacity>
            </View>

            { data && data.events && data.events.length > 0 ?
                <FlatList
                    style={ styles.list }
                    renderItem={ ({ item }) => {
                        return <CardComponent
                            event={ item }
                        />
                    } }
                    data={ data?.events }
                    keyExtractor={ item => item.key }
                    refreshControl={
                        <RefreshControl
                            refreshing={ isRefreshing }
                            onRefresh={ getData }
                        />
                    }
                /> :
                <View style={ styles.notFoundContainer }>
                    <Text style={ styles.notFoundContainerText }>Nenhum dado encontrado</Text>
                </View>
            }
            <AlertComponent
                props={ {
                    title: "Apagar encomenda",
                    buttonTitle: "Apagar",
                    bodyText: "Tem certeza que deseja apagar essa encomenda?",
                    loadingButton: loadingDelete
                } }
                onPress={ onDelete }
                show={ showDelete }
                showClose={ true }
                onClose={ () => {
                    onDeleteModal(false);
                } }
            />
        </View>
    );
}

export default Track;