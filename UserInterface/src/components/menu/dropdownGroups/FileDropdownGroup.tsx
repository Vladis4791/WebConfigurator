import React from "react";
import DropdownItem from "../../workspaceUI/Dropdown/DropdownItem/DropdownItem";
import ButtonWithModal from "../../ButtonWithModal/ButtonWithModal";
import DeviceSelectPage from "../../../pages/deviceSelect/DeviceSelectPage";
import { DropdownGroup } from "../../workspaceUI/Dropdown/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import FileObserver from "../../fileObserver/FileObserver";
import { FileObserverType } from "../../../interfaces/FileObserver";
import { MODAL_NAME_CREATE_DB, MODAL_NAME_OPEN_DB } from "../../../constants/Global";
import { CREATE_DB_FILE_HOTKEY, OPEN_DB_FILE_HOTKEY, PRINT_DB_FILE_HOTKEY, READ_FROM_DEVICE_HOTKEY, SAVE_DB_FILE_HOTKEY, WRITE_FULL_DB_IN_DEVICE_HOTKEY, WRITE_UPDATED_PART_OF_DB_IN_DEVICE_HOTKEY } from "../../../constants/ConfiguratorHotkeys";
import Icon from "../../icon/Icon";
import print_image from "./../../../assets/images/print.svg";
import print_disabled_image from "./../../../assets/images/print_disabled.svg";
import download_image from "./../../../assets/images/download.svg";
import upload_image from "./../../../assets/images/upload.svg";
import upload_disabled_image from "./../../../assets/images/upload_disabled.svg";
import save_image from "./../../../assets/images/save.svg";
import save_disabled_image from "./../../../assets/images/save_disabled.svg";
import open_file_image from "./../../../assets/images/file_open.svg";
import create_file_image from "./../../../assets/images/new_file.svg";

const FileDropdownGroup = ({ closeDropdown }: DropdownGroup) => {
	const location = useLocation();
	const navigate = useNavigate();

	const isHomePage = () => {
		return location.pathname === "/";
	};
	return (
		<>
			<ButtonWithModal
				renderButton={(props) => (
					<DropdownItem
						{...props}
						label="Создать БД"
						icon={<Icon url={create_file_image} />}
						closeDropdown={closeDropdown}
						hotkey={CREATE_DB_FILE_HOTKEY}
					/>
				)}
				modalName={MODAL_NAME_CREATE_DB}
				renderModalContent={(props) => <DeviceSelectPage {...props} />}
			/>
			<ButtonWithModal
				renderButton={(props) => (
					<DropdownItem
						{...props}
						label="Открыть файл БД"
						icon={<Icon url={open_file_image} />}
						closeDropdown={closeDropdown}
						hotkey={OPEN_DB_FILE_HOTKEY}
					/>
				)}
				modalName={MODAL_NAME_OPEN_DB}
				renderModalContent={(props) => (
					<FileObserver
						{...props}
						onSubmit={(path) => navigate('/workspace/new', {
							state: {
								filePath: path
							}
						})}
						fileObserverType={FileObserverType.OPEN_FILE}
					/>
				)}
			/>

			<DropdownItem
				disabled={isHomePage()}
				label="Сохранить"
				icon={<Icon url={isHomePage() ? save_disabled_image : save_image} />}
				hotkey={SAVE_DB_FILE_HOTKEY}
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				disabled={isHomePage()}
				label="Сохранить как..."
				closeDropdown={closeDropdown}
				last
			/>
			<DropdownItem
				label="Считать с прибора"
				closeDropdown={closeDropdown}
				hotkey={READ_FROM_DEVICE_HOTKEY}
				icon={<Icon url={download_image} />}
			/>
			<DropdownItem
				disabled={isHomePage()}
				label="Загрузить обновленную часть БД в прибор"
				hotkey={WRITE_UPDATED_PART_OF_DB_IN_DEVICE_HOTKEY}
				closeDropdown={closeDropdown}
				icon={<Icon url={isHomePage() ? upload_disabled_image : upload_image } />}
			/>
			<DropdownItem
				disabled={isHomePage()}
				label="Загрузить полную БД в прибор"
				hotkey={WRITE_FULL_DB_IN_DEVICE_HOTKEY}
				closeDropdown={closeDropdown}
				last
			/>
			<DropdownItem
				label="Печать"
				hotkey={PRINT_DB_FILE_HOTKEY}
				icon={<Icon url={isHomePage() ? print_disabled_image : print_image } />}
				closeDropdown={closeDropdown}
				disabled={isHomePage()}
				last
			/>
			<DropdownItem label="Выход" closeDropdown={closeDropdown} />
		</>
	);
};

export default FileDropdownGroup;
