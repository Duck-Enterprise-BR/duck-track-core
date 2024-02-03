import { View, Text, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { StatusBarComponent } from "../../src/components/status-bar.component";
import { AddModalComponent } from "./components/add-modal.component";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router"
import { DrawerActions } from "@react-navigation/native";
import { CardComponent } from "./components/card.component";
import { HomeService } from "./home.service";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { OrderDTO } from "./home.dto";
import { RFValue } from "react-native-responsive-fontsize";
import { styles } from "./styles";
import { router } from "expo-router";
import { theme } from "../../src/theme/theme";
import IonsIcons from "@expo/vector-icons/Ionicons";

import { environment } from "../../src/environment";

type filter = "all" | "delivered";

const Home = () => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [filterSelected, setFilterSelected] = useState<filter>("all");
    const [orders, setOrders] = useState<Array<OrderDTO> | []>([]);
    const [ordersBackup, setOrdersBackup] = useState<Array<OrderDTO> | []>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const service = new HomeService();
    const navigation = useNavigation();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsRefreshing(true);
        const orders = await service.readOrders();
        setOrders(orders);
        setOrdersBackup(orders);
        setIsRefreshing(false);

        setName(await service.getName());
    }

    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer())
    }, []);

    const onPressOrder = (order: OrderDTO) => {
        router.push({ pathname: "/track/", params: { code: order.code, name: order.name, id: order._id } });
    }

    const onFilterAll = () => {
        setOrders(ordersBackup);
    }

    const onFilterDelivered = () => {
        let ordersFiltered: Array<OrderDTO> = [];

        for (let item of ordersBackup) {
            if (item.delivered) {
                ordersFiltered.push(item);
            }
        }

        setOrders(ordersFiltered);
    }

    return (
        <View style={ styles.container }>
            <StatusBarComponent/>
            <LinearGradient
                colors={ theme.backgroundGradient }
                style={ { flex: 1 } }
                start={ { x: 0, y: 0 } }
                end={ { x: 1, y: 1 } }
            >
                <View style={ styles.header }>
                    <TouchableOpacity onPress={ openDrawer }>
                        <MaterialIcons
                            size={ RFValue(25) }
                            name="segment"
                            style={ { transform: [{ scaleX: -1 }] } }
                            color={ theme.text }
                        />
                    </TouchableOpacity>
                </View>
                <View style={ styles.namesContainer }>
                    <Text style={ styles.welcome }>Bem vindo,</Text>
                    <Text style={ styles.name }>{ name }</Text>
                </View>

                <View style={ styles.filterContainer }>
                    <TouchableOpacity onPress={ () => {
                        setFilterSelected("all");
                        onFilterAll();
                    } } style={ filterSelected === "all" ? styles.filterButtonSelected : styles.filterButton }>
                        <Text
                            style={ filterSelected === "all" ? styles.filterTitleSelected : styles.filterTitle }>Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => {
                        setFilterSelected("delivered");
                        onFilterDelivered();
                    } } style={ filterSelected === "delivered" ? styles.filterButtonSelected : styles.filterButton }>
                        <Text
                            style={ filterSelected === "delivered" ? styles.filterTitleSelected : styles.filterTitle }>Entregues</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={ styles.list }
                    data={ orders }
                    renderItem={ ({ item }) => {
                        return <CardComponent
                            order={ item }
                            onPress={ onPressOrder }
                        />
                    } }
                    keyExtractor={ item => item._id }
                    refreshControl={
                        <RefreshControl
                            refreshing={ isRefreshing }
                            onRefresh={ getData }
                        />
                    }
                />
                <TouchableOpacity onPress={ () => {
                    setShowAddModal(true);
                } } activeOpacity={ 0.7 } style={ styles.addButton }>
                    <IonsIcons size={ RFValue(30) } color={ theme.background } name="add-outline"/>
                </TouchableOpacity>
                <AddModalComponent
                    show={ showAddModal }
                    showClose={ true }
                    onClose={ (state: boolean) => {
                        getData();
                        setShowAddModal(state);
                    } }
                    props={ {
                        title: "Nova encomenda",
                        buttonTitle: "Adicionar"
                    } }
                />
            </LinearGradient>
        </View>
    );
}

export default Home;