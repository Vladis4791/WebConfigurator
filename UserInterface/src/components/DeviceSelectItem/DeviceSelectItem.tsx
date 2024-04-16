import React from 'react'
import './DeviceSelectItem.scss';

const DeviceSelectItem = ({ deviceName, isChecked, onChange }: {deviceName: string, isChecked: boolean, onChange: (value: string) => void }) => {
  
	return (
		<div className="DeviceSelectItem">
			<input type="radio" className="radio" name='DeviceSelectItem' id={deviceName} checked={isChecked} onChange={() => onChange(deviceName)} />
			<label htmlFor={deviceName}>
				<div className="deviceName">{deviceName}</div>
				<div className="toolChecked">{isChecked ? "Выбран" : null}</div>
			</label>
		</div>
	)
}

export default DeviceSelectItem