import React from "react";
import DropdownItem from "../../workspaceUI/Dropdown/DropdownItem/DropdownItem";
import { DropdownGroup } from "../../workspaceUI/Dropdown/Dropdown";
import ButtonWithModal from "../../ButtonWithModal/ButtonWithModal";
import { MODAL_NAME_ABOUT } from "../../../constants/Global";
import AboutProgram from "../../AboutProgram/AboutProgram";
import HelpPage from "../../HelpPage/HelpPage";

const HelpDropdownGroup = ({ closeDropdown }: DropdownGroup) => {
	return (
		<>
			<ButtonWithModal
				renderButton={(props) => (
					<DropdownItem
						{...props}
						label="О программе"
						closeDropdown={closeDropdown}
					/>
				)}
				renderModalContent={(props) => <AboutProgram {...props} />}
			/>
			<ButtonWithModal
				renderButton={(props) => (
					<DropdownItem
						{...props}
						label="Справка программы Конфигуратор"
						closeDropdown={closeDropdown}
					/>
				)}
				renderModalContent={(props) => <HelpPage {...props} />}
			/>
		</>
	);
};

export default HelpDropdownGroup;
