import React from 'react'
import Checkbox from '../inputs/checkbox/Checkbox'
import './CheckboxField.scss';

const CheckboxField = ({ label, initialValue, onCheckboxChange }: { label: string, initialValue: boolean, onCheckboxChange: (checked: boolean) => void}) => {
	return (
		<div className="CheckboxField">
			<Checkbox onChange={(checked) => onCheckboxChange(checked)} checked={initialValue} />
			<div className="label">{ label }</div>
		</div>
	)
}

export default CheckboxField