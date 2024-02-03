import { StorageService } from "../services/storage.service";

interface ThemeInterface {
    background: string;
    primary: string;
    container: string;
    containerText: string;
    text: string;
    backgroundGradient: string[];
    iconContainerGradient: string[];
    buttonTitle: string;
}

class LightTheme implements ThemeInterface {
    background: string = "#fff";
    primary: string = "#377aff";
    container: string = "#f5f5f5";
    containerText: string = "#b7b7b7";
    text: string = "#000000";
    backgroundGradient: string[] = ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.5)", "rgba(0, 43, 117, 0.4)"];
    iconContainerGradient: string[] = ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.5)", "rgba(0, 43, 117, 0.2)"];
    buttonTitle: string = "#fff";
}

class DarkTheme implements ThemeInterface {
    background: string = "#000";
    primary: string = "#377aff";
    container: string = "#262626";
    containerText: string = "#878787";
    text: string = "#fff";
    backgroundGradient: string[] = ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.5)", "rgba(0, 43, 117, 0.4)"];
    iconContainerGradient: string[] = ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.5)", "rgba(0, 43, 117, 0.2)"];
    buttonTitle: string = "#fff";
}

const light = new LightTheme();
const dark = new DarkTheme();

export class theme {
    static dark: boolean;

    static background: string = light.background;
    static primary: string = light.primary;
    static container: string = light.container;
    static containerText: string = light.containerText;
    static text: string = light.text;
    static backgroundGradient: string[] = light.backgroundGradient;
    static iconContainerGradient: string[] = light.backgroundGradient;
    static buttonTitle: string = light.buttonTitle;

    public static async updateTheme(): Promise<void> {
        if (await StorageService.getTheme() === "dark") {
            theme.background = dark.background;
            theme.primary = dark.primary
            theme.containerText = dark.containerText;
            theme.container = dark.container;
            theme.text = dark.text;
            theme.backgroundGradient = dark.backgroundGradient;
            theme.iconContainerGradient = dark.iconContainerGradient;
            theme.dark = true;
        }
    }
}


//DEV DARK
/*export class theme {
    static dark: boolean;

    static background: string = dark.background;
    static primary: string = dark.primary;
    static container: string = dark.container;
    static containerText: string = dark.containerText;
    static text: string = dark.text;
    static backgroundGradient: string[] = dark.backgroundGradient;
    static iconContainerGradient: string[] = dark.backgroundGradient;

    public static async updateTheme(): Promise<void> {
        if (await StorageService.getTheme() === "dark") {
            theme.background = dark.background;
            theme.primary = dark.primary
            theme.containerText = dark.containerText;
            theme.container = dark.container;
            theme.text = dark.text;
            theme.backgroundGradient = dark.backgroundGradient;
            theme.iconContainerGradient = dark.iconContainerGradient;
            theme.dark = true;
        }
    }
}*/

//export let theme = new DarkTheme();