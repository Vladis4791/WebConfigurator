import React from 'react'
import './IconButton.scss';
import { ButtonWithRef } from '../workspaceUI/ButtonWithDropdown/ButtonWithDropdown';

interface IconButtonProps extends ButtonWithRef {
    renderIcon: (disabled: boolean) => JSX.Element
}

const IconButton = ({ renderIcon, buttonRef, ...props }: IconButtonProps) => {

    return (
        <button ref={buttonRef} {...props} className={`${props.className} IconButton`}>
            { renderIcon(props.disabled ?? false) }
        </button>
    )
}

export default IconButton