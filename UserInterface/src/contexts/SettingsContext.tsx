import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { settingsAPI } from '../APIs/settings.api';
import { SettingsProperties } from '../interfaces/SettingsProperties';

interface SettingsContextValue {
    settings: SettingsProperties,
    saveSettings: (newSettings: SettingsProperties) => void
}

const SettingsContext = React.createContext<SettingsContextValue | undefined>(undefined);

const SettingsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    
    const [settings, setSettings] = useState<SettingsProperties>({} as SettingsProperties);

    useEffect(() => {
        settingsAPI.getSettings().then((res) => {
            const receivedSettings = res.Data as SettingsProperties;
            setSettings(receivedSettings);
        });
    }, []);


    const saveSettings = (newSettings: SettingsProperties) => {
        setSettings(newSettings);
        settingsAPI.saveSettings(newSettings);
    }
    
    return (
        <SettingsContext.Provider value={{
            settings: settings,
            saveSettings: saveSettings
        }}>
            { children }
        </SettingsContext.Provider>
    );
}

export const useSettings = (): SettingsContextValue => {

    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings can only be used inside SettingsProvider');
    }

    return context;

}


export default SettingsProvider;