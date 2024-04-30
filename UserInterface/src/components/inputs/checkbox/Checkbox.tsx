import React, { useEffect, useState } from "react";
import "./Checkbox.scss";
import checkedImg from "./../../../assets/images/check.svg";

interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	onChange: (checked: boolean) => void;
	checked: boolean;
}

const Checkbox = ({ onChange, checked, ...props }: CheckboxProps) => {
	const [isChecked, setIsChecked] = useState(checked);

	const onChecked = (checked: boolean) => {
		setIsChecked(checked);
		onChange(checked);
	};

	const id = `${Math.random()}-${Date.now()}`;

	return (
		<div {...props} className={`Checkbox ${props.className}`}>
			<input
				type="checkbox"
				checked={isChecked}
				id={id}
				onChange={(e) => onChecked(e.target.checked)}
			/>
			<label htmlFor={id}>
				<img src={checkedImg} alt="" />
			</label>
		</div>
	);
};

export default Checkbox;
