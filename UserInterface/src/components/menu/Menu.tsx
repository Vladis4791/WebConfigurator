import React from "react";
import "./Menu.scss";
import ButtonWithDropdown from "../workspaceUI/ButtonWithDropdown/ButtonWithDropdown";
import Dropdown from "../workspaceUI/Dropdown/Dropdown";
import FileDropdownGroup from "./dropdownGroups/FileDropdownGroup";
import HelpDropdownGroup from "./dropdownGroups/HelpDropdownGroup";
import SettingsDropdownGroup from "./dropdownGroups/SettingsDropdownGroup";

const Menu = () => {
	return (
		<div className="Menu">
			<ButtonWithDropdown
				renderButton={(props, ref) => (
					<button {...props} ref={ref} className="menuItem">
						Файл
					</button>
				)}
				renderDropdown={(props) => (
					<Dropdown
						{...props}
						renderDropdownGroup={(props) => (
							<FileDropdownGroup {...props} />
						)}
					/>
				)}
			/>

			<ButtonWithDropdown
				renderButton={(props, ref) => (
					<button {...props} ref={ref} className="menuItem">
						Настройки
					</button>
				)}
				renderDropdown={(props) => (
					<Dropdown
						{...props}
						renderDropdownGroup={(props) => <SettingsDropdownGroup {...props} />}
					/>
				)}
			/>

			<ButtonWithDropdown
				renderButton={(props, ref) => (
					<button {...props} ref={ref} className="menuItem">
						Справка
					</button>
				)}
				renderDropdown={(props) => (
					<Dropdown
						{...props}
						renderDropdownGroup={(props) => <HelpDropdownGroup {...props} />}
					/>
				)}
			/>
		</div>
	);
};

export default Menu;
