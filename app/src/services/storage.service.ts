import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY: string = "n74cddfdddNrdziCkUY8zieiNWMzwVxMeP";
const THEME_KEY: string = "nd74cfNrezddddiCkUY8ziiNWMzwVxMeP";
const NAME_KEY: string = "n74ecfNrzddddiCkUY8zii76fddNWMzwVxMeP";

export class StorageService {
    public static token: string = "";

    public async getToken(): Promise<string> {
        const token = await AsyncStorage.getItem(TOKEN_KEY) ?? "";
        StorageService.token = token;
        return token;
    }

    public async setToken(token: string): Promise<void> {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await this.getToken();
    }

    public async getName(): Promise<string> {
        return await AsyncStorage.getItem(NAME_KEY) ?? "";
    }

    public async setName(name: string): Promise<void> {
        await AsyncStorage.setItem(NAME_KEY, name);
    }

    public static async setTheme(theme: string): Promise<void> {
        await AsyncStorage.setItem(THEME_KEY, theme);
    }

    public static async getTheme(): Promise<string> {
        return await AsyncStorage.getItem(THEME_KEY) ?? "light";
    }
}