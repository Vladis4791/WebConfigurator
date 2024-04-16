import React from 'react'
import DropdownItem from '../../workspaceUI/Dropdown/DropdownItem/DropdownItem'
import { DropdownGroup } from '../../workspaceUI/Dropdown/Dropdown'
import ButtonWithModal from '../../ButtonWithModal/ButtonWithModal'
import Settings from '../../../pages/settings/Settings'
import { MODAL_NAME_SETTINGS } from '../../../constants/Global'

const SettingsDropdownGroup = ({ closeDropdown }: DropdownGroup) => {
	return (
		<>
			<ButtonWithModal 
				renderButton={(props) => <DropdownItem {...props} label="Открыть настройки" closeDropdown={closeDropdown} />}
				renderModalContent={(props) => <Settings {...props} />}
				modalName={MODAL_NAME_SETTINGS}
			/>
			
		</>
	)
}

export default SettingsDropdownGroup