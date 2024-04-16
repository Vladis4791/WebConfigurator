import React, { useEffect, useState } from 'react'
import './RadioButton.scss';

const RadioButton = (props: { radioButtonName: string, checked: boolean, onChange: () => void, groupName: string }) => {
  
	const { radioButtonName, onChange, groupName, checked } = props; 


	return (
		<label className="RadioButtonBlock">
			<input className="RadioButton" onChange={onChange} type="radio" name={groupName} checked={checked} value={ radioButtonName } /> 
			<div className="customRadioButton"><div className="circle"></div></div>
			<div className="label">{ radioButtonName }</div>
		</label>
	)
}

export default RadioButton