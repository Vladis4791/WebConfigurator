import React from 'react'
import './ActionButton.scss';

export interface ActionButtonParams extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactElement
    title: string
}

const ActionButton = ({
    icon,
    title,
    ...props
}: ActionButtonParams) => {

    return (
        <button {...props} className="ActionButton">
            <div className="wrapper">
                <div className="icon">
                    <div className="icon-wrapper">
                        { icon } 
                    </div>   
                </div>
                <div className="title">{ title }</div>
            </div>
        </button>
    )
}

export default ActionButton