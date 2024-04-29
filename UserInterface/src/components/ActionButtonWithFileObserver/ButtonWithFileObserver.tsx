import React, { useState } from 'react'
import FileObserver from '../fileObserver/FileObserver'
import ActionButton, { ActionButtonParams } from '../actionButton/ActionButton'
import { FileObserverType } from '../../interfaces/FileObserver';
import { useNavigate } from 'react-router-dom';

const ActionButtonWithFileObserver = (props: Omit<ActionButtonParams, 'onClick'>) => {

	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<ActionButton {...props} onClick={() => setIsOpen(true)} />
			<FileObserver 	
				onClose={() => setIsOpen(false)}
				onSubmit={(path) => navigate('/workspace/saved', {
					state: {
						filePath: path
					}
				})}
				fileObserverType={FileObserverType.OPEN_FILE}
			/>
		</>
	)
}

export default ActionButtonWithFileObserver