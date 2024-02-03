import { Text, TouchableOpacity, View } from "react-native";
import { ToggleCardComponent } from "./components/toggle-card.component";
import { StorageService } from "../../src/services/storage.service";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { styles } from "./styles";
import { theme } from "../../src/theme/theme";
import * as updates from "expo-updates";

const Settings = () => {
    const navigation = useNavigation();

    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer())
    }, []);

    const onPressTheme = async (state: boolean): Promise<void> => {
        if (state) {
            await StorageService.setTheme("dark");
        }
        if (!state) {
            await StorageService.setTheme("light");
        }

        await theme.updateTheme();

        updates.reloadAsync();
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity onPress={ openDrawer }>
                    <MaterialIcons
                        color={theme.text}
                        size={ RFValue(25) }
                        name="segment"
                        style={ { transform: [{ scaleX: -1 }] } }
                    />
                </TouchableOpacity>
            </View>
            <View style={ styles.namesContainer }>
                <Text style={ styles.title }>Configurações</Text>
            </View>
            <View style={ styles.optionsContainer }>
                <ToggleCardComponent
                    initialState={ theme.dark }
                    title="Tema escuro"
                    onPressState={ onPressTheme }
                />
            </View>
        </View>
    );
}

export default Settings;