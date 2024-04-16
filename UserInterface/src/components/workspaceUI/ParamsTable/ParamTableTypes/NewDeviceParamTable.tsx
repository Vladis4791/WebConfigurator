import React, { useEffect } from 'react'
import ParamsTable from '../ParamsTable'
import { useLocation } from 'react-router-dom'

const NewDeviceParamTable = () => {

    const location = useLocation();

    

	// useEffect(() => {
	// 	const filePathToSavedPath = location.state.filePath as string | undefined;
		
		// if(filePathToSavedPath) {
		// 	DeviceAPI.getDeviceFromFile(filePathToSavedPath).then((res) => {
		// 		const newTableNodes = tableService.getTableNodesFromDevice(res.Data as IDevice)
		// 		setTableNodes(newTableNodes);
		// 	});
		// }
		
	// }, [location, setTableNodes, setCurrentDevice])

    return (
        <ParamsTable />
    )
}

export default NewDeviceParamTable