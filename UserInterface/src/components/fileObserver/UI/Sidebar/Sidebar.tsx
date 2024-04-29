import React, { useEffect, useState } from "react";
import { appAPI } from "../../../../APIs/app.api";
import Button from "../../../button/Button";
import './Sidebar.scss';
import FileObserverItem from "../FileObserverItem/FileObserverItem";
import disk_image from '../../../../assets/images/disk.svg';
import Icon from "../../../icon/Icon";

const Sidebar = ({
	onRootDirectoryClick,
}: {
	onRootDirectoryClick: (path: string) => void;
}) => {
	const [rootDirectoriesPaths, setRootDirectories] = useState<string[]>([]);

	useEffect(() => {
		appAPI.getRootDerictories().then((res) => {
			console.log(res);
			setRootDirectories(res.Data);
		});
	}, []);

	return (
		<div className="Sidebar">
			{rootDirectoriesPaths.map((rootDirectoryPath) => (

                <FileObserverItem
                    itemName={`Перейти в ${rootDirectoryPath}`}
                    icon={<Icon url={disk_image} />}
                    onClick={() => onRootDirectoryClick(rootDirectoryPath)}
                    isClicked={false}
                />
			))}
		</div>
	);
};

export default Sidebar;
