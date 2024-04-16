import React, { ButtonHTMLAttributes } from 'react'
import Icon from '../../../icon/Icon'
import './ToolMenuButton.scss'

interface ToolMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageURL: string
}

const ToolMenuButton = ({
    imageURL,
    onClick, 
}: ToolMenuButtonProps) => {

  return (
	<button className="ToolMenuButton" onClick={onClick}>
		<Icon url={imageURL} />
	</button>
  )
}

export default ToolMenuButton