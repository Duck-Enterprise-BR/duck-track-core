import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/theme";

export const StatusBarComponent = () => {
    return (
        <StatusBar
            style={ theme.dark ? "light" : "dark" }
            backgroundColor={ theme.background }
        />
    );
}