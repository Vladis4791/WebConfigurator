import React from "react";
import DropdownItem from "../../Dropdown/DropdownItem/DropdownItem";
import { DropdownGroup } from "../../Dropdown/Dropdown";

const UploadDropdownGroup = ({ closeDropdown }: DropdownGroup) => {
	return (
		<>
			<DropdownItem
				label="Загрузить измененные параметры в прибор"
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				label="Загрузить все параметры в прибор"
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				label="Загрузить выделенные параметры в прибор"
				closeDropdown={closeDropdown}
			/>
		</>
	);
};

export default UploadDropdownGroup;
