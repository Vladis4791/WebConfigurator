import React from "react";
import "./ToolMenu.scss";
import ToolMenuButton from "./ToolMenuButton/ToolMenuButton";
import open_file_image from "./../../../assets/images/file_open.svg";
import create_file_image from "./../../../assets/images/new_file.svg";
import save_file_image from "./../../../assets/images/save.svg";
import print from "./../../../assets/images/print.svg";
import download from "./../../../assets/images/download.svg";
import upload from "./../../../assets/images/upload.svg";
import { useWorkspace } from "../../../contexts/WorkspaceContext";
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
import {
	MODAL_NAME_CREATE_DB,
	MODAL_NAME_SAVE_AS,
} from "../../../constants/Global";
import { useNavigate } from "react-router-dom";
import DeviceSelectPage from "../../../pages/deviceSelect/DeviceSelectPage";
import { connectionAPI } from "../../../APIs/connections.api";

const ToolMenu = () => {
	const navigate = useNavigate();

	const {
		tableNodes,
		setTableNodes,
		filePathToSave,
		setFilePathToSave,
		saveFileAs,
		saveFile,
	} = useWorkspace();

	// const saveDB = (filePath: string) => {
	// 	const data = tableService.getTagsInfoFromTableData(tableNodes);
	// 	workspaceAPI.saveDeviceToFile(data, filePath).then(() => {
			// setTableNodes(
			// 	tableService.getTableNodesWithUneditedNodes(tableNodes)
			// );
	// 	});
	// };

	// const onSaveAsModalSubmit = (path: string) => {
	// 	setFilePathToSave(path);
	// 	saveDB(path);
	// }

	return (
		<div className="ToolMenu">
			<ButtonWithModal
				renderButton={(props) => (
					<ToolMenuButton {...props} imageURL={create_file_image} />
				)}
				modalName={MODAL_NAME_CREATE_DB}
				renderModalContent={(props) => <DeviceSelectPage {...props} />}
			/>
			<ButtonWithModal
				renderButton={(props) => (
					<ToolMenuButton {...props} imageURL={open_file_image} />
				)}
				modalName={MODAL_NAME_CREATE_DB}
				renderModalContent={(props) => (
					<FileObserver
						{...props}
						onSubmit={(path) =>
							navigate("/workspace/saved", {
								state: {
									filePath: path,
								},
							})
						}
						fileObserverType={FileObserverType.OPEN_FILE}
					/>
				)}
			/>
			{filePathToSave ? (
				<ToolMenuButton imageURL={save_file_image} onClick={saveFile} />
			) : (
				<ButtonWithModal
					renderButton={(props) => (
						<ToolMenuButton {...props} imageURL={save_file_image} />
					)}
					modalName={MODAL_NAME_SAVE_AS}
					renderModalContent={(props) => (
						<FileObserver
							{...props}
							onSubmit={(path) => saveFileAs(path)}
							fileObserverType={FileObserverType.SAVE_AS_FILE}
						/>
					)}
				/>
			)}
			<ButtonWithDropdown
				renderButton={(props, ref) => (
					<IconButton
						{...props}
						buttonRef={ref}
						renderIcon={() => <Icon url={print} />}
					/>
				)}
				renderDropdown={(props) => (
					<Dropdown
						{...props}
						renderDropdownGroup={(props) => (
							<PrintGroup {...props} />
						)}
					/>
				)}
			/>
			<ToolMenuButton
				imageURL={download}
				onClick={() => connectionAPI.readDataFromDevice()}
			/>
			<ButtonWithDropdown
				renderButton={(props, ref) => (
					<IconButton
						{...props}
						buttonRef={ref}
						renderIcon={() => <Icon url={upload} />}
					/>
				)}
				renderDropdown={(props) => (
					<Dropdown
						{...props}
						renderDropdownGroup={(props) => (
							<UploadDropdownGroup {...props} />
						)}
					/>
				)}
			/>
			<ZoomButtons />
		</div>
	);
};

export default ToolMenu;
