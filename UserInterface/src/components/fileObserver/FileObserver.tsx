import React, { useEffect, useRef, useState } from "react";
import { appAPI } from "../../APIs/app.api";
import "./FileObserver.scss";
import Icon from "../icon/Icon";
import FileObserverItem from "./UI/FileObserverItem/FileObserverItem";
import datebase_file from "../../assets/images/datebase_file.svg";
import disabled_right_arrow from "../../assets/images/arrow_right_disabled.svg";
import right_arrow from "../../assets/images/arrow_right.svg";
import directory from "../../assets/images/directory.svg";
import Sidebar from "./UI/Sidebar/Sidebar";
import IconButton from "../IconButton/IconButton";
import { useSettings } from "../../contexts/SettingsContext";
import EntryForSubmitViewer from "./UI/SelectedItemViewer/SelectedItemViewer";
import Button from "../button/Button";
import {
	DirectoryEntries,
	FileObserverEntry,
	FileObserverType,
	FileSystemEntry,
} from "../../interfaces/FileObserver";
import { ModalContent } from "../Modal/Modal";
import new_file_image from "../../assets/images/new_file.svg";

interface FileObserverProps extends ModalContent {
	onSubmit: (path: string) => void;
	fileObserverType: FileObserverType;
}

const FileObserver = ({
	onClose,
	onSubmit,
	fileObserverType,
}: FileObserverProps) => {
	const emptyFileObserverEntry: FileObserverEntry = {
		name: "",
		type:
			fileObserverType === FileObserverType.SELECT_DIRECTORY
				? FileSystemEntry.DIRECTORY
				: FileSystemEntry.FILE,
	};

	const { settings } = useSettings();
	const [isThereError, setIsThereError] = useState(false);
	const [currentPath, setCurrentPath] = useState(settings.SavedFolderPath);
	const [clickedEntry, setClickedEntry] = useState<FileObserverEntry>(
		emptyFileObserverEntry
	);
	const [entryForSubmit, setEntryForSubmit] = useState<FileObserverEntry>(
		emptyFileObserverEntry
	);
	const [directoryEntries, setDirectoryEntries] = useState(
		{} as DirectoryEntries
	);
	const [isLoading, setIsLoading] = useState(true);
	const [isCreatingNewFile, setIsCreatingNewFile] = useState(false);

	const [newEntries, setNewEntries] = useState<FileObserverEntry[]>([]);

	const initialPath = useRef<string>("");
	const previousPaths = useRef<string[]>([]);
	const followingPaths = useRef<string[]>([]);

	useEffect(() => {
		setCurrentPath(settings.SavedFolderPath);
		initialPath.current = settings.SavedFolderPath;
	}, [settings]);

	useEffect(() => {
		setIsLoading(true);

		const emptyFileObserverEntry: FileObserverEntry = {
			name: "",
			type:
				fileObserverType === FileObserverType.SELECT_DIRECTORY
					? FileSystemEntry.DIRECTORY
					: FileSystemEntry.FILE,
		};

		appAPI.getDirectoryEntries(currentPath)?.then((res) => {
			const directoryEntries = res.Data as DirectoryEntries;

			if (fileObserverType === FileObserverType.SELECT_DIRECTORY) {
				directoryEntries.FilesNames = [];
			}

			setDirectoryEntries(directoryEntries);
			setIsThereError(false);
			setIsLoading(false);
			setClickedEntry(emptyFileObserverEntry);
			setNewEntries([]);

		});
	}, [currentPath, fileObserverType]);

	useEffect(() => {
		const shouldSelectedItemCorrespondingToFileObserverTypeBeUpdated =
			() => {
				if (clickedEntry.name === "") {
					return false;
				}

				if (
					(fileObserverType === FileObserverType.OPEN_FILE || fileObserverType === FileObserverType.SAVE_AS_FILE) &&
					clickedEntry.type === FileSystemEntry.FILE
				) {
					return true;
				}

				if (
					fileObserverType === FileObserverType.SELECT_DIRECTORY &&
					clickedEntry.type === FileSystemEntry.DIRECTORY
				) {
					return true;
				}

				return false;
			};

		if (shouldSelectedItemCorrespondingToFileObserverTypeBeUpdated()) {
			setEntryForSubmit(clickedEntry);
		}
	}, [clickedEntry, fileObserverType]);

	const onDirectoryDoubleClicked = (directoryName: string) =>
		goToDirectory(directoryName);

	const goToDirectory = (directoryName: string) => {
		followingPaths.current = [];
		previousPaths.current.push(currentPath);
		const nextPath = `${currentPath}/${directoryName}`;
		setCurrentPath(nextPath);
	};

	const onGoBackButtonClicked = () => {
		const previousPath = previousPaths.current.pop();
		if (previousPath) {
			followingPaths.current.push(currentPath);
			setCurrentPath(previousPath);
		}
	};

	const onGoForwardButtonClicked = () => {
		const followingPath = followingPaths.current.pop();

		if (followingPath) {
			previousPaths.current.push(currentPath);
			setCurrentPath(followingPath);
		}
	};

	const onSidebarButtonClicked = (path: string) => {
		if (currentPath !== path) {
			followingPaths.current = [];
			previousPaths.current.push(currentPath);
		}

		setCurrentPath(path);
	};

	const onFileDoubleClicked = () => {
		proccessFileSubmit();
	};

	const onSubmitButtonClicked = () => {
		if (isClickedEntryDirectoryWhileSelectingFiles()) {
			goToDirectory(clickedEntry.name);
		} else if (entryForSubmit.type === FileSystemEntry.FILE) {
			proccessFileSubmit();
		} else if (entryForSubmit.type === FileSystemEntry.DIRECTORY) {
			proccessDirectorySubmit();
			onCloseOnSubmit();
		}
	};

	const proccessFileSubmit = () => {
		const entryName = entryForSubmit.name;

		if (isFileInCurrentDirectory(entryName)) {
			onSubmit(`${currentPath}/${entryName}`);
			onCloseOnSubmit();
		} else {
			if (isDirectoryInCurrentDirectory(entryName)) {
				goToDirectory(entryName);
				setEntryForSubmit(emptyFileObserverEntry);
			}
			console.log("error");
			setIsThereError(true);
		}
	};

	const isFileInCurrentDirectory = (fileName: string) => {
		const filesNames = directoryEntries.FilesNames;
		const newFilesNames = getNamesOfEntriesByType(newEntries, FileSystemEntry.FILE);

		return filesNames.includes(fileName) || newFilesNames.includes(fileName);
	};

	const isDirectoryInCurrentDirectory = (directoryName: string) => {
		const subdirectoriesNames = directoryEntries.SubdirectoriesNames;
		const newSubdirectoriesNames = getNamesOfEntriesByType(newEntries, FileSystemEntry.DIRECTORY);

		return subdirectoriesNames.includes(directoryName) || newSubdirectoriesNames.includes(directoryName);
	};

	const getNamesOfEntriesByType = (entries: FileObserverEntry[], type: FileSystemEntry) => {
		const entriesFilteredByType = entries.filter(entry => entry.type === type);
		return entriesFilteredByType.map(entry => entry.name);
	}

	const isClickedEntryDirectoryWhileSelectingFiles = () => {
		return (
			fileObserverType === FileObserverType.OPEN_FILE &&
			clickedEntry.type === FileSystemEntry.DIRECTORY
		);
	};

	const proccessDirectorySubmit = () => {
		if (isDirectoryInCurrentDirectory(entryForSubmit.name)) {
			onSubmit(`${currentPath}/${entryForSubmit.name}`);
			setCurrentPath(`${currentPath}/${entryForSubmit.name}`);
		} else {
			onSubmit(`${currentPath}`);
		}
	};

	const onCloseOnSubmit = () => {
		resetFileObserverInternals();
		initialPath.current = currentPath;
		onClose();
	};

	const onCloseOnCancel = () => {
		resetFileObserverInternals();
		setCurrentPath(initialPath.current);
		onClose();
	};

	const resetFileObserverInternals = () => {
		previousPaths.current = [];
		followingPaths.current = [];
		setClickedEntry(emptyFileObserverEntry);
		setEntryForSubmit(emptyFileObserverEntry);
	};

	const isDirectoryEmpty = () => {
		return (
			directoryEntries.FilesNames.length === 0 &&
			directoryEntries.SubdirectoriesNames.length === 0
		);
	};

	const styleToRotateIconBy180Degrees: React.CSSProperties = {
		transform: "rotate(180deg)",
	};

	const goForwardIcon = (disabled: boolean) =>
		!disabled ? (
			<Icon url={right_arrow} />
		) : (
			<Icon url={disabled_right_arrow} />
		);

	const goBackIcon = (disabled: boolean) =>
		!disabled ? (
			<Icon style={styleToRotateIconBy180Degrees} url={right_arrow} />
		) : (
			<Icon
				style={styleToRotateIconBy180Degrees}
				url={disabled_right_arrow}
			/>
		);

	const backForwardButtonsSize: React.CSSProperties = {
		width: "35px",
		height: "35px",
	};

	const onNewFileCreate = () => {
		setIsCreatingNewFile(true);
		setClickedEntry(emptyFileObserverEntry);
	};

	const onNewFileCreated = (fileName: string) => {
		setIsCreatingNewFile(false);
		addNewEntry(fileName, FileSystemEntry.FILE);
		appAPI.createNewFile(`${currentPath}/${fileName}`);
	};

	const addNewEntry = (name: string, type: FileSystemEntry) => {
		const newEntry: FileObserverEntry = {
			name: name,
			type: type
		}
		setNewEntries(prev => [...prev, newEntry])
	}

	const onNewFileCreatingGotCanceled = () => {
		setIsCreatingNewFile(false);
	};

	const getSubmitButtonName = () => {
		switch(fileObserverType) {
			case FileObserverType.OPEN_FILE:
				return "Открыть"
			case FileObserverType.SELECT_DIRECTORY:
				return "Выбрать папку"
			case FileObserverType.SAVE_AS_FILE:
				return "Сохранить"
		}
	}


	return (
		<div className="FileObserver">
			<div className="menu">
				<div className="container">
					<div className="menu-wrapper">
						<div className="backForwardButtons">
							<IconButton
								disabled={previousPaths.current.length === 0}
								renderIcon={goBackIcon}
								style={backForwardButtonsSize}
								onClick={onGoBackButtonClicked}
							/>
							<IconButton
								disabled={followingPaths.current.length === 0}
								renderIcon={goForwardIcon}
								style={backForwardButtonsSize}
								onClick={onGoForwardButtonClicked}
							/>
							{fileObserverType ===
							FileObserverType.SAVE_AS_FILE ? (
								<IconButton
									onClick={onNewFileCreate}
									renderIcon={() => (
										<Icon url={new_file_image} />
									)}
								/>
							) : null}
						</div>
						<div className="pathViewer">{currentPath}</div>
					</div>
				</div>
			</div>
			<div className="fileObserverWorkspace">
				<div className="container">
					<div className="fileObserverWorkspaceWrapper">
						<div className="sidebar">
							<Sidebar
								onRootDirectoryClick={onSidebarButtonClicked}
							/>
						</div>
						<div className="content">
							{isLoading ? (
								"loading..."
							) : (
								<>
									{isDirectoryEmpty() ? (
										"Папка пуста"
									) : (
										<>
											{directoryEntries.SubdirectoriesNames.map(
												(subdirectoryName) => (
													<FileObserverItem
														key={subdirectoryName}
														itemName={
															subdirectoryName
														}
														onDoubleClick={() =>
															onDirectoryDoubleClicked(
																subdirectoryName
															)
														}
														onClick={() =>
															setClickedEntry({
																type: FileSystemEntry.DIRECTORY,
																name: subdirectoryName,
															})
														}
														isClicked={
															clickedEntry.name ===
																subdirectoryName &&
															clickedEntry.type ===
																FileSystemEntry.DIRECTORY
														}
														icon={
															<Icon
																url={directory}
															/>
														}
													/>
												)
											)}
											{directoryEntries.FilesNames.map(
												(fileName) => (
													<FileObserverItem
														key={fileName}
														itemName={fileName}
														onDoubleClick={
															onFileDoubleClicked
														}
														onClick={() =>
															setClickedEntry({
																type: FileSystemEntry.FILE,
																name: fileName,
															})
														}
														isClicked={
															clickedEntry.name ===
																fileName &&
															clickedEntry.type ===
																FileSystemEntry.FILE
														}
														icon={
															<Icon
																url={
																	datebase_file
																}
															/>
														}
													/>
												)
											)}
											{newEntries.map(entry => 
												<FileObserverItem
												key={entry.name}
												itemName={entry.name}
												onDoubleClick={
													onFileDoubleClicked //TODO make for directories too
												}
												onClick={() =>
													setClickedEntry(entry)
												}
												isClicked={
													clickedEntry.name ===
														entry.name &&
													clickedEntry.type ===
														entry.type
												}
												icon={
													<Icon
														url={
															entry.type === FileSystemEntry.DIRECTORY ? directory : datebase_file
														}
													/>
												}
											/>
											)}

											{isCreatingNewFile ? (
												<FileObserverItem
													itemName=".xdb"
													onClick={() => {}}
													isClicked={true}
													icon={
														<Icon
															url={datebase_file}
														/>
													}
													editable={true}
                                                    onEditSubmit={(name) => onNewFileCreated(name)}
                                                    onEditCancel={onNewFileCreatingGotCanceled}
												/>
											) : null}
										</>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="footer">
				<div className="container">
					<EntryForSubmitViewer
						setEntryForSumbit={(entry) => setEntryForSubmit(entry)}
						entryForSubmit={entryForSubmit}
						isErrorMessageShown={isThereError}
					/>
					<div className="actionButtons">
						<Button
							onClick={onCloseOnCancel}
							className="cancelButton"
						>
							Отменить
						</Button>
						<Button
							onClick={onSubmitButtonClicked}
							className="submitButton"
						>
							{getSubmitButtonName()}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileObserver;
