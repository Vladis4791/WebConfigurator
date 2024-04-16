import React from 'react';
import './Icon.scss';

const Icon = ({ url, style }: { url: string, style?: React.CSSProperties }) => {
    return (
        <img className="Icon" src={url} style={style} alt="" />
    )
}

export default Icon;