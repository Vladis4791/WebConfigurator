import React from "react";
import DropdownItem from "../../Dropdown/DropdownItem/DropdownItem";
import { DropdownGroup } from "../../Dropdown/Dropdown";

const PrintGroup = ({ closeDropdown }: DropdownGroup) => {
	return (
		<>
			<DropdownItem
				label="Печать измененных параметров"
				closeDropdown={closeDropdown}
			/>
			<DropdownItem label="Печать всех параметров" closeDropdown={closeDropdown} />
			<DropdownItem
				label="Печать выделенных параметров"
				closeDropdown={closeDropdown}
			/>
		</>
	);
};

export default PrintGroup;
