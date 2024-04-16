import React from 'react'
import './FileObserverItem.scss';


const FileObserverItem = (props: { 
	icon: React.ReactNode, 
	itemName: string,
	onDoubleClick: () =>  void,
	onClick: () => void,
	isClicked: boolean
	}) => {
	
	const { icon, itemName, isClicked, onDoubleClick, onClick } = props;

	return (
		<div 
			className={`FileObserverItem ${isClicked ? "clicked" : ""}`} 
			onDoubleClick={onDoubleClick}
			onClick={onClick}
		>
			<div className="icon">
				{ icon }
			</div>
			<div className="itemName">
				{ itemName }
			</div>
		</div>
	)
}

export default FileObserverItem