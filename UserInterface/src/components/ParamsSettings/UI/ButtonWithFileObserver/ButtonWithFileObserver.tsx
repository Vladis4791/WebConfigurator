import React, { useState } from 'react'
import Button from '../../../button/Button';
import FileObserver from '../../../fileObserver/FileObserver';
import { FileObserverType } from '../../../../interfaces/FileObserver';
import { useSettings } from '../../../../contexts/SettingsContext';

interface SelectDirectoryComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onFileObserverSubmit: (path: string) => void
}

const SelectDirectoryButtonWithFileObserver = ({ onFileObserverSubmit, ...buttonProps }: SelectDirectoryComponentProps) => {

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button {...buttonProps} onClick={() => setIsOpen(true)} />
			<FileObserver
				onClose={() => setIsOpen(false)}
				onSubmit={onFileObserverSubmit}
				fileObserverType={FileObserverType.SELECT_DIRECTORY}
			/>
		</>
	)
}

export default SelectDirectoryButtonWithFileObserver;

