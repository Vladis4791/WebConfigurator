import React from 'react'
import './InfoWindow.scss';
import { ModalContent } from '../Modal/Modal';

interface InfoWindowProps extends ModalContent {
    message: string;
}

const InfoWindow = ({ message, onClose }: InfoWindowProps) => {
    return (
        <div className="InfoWindow">
           { message } 
        </div>
    )
}

export default InfoWindow