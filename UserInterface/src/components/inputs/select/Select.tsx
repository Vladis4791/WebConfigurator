import React, { useEffect, useRef, useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import './Select.scss';

export interface SelectOptionProps {
	value: string
	index: number
}

interface SelectProps {
	initialValue: string,
	options: string[],
	disabled?: boolean,
	onChange: (selectedOption: SelectOptionProps) => void;
}

const Select = (props: SelectProps) => {

	const { options, disabled = false, initialValue, onChange } = props
	const [selectedOption, setSelectedOption] = useState(initialValue)

	useEffect(() => {
		onChange({
			value: selectedOption,
			index: options.findIndex(option => option === selectedOption)
		});
	}, [onChange, selectedOption, options])

	return (
		<Dropdown className="Select" value={selectedOption} onChange={(e) => setSelectedOption(e.value)} options={options} disabled={disabled} />
	)
}

export default Select