export interface DirectoryEntries {
    FilesNames: string[]
    SubdirectoriesNames: string[]
}

export enum FileObserverType {
    SELECT_DIRECTORY,
    OPEN_FILE
}

export enum FileSystemEntry {
    FILE,
    DIRECTORY
}

export interface FileObserverEntry {
    type: FileSystemEntry,
    name: string
}