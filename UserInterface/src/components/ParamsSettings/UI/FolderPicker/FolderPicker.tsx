import React, { useEffect, useState } from "react";
import "./FolderPicker.scss";
import ButtonWithModal from "../../../ButtonWithModal/ButtonWithModal";
import Button from "../../../button/Button";
import FileObserver from "../../../fileObserver/FileObserver";
import { FileObserverType } from "../../../../interfaces/FileObserver";

const FolderPicker = ({
	initialValue,
	onChange,
}: {
	initialValue: string;
	onChange: (path: string) => void;
}) => {
	const [directoryPathWhereDBFileWillBeSaved, setDirectoryPathWhereDBFileWillBeSaved] = useState(initialValue);

	const onFileObserverSubmit = (path: string) => {
		setDirectoryPathWhereDBFileWillBeSaved(path);
		onChange(path);
	};

	return (
		<div className="FolderPicker">
			<div className="FolderPicker__header">
				Путь для сохранения файлов
			</div>
			<div className="content">
				<div className="pathBlock">
					{directoryPathWhereDBFileWillBeSaved}
				</div>
				<ButtonWithModal
					modalName="Выбор папки для сохранения файлов БД"
					renderButton={(props) => (
						<Button
							{...props}
							type="button"
							className="selectButton"
						>
							Выбрать
						</Button>
					)}
					renderModalContent={(props) => (
						<FileObserver
							{...props}
							onSubmit={onFileObserverSubmit}
							fileObserverType={FileObserverType.SELECT_DIRECTORY}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default FolderPicker;
