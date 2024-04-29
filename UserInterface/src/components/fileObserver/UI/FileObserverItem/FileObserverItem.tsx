import React, { useEffect, useRef, useState } from "react";
import "./FileObserverItem.scss";

const FileObserverItem = (props: {
	icon: React.ReactNode;
	itemName: string;
	onDoubleClick?: () => void;
	onClick: () => void;
	onEditCancel?: () => void;
	onEditSubmit?: (fileName: string) => void;
	isClicked: boolean;
	editable?: boolean;
}) => {
	const { icon, itemName, isClicked, onDoubleClick, onClick, editable, onEditCancel = () => {}, onEditSubmit = () => {} } =
		props;
	const [entryName, setEntryName] = useState(itemName);
	const valueBeforeEdit = useRef(itemName);
	const inputRef = useRef<HTMLInputElement>(null);
	// useHotkeys(hotkey ?? "", () => {
	// 	const isButtonDisabled = props.disabled ?? false;

	// 	if (hotkey && !isButtonDisabled) {
	// 		handleClick(null);
	// 	}
	// });

	useEffect(() => {
		if(editable) {
			inputRef.current?.focus();
		}
	}, [editable])

	useEffect(() => {
		setEntryName(itemName);
		valueBeforeEdit.current = itemName;
	}, [itemName]);

	const onProcessEditEnter = () => {
		console.log("herer")
		if(isValueValid()) {
			submitEdit();
			console.log("submit", onEditSubmit)
			
		} else {
			cancelEdit();
		}
	}

	const submitEdit = () => {
		valueBeforeEdit.current = entryName;
		onEditSubmit(entryName);
	}

	const cancelEdit = () => {
		setEntryName(valueBeforeEdit.current);
		onEditCancel();
	}

	const isValueValid = () => {
		return entryName !== "";
	}

	return (
		<div
			className={`FileObserverItem ${isClicked ? "clicked" : ""}`}
			onDoubleClick={onDoubleClick}
			onClick={onClick}
		>
			<div className="icon">{icon}</div>
			{editable ? (
				<input
					className={`entryName ${editable ? "editable" : ""}`}
					ref={inputRef}
					disabled={!!!editable}
					value={entryName}
					onChange={(e) => setEntryName(e.target.value)}
					onBlur={onProcessEditEnter}					
				/>
			) : (
				<div className="entryName">{entryName}</div>
			)}
		</div>
	);
};

export default FileObserverItem;
