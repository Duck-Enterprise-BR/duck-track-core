import { useCallback, useState, } from "react";
import { StatusBarComponent } from "../src/components/status-bar.component";
import { AlertComponent } from "../src/components/alert.component";
import { StorageService } from "../src/services/storage.service";
import * as SplashScreen from "expo-splash-screen";
import { authRouter } from "../src/utils/router.utils";
import { AxiosError } from "axios";
import { useFonts } from "expo-font";
import { theme } from "../src/theme/theme";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function () {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [error, setError] = useState<string>("undef");
    const storageService = new StorageService();

    const [fontsLoaded] = useFonts({
        "hind-regular": require("../src/assets/fonts/hind/HindSiliguri-Regular.ttf"),
        "hind-bold": require("../src/assets/fonts/hind/HindSiliguri-Bold.ttf"),
        "hind-Light": require("../src/assets/fonts/hind/HindSiliguri-Light.ttf"),
        "barlow-regular": require("../src/assets/fonts/barlow/Barlow-Regular.ttf"),
        "barlow-bold": require("../src/assets/fonts/barlow/Barlow-Bold.ttf"),
        "barlow-light": require("../src/assets/fonts/barlow/Barlow-Light.ttf"),
        "barlow-medium": require("../src/assets/fonts/barlow/Barlow-Medium.ttf")
    });

    const onPressAlert = () => {
        setShowAlert(false);
        onLayout();
    }

    const onLayout = useCallback(async () => {
        await storageService.getToken();
        await theme.updateTheme();

        if (fontsLoaded) {
            await authRouter.replace("/(drawer)/home")
                .catch((error: AxiosError) => {
                    setShowAlert(true);
                    setError(error.message);
                });

            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={ { flex: 1, backgroundColor: theme.background } } onLayout={ onLayout }>
            <StatusBarComponent/>
            <AlertComponent
                show={ showAlert }
                onPress={ onPressAlert }
                props={ {
                    title: "Erro de conexão",
                    bodyText: `Parece que houve um erro de conexão com o servidor (${ error }).`,
                    buttonTitle: "Tentar novamente"
                } }
            />
        </View>
    );
}