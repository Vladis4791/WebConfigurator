import { SettingsProperties } from "../interfaces/SettingsProperties";
import { server } from "./server";

export class SettingsAPIs {
    getSettings() {
        return server.get("/getSettings");
    }

    saveSettings(settings: SettingsProperties) {
        return server.action('/saveSettings', settings);
    }

    getChangableSelectOptions() {
        return server.get('/getChangableSelectOptions');
    }
}

export const settingsAPI = new SettingsAPIs();