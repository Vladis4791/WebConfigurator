import React, { useState } from 'react'
import './SettingsSidebar.scss';
import SidebarLink from './SidebarLink/SidebarLink';
import { INITIAL_SETTINGS_SECTION, SettingsSection } from '../../constants/Settings';

const SettingsSidebar = ({ onSectionChange }: { onSectionChange: (section: SettingsSection) => void }) => {

    const [currentSettingsSection, setCurrentSettingsSection] = useState<SettingsSection>(INITIAL_SETTINGS_SECTION);



    const onLinkClicked = (section: SettingsSection) => {
        setCurrentSettingsSection(section);
        onSectionChange(section);
    }

    return (
        <div className="SettingsSidebar">
            <div>
                <SidebarLink 
                    isActive={currentSettingsSection === SettingsSection.CONNECTION}
                    onClick={() => onLinkClicked(SettingsSection.CONNECTION)}
                >Настройки соединения</SidebarLink>
            </div>
            <div>
                <SidebarLink 
                isActive={currentSettingsSection === SettingsSection.PARAMS}
                onClick={() => onLinkClicked(SettingsSection.PARAMS)}>Параметры</SidebarLink>
            </div>
        </div>
    )
}

export default SettingsSidebar