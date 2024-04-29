import React, { useEffect, useRef, useState } from "react";
import "./SelectedItemViewer.scss";
import {
	FileObserverEntry,
	FileSystemEntry,
} from "../../../../interfaces/FileObserver";
import { Message } from "primereact/message";

const EntryForSubmitViewer = (props: {
	entryForSubmit: FileObserverEntry;
    setEntryForSumbit: (entry: FileObserverEntry) => void,
	isErrorMessageShown: boolean;
}) => {
	const { entryForSubmit, setEntryForSumbit, isErrorMessageShown = false } = props;

	const selectEntry = `Выберите ${entryForSubmit.type === FileSystemEntry.FILE ? "файл" : "папку"}`;
	const noSuchEntry = "Нет такого элемента в данной папке!";
	const errorMessage = entryForSubmit.name === "" ? selectEntry : noSuchEntry;

	useEffect(() => {
		setEntryForSumbit(entryForSubmit);
	}, [entryForSubmit, setEntryForSumbit])

    const onChange = (value: string) => {
        const newEntryForSumbit: FileObserverEntry = {
            type: entryForSubmit.type,
            name: value
        }

        setEntryForSumbit(newEntryForSumbit);
    }

	return (
		<div className="SelectedItemViewer">
			<div className="selectedItemName">
				{entryForSubmit.type === FileSystemEntry.DIRECTORY
					? "Папка"
					: "Имя файла"}
			</div>
			<input
				className="selectedItemValue"
				value={entryForSubmit.name}
				onChange={(e) => onChange(e.target.value)}
			/>
			<div className="error-block">
				{isErrorMessageShown ? (
					<Message text={errorMessage} security="error" />
				) : null}
			</div>
		</div>
	);
};

export default EntryForSubmitViewer;
