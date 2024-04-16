import React, { useEffect, useState } from 'react'
import './Checkbox.scss';
import checkedImg from './../../../assets/images/check.svg';

const Checkbox = ({ onChange, checked }: { onChange: (checked: boolean) => void, checked: boolean }) => {

	const [isChecked, setIsChecked] = useState(checked);


	const onChecked = (checked: boolean) => {
		setIsChecked(checked)
		onChange(checked);
	}

	const id = `${Math.random()}-${Date.now()}`;

	return (  
		<div className="Checkbox">
			<input type="checkbox" checked={isChecked} id={id} onChange={(e) => onChecked(e.target.checked)} />
			<label htmlFor={id}><img src={checkedImg} alt=""/></label>
		</div> 
	)
}

export default Checkbox