import React, { useState, useReducer, useRef, useEffect } from 'react'
import './NumberInput.scss';
import arrow from './../../../assets/images/arrow white.svg';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';

interface NumberInputType {
	initialValue: number,
	onChange: (value: any) => void,
	onBlur: () => void,
	min: number,
	max: number,
	step: number,
	fractionDigits: number,
}

const NumberInput = (props: NumberInputType) => {

	const { initialValue, onChange, min, max, step, fractionDigits } = props;

	const [currentValue, setCurrentValue] = useState<number>(initialValue);

	const handleChange = (value: number) => {
		setCurrentValue(value);
		onChange(value);
	}

	return (
		<div className="NumberInput">
			<InputNumber 
				max={max} 
				min={min} 
				step={step} 
				value={currentValue} 
				onValueChange={(e: InputNumberValueChangeEvent) => handleChange(e.value as number)} 
				minFractionDigits={0} 
				maxFractionDigits={fractionDigits}
				showButtons
			/>
		</div>
		
	)
}

export default NumberInput