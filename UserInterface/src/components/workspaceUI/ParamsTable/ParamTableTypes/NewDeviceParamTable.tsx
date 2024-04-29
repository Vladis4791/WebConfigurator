import React, { useEffect } from "react";
import ParamsTable from "../ParamsTable";
import { useLocation } from "react-router-dom";
import { DeviceAPI } from "../../../../APIs/device.api";
import { IDevice } from "../../../../interfaces/IDeviceParams";
import { tableService } from "../../../../services/TableService";
import { useWorkspace } from "../../../../contexts/WorkspaceContext";

const NewDeviceParamTable = () => {
	const location = useLocation();

	const { setTableNodes, setCurrentDevice, setFilePathToSave } = useWorkspace();

	useEffect(() => {
		const deviceName = location.state.deviceName as string | undefined;

		if (deviceName) {
			DeviceAPI.getNewDeviceInstance(deviceName).then((res) => {

				const receivedDeviceInstance = res.Data as IDevice;
				setCurrentDevice(receivedDeviceInstance);
				const newTableNodes = tableService.getTableNodesFromDevice(receivedDeviceInstance);
				setTableNodes(newTableNodes);
				setFilePathToSave(undefined);
			});
		}
	}, [location.state.deviceName, setTableNodes, setCurrentDevice, setFilePathToSave]);

	return <ParamsTable />;
};

export default NewDeviceParamTable;
