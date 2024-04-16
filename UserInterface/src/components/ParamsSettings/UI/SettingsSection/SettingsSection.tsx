import React from 'react'
import './SettingsSection.scss';

const SettingsSection = ({ sectionName, children }: { sectionName: string, children: React.ReactElement }) => {
  return (
    <div className="SettingsSection">
		<h3 className="SectionHeader">{ sectionName }</h3>
		<div className="sectionContent">
			{ children }
		</div>
    </div>
    
  )
}

export default SettingsSection