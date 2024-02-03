import { networkInterfaces } from "os";

export const getMachineIp = (): string => {
    const interfaces = networkInterfaces();

    for (const interfaceName in interfaces) {
        const interfaceInfo = interfaces[interfaceName];

        if (interfaceInfo) {
            for (const info of interfaceInfo) {
                if (!info.internal && info.family === "IPv4") {
                    return info.address;
                }
            }
        }
    }

    return "127.0.0.1";
}