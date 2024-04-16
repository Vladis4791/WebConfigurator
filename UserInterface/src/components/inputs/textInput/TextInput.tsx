import React, { useState } from 'react'
import './TextInput.scss';

const TextInput = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {

	const [currentValue, setCurrentValue] = useState(value);

	const onInputChange = (value: string) => {
		setCurrentValue(value);
		onChange(value);
	}

	return (
		<input className="TextInput" type="text" value={currentValue} onChange={(e) => onInputChange(e.target.value)} />

	)
}

export default TextInput