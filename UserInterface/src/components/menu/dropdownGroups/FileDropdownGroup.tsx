import React from "react";
import DropdownItem from "../../workspaceUI/Dropdown/DropdownItem/DropdownItem";
import ButtonWithModal from "../../ButtonWithModal/ButtonWithModal";
import DeviceSelectPage from "../../../pages/deviceSelect/DeviceSelectPage";
import { DropdownGroup } from "../../workspaceUI/Dropdown/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import FileObserver from "../../fileObserver/FileObserver";
import { FileObserverType } from "../../../interfaces/FileObserver";
import { MODAL_NAME_CREATE_DB } from "../../../constants/Global";

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
						closeDropdown={closeDropdown}
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
						closeDropdown={closeDropdown}
					/>
				)}
				modalName={MODAL_NAME_CREATE_DB}
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
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				disabled={isHomePage()}
				label="Сохранить как..."
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				label="Считать с прибора"
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				disabled={isHomePage()}
				label="Загрузить обновленную часть БД в прибор"
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				disabled={isHomePage()}
				label="Загрузить полную БД в прибор"
				closeDropdown={closeDropdown}
			/>
			<DropdownItem
				label="Печать"
				closeDropdown={closeDropdown}
				disabled={isHomePage()}
			/>
			<DropdownItem label="Выход" closeDropdown={closeDropdown} />
		</>
	);
};

export default FileDropdownGroup;
