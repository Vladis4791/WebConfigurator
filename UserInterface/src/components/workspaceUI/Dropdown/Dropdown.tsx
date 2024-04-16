import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Dropdown.scss";

export interface DropdownProps {
	renderDropdownGroup: (props: { closeDropdown: () => void }) => React.ReactElement;
	isOpen: boolean;
    onClose: () => void,
	dropdownRef: React.RefObject<HTMLDivElement>;
}

export interface DropdownGroup {
    closeDropdown: () => void
}

const Dropdown = ({ renderDropdownGroup, isOpen, dropdownRef, onClose }: DropdownProps) => {

	return createPortal(
		<div ref={dropdownRef} className={`Dropdown ${isOpen ? "open" : "close"}`}>
			{renderDropdownGroup({ closeDropdown: onClose })}
		</div>,
		document.getElementById("portal") as HTMLElement
	);
};

export default Dropdown;
