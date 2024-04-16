import React, { useEffect, useRef, useState } from 'react'
import { appAPI } from '../../APIs/app.api';
import './FileObserver.scss';
import Icon from '../icon/Icon';
import FileObserverItem from './UI/FileObserverItem/FileObserverItem';
import datebase_file from '../../assets/images/datebase_file.svg';
import disabled_right_arrow from '../../assets/images/arrow_right_disabled.svg';
import right_arrow from '../../assets/images/arrow_right.svg';
import directory from '../../assets/images/directory.svg';
import Sidebar from './UI/Sidebar/Sidebar';
import IconButton from '../IconButton/IconButton';
import { useSettings } from '../../contexts/SettingsContext';
import EntryForSubmitViewer from './UI/SelectedItemViewer/SelectedItemViewer';
import Button from '../button/Button';
import { DirectoryEntries, FileObserverEntry, FileObserverType, FileSystemEntry } from '../../interfaces/FileObserver';
import { ModalContent } from '../Modal/Modal';

interface FileObserverProps extends ModalContent {
    onSubmit: (path: string) => void,
    fileObserverType: FileObserverType
}

const FileObserver = ({ onClose, onSubmit, fileObserverType }: FileObserverProps) => {

    const emptyFileObserverEntry: FileObserverEntry = {
        name: "",
        type: fileObserverType === FileObserverType.OPEN_FILE ? FileSystemEntry.FILE : FileSystemEntry.DIRECTORY
    }

    const { settings } = useSettings();
    const [isThereError, setIsThereError] = useState(false);
    const [currentPath, setCurrentPath] = useState(settings.SavedFolderPath);
    const [clickedEntry, setClickedEntry] = useState<FileObserverEntry>(emptyFileObserverEntry);
    const [entryForSubmit, setEntryForSubmit] = useState<FileObserverEntry>(emptyFileObserverEntry);
    const [directoryEntries, setDirectoryEntries] = useState({} as DirectoryEntries);
    const [isLoading, setIsLoading] = useState(true);

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
            type: fileObserverType === FileObserverType.OPEN_FILE ? FileSystemEntry.FILE : FileSystemEntry.DIRECTORY
        }

        appAPI.getDirectoryEntries(currentPath)?.then(res => {

            const directoryEntries = res.Data as DirectoryEntries;

            if(fileObserverType === FileObserverType.SELECT_DIRECTORY) {
                directoryEntries.FilesNames = [];
            }

            setDirectoryEntries(directoryEntries)
            setIsThereError(false);
            setIsLoading(false);
            setClickedEntry(emptyFileObserverEntry);
        });

    }, [currentPath, fileObserverType]);

    useEffect(() => {
        const shouldSelectedItemCorrespondingToFileObserverTypeBeUpdated = () => {

            if(clickedEntry.name === "") {
                return false;
            }

            if(fileObserverType === FileObserverType.OPEN_FILE && clickedEntry.type === FileSystemEntry.FILE) {
                return true;
            }
    
            if(fileObserverType === FileObserverType.SELECT_DIRECTORY && clickedEntry.type === FileSystemEntry.DIRECTORY) {
                return true;
            }
    
            return false;
        }
    
        if(shouldSelectedItemCorrespondingToFileObserverTypeBeUpdated()) {
            setEntryForSubmit(clickedEntry);
        }

    }, [clickedEntry, fileObserverType]);

    const onDirectoryDoubleClicked = (directoryName: string) => goToDirectory(directoryName);

    const goToDirectory = (directoryName: string) => {
        followingPaths.current = [];
        previousPaths.current.push(currentPath);
        const nextPath = `${currentPath}/${directoryName}`;
        setCurrentPath(nextPath);
    }
    
    const onGoBackButtonClicked = () => {
        const previousPath = previousPaths.current.pop();
        if(previousPath) {
            followingPaths.current.push(currentPath);
            setCurrentPath(previousPath);
        }
    }

    const onGoForwardButtonClicked = () => {
        const followingPath = followingPaths.current.pop();

        if(followingPath) {
            previousPaths.current.push(currentPath);
            setCurrentPath(followingPath);
        }        
    }

    const onSidebarButtonClicked = (path: string) => {

        if(currentPath !== path) {
            followingPaths.current = [];
            previousPaths.current.push(currentPath);       
        }

        setCurrentPath(path);
    }

    const onFileDoubleClicked = () => {
        proccessFileSubmit();
        // onSubmit(`${currentPath}/${fileName}`);
    }

    const onSubmitButtonClicked = () => {

 
        if(isClickedEntryDirectoryWhileSelectingFiles()) {
            goToDirectory(clickedEntry.name);
        }
        else if(entryForSubmit.type === FileSystemEntry.FILE) {
            proccessFileSubmit();
        }        
        else if(entryForSubmit.type === FileSystemEntry.DIRECTORY) {
            proccessDirectorySubmit();
            onCloseOnSubmit();
        }


    }
     
    const proccessFileSubmit = () => {
        if(isEntryForSubmitInCurrentDirectory()) {
            onSubmit(`${currentPath}/${entryForSubmit.name}`);
            onCloseOnSubmit();
        } else {
            console.log("error")
            setIsThereError(true);
        }    
    }

    const isClickedEntryDirectoryWhileSelectingFiles = () => {
        return fileObserverType === FileObserverType.OPEN_FILE && clickedEntry.type === FileSystemEntry.DIRECTORY;
    }

    const proccessDirectorySubmit = () => {
        if(isEntryForSubmitInCurrentDirectory()) {
            onSubmit(`${currentPath}/${entryForSubmit.name}`)
            setCurrentPath(`${currentPath}/${entryForSubmit.name}`);
        } else {
            onSubmit(`${currentPath}`);
        }
    }

    const onCloseOnSubmit = () => {
        resetFileObserverInternals();
        initialPath.current = currentPath;
        onClose();
    }

    const onCloseOnCancel = () => {
        resetFileObserverInternals();
        setCurrentPath(initialPath.current); 
        onClose(); 
    }

    const resetFileObserverInternals = () => {
        previousPaths.current = [];
        followingPaths.current = [];
        setClickedEntry(emptyFileObserverEntry);
        setEntryForSubmit(emptyFileObserverEntry);
    }
    
    const isEntryForSubmitInCurrentDirectory = () => {

        let entriesNames: string[] = [];

        if(clickedEntry.type === FileSystemEntry.DIRECTORY) {
            entriesNames = directoryEntries.SubdirectoriesNames;
        } else {
            entriesNames = directoryEntries.FilesNames;
        }

        const index = entriesNames.findIndex((name) => name === clickedEntry.name);

        return index !== -1;
    }


    const isDirectoryEmpty = () => {
        return directoryEntries.FilesNames.length === 0 && directoryEntries.SubdirectoriesNames.length === 0;
    }

    const styleToRotateIconBy180Degrees: React.CSSProperties = { "transform": "rotate(180deg)" };

    const goForwardIcon = (disabled: boolean) => !disabled 
    ? <Icon url={right_arrow} /> 
    : <Icon url={disabled_right_arrow} />;

    const goBackIcon = (disabled: boolean) => !disabled 
    ? <Icon style={styleToRotateIconBy180Degrees} url={right_arrow} /> 
    : <Icon style={styleToRotateIconBy180Degrees} url={disabled_right_arrow} />;

    const backForwardButtonsSize: React.CSSProperties = {
        "width": "35px",
        "height": "35px"
    };

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
                        </div>
                        <div className="pathViewer">
                            { currentPath }
                        </div>
                    </div>
                </div>
            </div>
            <div className="fileObserverWorkspace">
                <div className="container">
                    <div className="fileObserverWorkspaceWrapper">
                        <div className="sidebar">
                            <Sidebar onButtonClick={onSidebarButtonClicked} />
                        </div>
                        <div className="content">
                            { isLoading ? "loading..." : 
                                <>
                                {
                                    isDirectoryEmpty() ? "Папка пуста" : 
                                    <>
                                        { directoryEntries.SubdirectoriesNames.map((subdirectoryName) =>    
                                        <FileObserverItem 
                                            key={subdirectoryName}
                                            itemName={subdirectoryName}
                                            onDoubleClick={() => onDirectoryDoubleClicked(subdirectoryName)}
                                            onClick={() => setClickedEntry({
                                                type: FileSystemEntry.DIRECTORY,
                                                name: subdirectoryName
                                            })}
                                            isClicked={clickedEntry.name === subdirectoryName && clickedEntry.type === FileSystemEntry.DIRECTORY}
                                            icon={<Icon url={directory} />} 
                                        />
                                        )}
                                        { directoryEntries.FilesNames.map((fileName) =>    
                                            <FileObserverItem 
                                                key={fileName}
                                                itemName={fileName}
                                                onDoubleClick={onFileDoubleClicked}
                                                onClick={() => setClickedEntry({
                                                    type: FileSystemEntry.FILE,
                                                    name: fileName
                                                })}
                                                isClicked={clickedEntry.name === fileName && clickedEntry.type === FileSystemEntry.FILE}
                                                icon={<Icon url={datebase_file} />} 
                                            />
                                        )}
                                    </>
                                }
                                </>      
                            }                      
                        </div>
                    </div>
                </div>          
            </div>
            <div className="footer">
                <div className="container">
                    <EntryForSubmitViewer 
                        entryForSubmit={entryForSubmit} 
                        isErrorMessageShown={isThereError}
                    />
                    <div className="actionButtons">
                        <Button onClick={onCloseOnCancel} className="cancelButton">Отменить</Button>
                        <Button onClick={onSubmitButtonClicked} className="submitButton">
                            { fileObserverType === FileObserverType.OPEN_FILE  ? "Открыть" : "Выбор папки" }
                        </Button>
                    </div>  
                </div>
            </div>
        </div>            
    );
}

export default FileObserver