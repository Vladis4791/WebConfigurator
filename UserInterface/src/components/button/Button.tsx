import React from 'react'
import './Button.scss';

const Button = ({
	...buttonProps 
	}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button {...buttonProps} className={`Button ${buttonProps.className}`}>
		</button>
	)
}

export default Button