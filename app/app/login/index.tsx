import { AlertComponent, IAlertProps } from "../../src/components/alert.component";
import { InputComponent, IInputProp } from "../../src/components/input.component";
import { StatusBarComponent } from "../../src/components/status-bar.component";
import { ResizeMode, Video } from "expo-av";
import { ButtonComponent } from "../../src/components/button.component";
import { LoginService } from "./login.service";
import { authRouter } from "../../src/utils/router.utils";
import { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { styles } from "./styles";
import { theme } from "../../src/theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<IAlertProps>();
    const [name, setName] = useState<IInputProp<string>>({
        value: "",
        valid: true
    });
    const service = new LoginService();

    const onLogin = async () => {
        if (validate()) {
            setLoading(true);
            await service.execute({ name: name.value });
            setLoading(false);
            await authRouter.replace("/(drawer)/home")
        }
    }

    const alertPress = () => {

    }

    const validate = (): boolean => {
        setName({
            value: name.value,
            valid: name.value.length > 2
        })

        return name.value.length > 2;
    }

    const onChangeName = (value: string) => {
        setName({
            value: value,
            valid: value.length > 2
        });
    }

    return (
        <View style={ styles.container }>
            <StatusBarComponent/>

            <View>
                <Video
                    source={ require("../../src/assets/videos/package.mp4") }
                    rate={ 1.0 }
                    volume={ 0.0 }
                    isMuted={ false }
                    resizeMode={ ResizeMode.CONTAIN }
                    shouldPlay
                    isLooping={ true }
                    style={ styles.video }
                />
            </View>

            <View style={ styles.inputContainer }>
                <InputComponent
                    validInput={ name.valid }
                    placeHolder="ex: Vinicius"
                    onChange={ onChangeName }
                    title={ "Seu nome" }
                    Icon={ () => {
                        return <Ionicons
                            color={ theme.primary }
                            name="person-sharp"
                            size={ RFValue(15) }
                        />
                    } }
                />
                <ButtonComponent
                    loading={ loading }
                    title="Começar"
                    onPress={ onLogin }
                />
            </View>
            <AlertComponent
                props={ alert }
                onPress={ alertPress }
            />
        </View>
    );
}

export default Login;