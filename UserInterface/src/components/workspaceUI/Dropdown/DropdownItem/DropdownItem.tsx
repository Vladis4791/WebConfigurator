import React, { ButtonHTMLAttributes } from "react";
import "./DropdownItem.scss";
import { useHotkeys } from "react-hotkeys-hook";

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	hotkey?: string;
	closeDropdown: () => void;
	icon?: React.ReactElement;
	last?: boolean;
}

const DropdownItem = ({
	label,
	hotkey,
	icon,
	last = false,
	closeDropdown,
	...props
}: DropdownItemProps) => {
	const handleClick = (e: any) => {
		closeDropdown();
		if (props.onClick) {
			props.onClick(e);
		}
	};

	useHotkeys(hotkey ?? "", () => {
		const isButtonDisabled = props.disabled ?? false;

		if (hotkey && !isButtonDisabled) {
			console.log("action");
			handleClick(null);
		}
	});

	const prettifyHotkey = (hotkey?: string) => {
		if (!hotkey) return "";
		return hotkey.split("+").map(hotkeyElement => hotkeyElement.toUpperCase()).join(" + ");
	};

	return (
		<button
			{...props}
			className={`DropdownItem ${props.className} ${last ? "underlined" : ""}`}
			onClick={handleClick}
		>
			<div className="icon">{icon}</div>
			<div className="label">{label}</div>
			<div className="hotkey">{prettifyHotkey(hotkey)}</div>
		</button>
	);
};

export default DropdownItem;
