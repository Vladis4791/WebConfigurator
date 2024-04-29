export interface DirectoryEntries {
    FilesNames: string[]
    SubdirectoriesNames: string[]
}

export enum FileObserverType {
    SELECT_DIRECTORY = "Выбрать папку",
    OPEN_FILE = "Открыть",
    SAVE_FILE = "Сохранить",
    SAVE_AS_FILE = "Сохранить как"
}

export enum FileSystemEntry {
    FILE,
    DIRECTORY
}

export interface FileObserverEntry {
    type: FileSystemEntry,
    name: string
}