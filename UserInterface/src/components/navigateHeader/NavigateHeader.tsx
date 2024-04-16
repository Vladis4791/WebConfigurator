import React from 'react'
import arrow from './../../assets/images/arrow.svg';
import './NavigateHeader.scss';
import { useNavigate } from 'react-router-dom';

const NavigateHeader = ({ currentLocation } : { currentLocation: string }) => {
  
    const navigate = useNavigate();

    return (
        <div className="NavigateHeader">
            <div className="navButtonBlock" onClick={() => navigate(-1)}>
                <img src={arrow} alt="" />
                <span>Вернуться</span>
            </div>
            <div className="currentLocation">{ currentLocation }</div>
        </div>
    )
}

export default NavigateHeader