import React, { useState } from 'react'
import SettingsSidebar from '../../components/settingsSidebar/SettingsSidebar'
import './Settings.scss';
import ConnectionSettings from '../../components/ConnectionSettings/ConnectionSettings';
import ParamsSettings from '../../components/ParamsSettings/ParamsSettings';
import { INITIAL_SETTINGS_SECTION, SettingsSection } from '../../constants/Settings';
import { ModalContent } from '../../components/Modal/Modal';

interface SettingsProps extends ModalContent {}

const Settings = (props: SettingsProps) => {

	const [currentSettingSection, setCurrentSettingsSection] = useState<SettingsSection>(INITIAL_SETTINGS_SECTION); 

	const getCurrentSettingsPage = () => {
		switch(currentSettingSection) {
			case SettingsSection.CONNECTION:
				return <ConnectionSettings />
			case SettingsSection.PARAMS:
				return <ParamsSettings />
		}
	}

	return (
		<div className="Settings">
			<div className="container">
				<div className="settings-content">
					<div className="sidebar">
						<SettingsSidebar onSectionChange={(section) => setCurrentSettingsSection(section)} />
					</div>
					<div className="currentSettings">
						{ getCurrentSettingsPage() }
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings