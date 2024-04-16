import React, { ButtonHTMLAttributes } from 'react'
import './DropdownItem.scss';

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
	hotkey?: string
	closeDropdown: () => void
	icon?: React.ReactElement,
	isLast?: boolean
}

const DropdownItem = ({ label, hotkey, icon, isLast = false, closeDropdown, ...props }: DropdownItemProps) => {

	const handleClick = (e: any) => {
		closeDropdown();
		if(props.onClick) {
			props.onClick(e);
		}
	}

	return (
		<button {...props} className={`DropdownItem ${props.className} ${isLast ? "underlined" : ""}`} onClick={handleClick}>
			{ icon ? <div className="icon">{icon}</div> : null }
			<div className="label">{label}</div>
			{ hotkey ? <div className="hotkey"></div> : null }	
		</button>
	)
}

export default DropdownItem