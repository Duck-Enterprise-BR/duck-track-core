import { Href, router } from "expo-router";
import { validation } from "./api.utils";

export namespace authRouter {
    export const replace = async (href: Href<string>) => {
        const isValid = await validation()
            .catch(error => {
                throw error;
            });

        if (isValid) {
            router.replace(href);
            return;
        }

        router.replace("/login/");
    }
}

