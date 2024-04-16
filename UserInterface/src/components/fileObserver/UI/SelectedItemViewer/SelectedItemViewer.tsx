import React, { useRef } from 'react'
import './SelectedItemViewer.scss'
import { FileObserverEntry, FileSystemEntry } from '../../../../interfaces/FileObserver';
import { Message } from 'primereact/message';

const EntryForSubmitViewer = (props: { 
    entryForSubmit: FileObserverEntry,
    isErrorMessageShown: boolean
}) => {

    const { entryForSubmit, isErrorMessageShown = false } = props;

    const selectEntry = `Выберите ${entryForSubmit.type === FileSystemEntry.FILE ? "файл" : "папку"}`;
    const noSuchEntry = "Нет такого элемента в данной папке!";
    const errorMessage = entryForSubmit.name === "" ? selectEntry : noSuchEntry;

    return (
        <div className="SelectedItemViewer">
            <div className="selectedItemName">
                { entryForSubmit.type === FileSystemEntry.FILE ? "Имя файла" : "Папка" }
            </div>
            <input className="selectedItemValue" value={entryForSubmit.name} disabled readOnly />
            <div className="error-block">
                { isErrorMessageShown 
                ? 
                    <Message 
                        text={errorMessage}
                        security="error"
                    /> 
                : null }
            </div>
        </div>
    )
}

export default EntryForSubmitViewer