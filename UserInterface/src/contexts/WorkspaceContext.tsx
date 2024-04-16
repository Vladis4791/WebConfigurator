import React, { ReactNode, useContext, useState } from 'react';
import { ITableNode } from '../interfaces/ITableNode';
import { IDevice } from '../interfaces/IDeviceParams';

interface WorkspaceContextValue {
    tableNodes: ITableNode[]
    currentDevice: IDevice
    setTableNodes: React.Dispatch<React.SetStateAction<ITableNode[]>>,
    setCurrentDevice: React.Dispatch<React.SetStateAction<IDevice>>
}

const WorkspaceContext = React.createContext<WorkspaceContextValue | undefined>(undefined);

const WorkspaceProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    
    const [tableNodes, setTableNodes] = useState<ITableNode[]>([]);
    const [currentDevice, setCurrentDevice] = useState<IDevice>({} as IDevice);
    
    return (
        <WorkspaceContext.Provider value={{
            tableNodes,
            currentDevice,
            setTableNodes,
            setCurrentDevice
        }}>
            { children }
        </WorkspaceContext.Provider>
    );
}

export const useWorkspace = (): WorkspaceContextValue => {

    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error('useWorkspace can only be used inside SettingsProvider');
    }

    return context;

}


export default WorkspaceProvider;