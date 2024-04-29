import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ITableNode } from "../interfaces/ITableNode";
import { IDevice } from "../interfaces/IDeviceParams";
import { workspaceToolsService } from "../services/WorkspaceToolsService";
import { tableService } from "../services/TableService";

interface WorkspaceContextValue {
	tableNodes: ITableNode[];
	currentDevice: IDevice;
	setTableNodes: React.Dispatch<React.SetStateAction<ITableNode[]>>;
	setCurrentDevice: React.Dispatch<React.SetStateAction<IDevice>>;
	filePathToSave?: string;
	setFilePathToSave: React.Dispatch<React.SetStateAction<string | undefined>>;
	saveFileAs: (path: string) => void;
	saveFile: () => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextValue | undefined>(
	undefined
);

const WorkspaceProvider = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	const [tableNodes, setTableNodes] = useState<ITableNode[]>([]);
	const [currentDevice, setCurrentDevice] = useState<IDevice>({} as IDevice);
	const [filePathToSave, setFilePathToSave] = useState<string | undefined>();

	useEffect(() => setFilePathToSave(undefined), [currentDevice]);

	const saveFileAs = (path: string) => {
		if(!filePathToSave) {
			setFilePathToSave(path)
		}

		saveDeviceByPath(tableNodes, path);
	}	

	const saveFile = () => {
		if (filePathToSave) {
			saveDeviceByPath(tableNodes, filePathToSave);
		}
	};

	const saveDeviceByPath = (tableNodes: ITableNode[], path: string) => {
		workspaceToolsService.saveDeviceToFile(tableNodes, path).then(() => 
			setTableNodes(
				tableService.getTableNodesWithUneditedNodes(tableNodes)
			)
		);
	}

	return (
		<WorkspaceContext.Provider
			value={{
				tableNodes,
				currentDevice,
				setTableNodes,
				setCurrentDevice,
				filePathToSave,
				setFilePathToSave,
				saveFile,
				saveFileAs,
			}}
		>
			{children}
		</WorkspaceContext.Provider>
	);
};

export const useWorkspace = (): WorkspaceContextValue => {
	const context = useContext(WorkspaceContext);
	if (!context) {
		throw new Error(
			"useWorkspace can only be used inside WorkspaceProvider"
		);
	}

	return context;
};

export default WorkspaceProvider;
