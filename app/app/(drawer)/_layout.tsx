import { RFValue } from "react-native-responsive-fontsize";
import { Drawer } from "expo-router/drawer";
import { View } from "react-native";
import { theme } from "../../src/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Main() {
    return (
        <Drawer initialRouteName="settings" screenOptions={ {
            headerTitleStyle: {
                fontFamily: "hind-bold",
                fontSize: RFValue(20)
            },
            drawerStyle: {
                backgroundColor: theme.background,
            },
            drawerLabelStyle: {
                fontSize: RFValue(15),
                fontFamily: "barlow-bold",
                color: theme.text
            },
            drawerActiveBackgroundColor: theme.container,
            header: () => {
                return <View/>
            }
        } }>
            <Drawer.Screen
                name="home"
                options={ {
                    drawerLabel: "Encomendas",
                    drawerIcon: () => {
                        return <Ionicons
                            name="cube-outline"
                            size={ RFValue(20) }
                            color={ theme.containerText }
                        />
                    }
                } }
            />
            <Drawer.Screen
                name="settings"
                options={ {
                    drawerLabel: "Configurações",
                    drawerIcon: () => {
                        return <Ionicons
                            name="settings-outline"
                            size={ RFValue(20) }
                            color={ theme.containerText }
                        />
                    }
                } }
            />
        </Drawer>
    );
}