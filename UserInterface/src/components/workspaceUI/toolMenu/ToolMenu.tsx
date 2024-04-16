import React from "react";
import "./ToolMenu.scss";
import ToolMenuButton from "./ToolMenuButton/ToolMenuButton";
import openFile from "./../../../assets/images/file_open.svg";
import createFile from "./../../../assets/images/new_file.svg";
import saveFile from "./../../../assets/images/save.svg";
import print from "./../../../assets/images/print.svg";
import download from "./../../../assets/images/download.svg";
import upload from "./../../../assets/images/upload.svg";
import DropdownItem from "../Dropdown/DropdownItem/DropdownItem";
import { useWorkspace } from "../../../contexts/WorkspaceContext";
import { tableService } from "../../../services/TableService";
import { workspaceAPI } from "../../../APIs/workspace.api";
import ZoomButtons from "./ZoomButtons/ZoomButtons";
import ButtonWithDropdown from "../ButtonWithDropdown/ButtonWithDropdown";
import Dropdown from "../Dropdown/Dropdown";
import PrintGroup from "./DropdownGroups/PrintDropdownGroup";
import IconButton from "../../IconButton/IconButton";
import Icon from "../../icon/Icon";
import UploadDropdownGroup from "./DropdownGroups/UploadDropdownGroup";
import ButtonWithModal from "../../ButtonWithModal/ButtonWithModal";
import FileObserver from "../../fileObserver/FileObserver";
import { FileObserverType } from "../../../interfaces/FileObserver";
import { MODAL_NAME_CREATE_DB } from "../../../constants/Global";
import { useNavigate } from "react-router-dom";
import DeviceSelectPage from "../../../pages/deviceSelect/DeviceSelectPage";
import { connectionAPI } from "../../../APIs/connections.api";

const ToolMenu = () => {

	const navigate = useNavigate();

	const { tableNodes, setTableNodes } = useWorkspace();

	const onSaveDB = () => {
		workspaceAPI.saveDeviceToFile(tableNodes, "db").then(() => {
			setTableNodes(
				tableService.getTableNodesWithUneditedNodes(tableNodes)
			);
		});
	};

	return (
		<div className="ToolMenu">
			<ButtonWithModal
				renderButton={(props) => (<ToolMenuButton {...props} imageURL={createFile}  />)}
				modalName={MODAL_NAME_CREATE_DB}
				renderModalContent={(props) => <DeviceSelectPage {...props} />}
			/>
			<ButtonWithModal
				renderButton={(props) => (
					<ToolMenuButton {...props} imageURL={openFile} />
				)}
				modalName={MODAL_NAME_CREATE_DB}
				renderModalContent={(props) => (
					<FileObserver
						{...props}
						onSubmit={(path) => navigate('/workspace', {
							state: {
								filePath: path
							}
						})}
						fileObserverType={FileObserverType.OPEN_FILE}
					/>
				)}
			/>		
			
			<ToolMenuButton imageURL={saveFile} onClick={() => onSaveDB()} />
			<ButtonWithDropdown
				renderButton={(props, ref) => (
					<IconButton
						{...props}
						buttonRef={ref}
						renderIcon={() => <Icon url={print} />}
					/>
				)}
				renderDropdown={(props) => (
					<Dropdown {...props} renderDropdownGroup={(props) => <PrintGroup {...props} />} />
				)}
			/>
			<ToolMenuButton imageURL={download} onClick={() => connectionAPI.readDataFromDevice()} />
			<ButtonWithDropdown
				renderButton={(props, ref) => (
					<IconButton
						{...props}
						buttonRef={ref}
						renderIcon={() => <Icon url={upload} />}
					/>
				)}
				renderDropdown={(props) => (
					<Dropdown {...props} renderDropdownGroup={(props) => <UploadDropdownGroup {...props} />} />
				)}
			/>
			<ZoomButtons />
		</div>
	);
};

export default ToolMenu;
