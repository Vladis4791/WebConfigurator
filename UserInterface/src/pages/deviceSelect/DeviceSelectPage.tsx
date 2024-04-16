import React, { useCallback, useState, useEffect } from "react";
import "./DeviceSelectPage.scss";
import DeviceSelectItem from "../../components/DeviceSelectItem/DeviceSelectItem";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { DeviceAPI } from "../../APIs/device.api";
import { ModalContent } from "../../components/Modal/Modal";

const MemoDeviceSelectItem = React.memo(DeviceSelectItem);

const DeviceSelectPage = ({ onClose }: ModalContent) => {
	const navigate = useNavigate();

	const [availableDevices, setAvailableDevices] = useState<string[]>([]);

	const [selectedDevice, setSelectedDevice] = useState("");

	useEffect(() => {
		DeviceAPI.getAllDevicesCaptions().then((res) => {
			setAvailableDevices(res.Data);
		});
	}, []);

	const onDeviceChecked = useCallback((checkedDeviceName: string) => {
		setSelectedDevice(checkedDeviceName);
	}, []);


	const handleClick = () => {
		onClose();
		navigate("/workspace", { state: { deviceName: selectedDevice } });
	}

	return (
		<div className="DeviceSelectPage">
			<div className="container">
				<div className="content">
					<h1>Выберите необходимый прибор из списка</h1>
					<div className="toolList">
						{availableDevices.map((deviceName) => (
							<MemoDeviceSelectItem
								deviceName={deviceName}
								key={deviceName}
								isChecked={selectedDevice === deviceName}
								onChange={onDeviceChecked}
							/>
						))}
					</div>
					<Button
						onClick={handleClick}
						className="createButton"
						disabled={!availableDevices.includes(selectedDevice)}
					>
						{selectedDevice
							? `Создать БД для ${selectedDevice}`
							: "Выберите прибор из списка"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DeviceSelectPage;
