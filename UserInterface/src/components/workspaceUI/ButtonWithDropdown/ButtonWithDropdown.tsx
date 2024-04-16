import React, {
	ButtonHTMLAttributes,
	RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { DropdownProps } from "../Dropdown/Dropdown";

export interface ButtonWithRef
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	buttonRef?: React.RefObject<HTMLButtonElement>;
}

const ButtonWithDropdown = ({
	renderButton,
	renderDropdown,
}: {
	renderButton: (
		props: React.ButtonHTMLAttributes<HTMLButtonElement>,
		ref: React.RefObject<HTMLButtonElement>
	) => React.ReactElement;
	renderDropdown: (
		props: Omit<DropdownProps, "renderDropdownGroup">
	) => React.ReactElement;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const placeDropdownUnderButton = () => {
		if (buttonRef.current && dropdownRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			dropdownRef.current.style.top = `${rect.top + rect.height}px`;
			dropdownRef.current.style.left = `${rect.left}px`;
		}
	};

	useEffect(placeDropdownUnderButton, [isOpen]);

	const handleClickOutside = useCallback((e: any) => {
		if (
			!dropdownRef.current?.contains(e.target) &&
			!buttonRef.current?.contains(e.target)
		) {
			setIsOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [handleClickOutside]);

	return (
		<>
			{renderButton(
				{ onClick: () => setIsOpen((prev) => !prev) },
				buttonRef
			)}
			{renderDropdown({ isOpen: isOpen, dropdownRef: dropdownRef, onClose: () => setIsOpen(false) })}
		</>
	);
};

export default ButtonWithDropdown;
