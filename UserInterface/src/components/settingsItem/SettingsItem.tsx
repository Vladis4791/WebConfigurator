import React from 'react'
import './SettingsItem.scss';

const SettingsItem = ({ label, input }: { label: string, input: React.ReactElement }) => {
  
  return (
    <div className="SettingsItem">
        <div className="label">{label}</div>
        <div className="input">{ input }</div>
    </div>
  )
}

export default SettingsItem