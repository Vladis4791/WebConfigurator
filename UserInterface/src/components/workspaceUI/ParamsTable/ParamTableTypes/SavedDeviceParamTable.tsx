import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DeviceAPI } from "../../../../APIs/device.api";
import { tableService } from "../../../../services/TableService";
import { IDevice } from "../../../../interfaces/IDeviceParams";
import { useWorkspace } from "../../../../contexts/WorkspaceContext";
import ParamsTable from "../ParamsTable";

const SavedDeviceParamTable = () => {
	const location = useLocation();

	const { setTableNodes, setCurrentDevice, setFilePathToSave } = useWorkspace();

	useEffect(() => {
		const filePathToSavedDevice = location.state.filePath as
			| string
			| undefined;

		if (filePathToSavedDevice) {
			DeviceAPI.getDeviceFromFile(filePathToSavedDevice).then((res) => {

				const deviceFromFile = res.Data as IDevice;

				const newTableNodes = tableService.getTableNodesFromDevice(
					deviceFromFile
				);

				setCurrentDevice(deviceFromFile);
				setFilePathToSave(filePathToSavedDevice);
				setTableNodes(newTableNodes);
			});
		}
	}, [location.state.filePath, setTableNodes, setCurrentDevice, setFilePathToSave]);

	return <ParamsTable />;
};

export default SavedDeviceParamTable;
