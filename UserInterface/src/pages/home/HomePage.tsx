import React, { useEffect, useState } from 'react'
import './HomePage.scss';
import ActionButton from '../../components/actionButton/ActionButton';
import Icon from '../../components/icon/Icon';
import openFileImage from './../../assets/images/file_open_white.svg';
import newFileImage from './../../assets/images/new_file_white.svg';
import downloadImage from './../../assets/images/download_white.svg';
import settingsImage from './../../assets/images/settings.svg';
import { useNavigate } from 'react-router-dom';
import ButtonWithModal from '../../components/ButtonWithModal/ButtonWithModal';
import FileObserver from '../../components/fileObserver/FileObserver';
import { FileObserverType } from '../../interfaces/FileObserver';
import DeviceSelectPage from '../deviceSelect/DeviceSelectPage';
import Settings from '../settings/Settings';
import { MODAL_NAME_CREATE_DB, MODAL_NAME_OPEN_DB, MODAL_NAME_SETTINGS } from '../../constants/Global';

const HomePage = () => {

	const navigate = useNavigate();

	// const onNewFileClicked = () => {
	// 	navigate('/toolsSelect')
	// }

	// const onSettingsClicked = () => {
	// 	navigate('/settings');
	// }

	return (
		<div className="HomePage">
			<div className="container">
				<div className="wrapper">
					<div className="homePageContent">
						<h1>
							Добро пожаловать в Конфигуратор, <br />
							Выберите действие
						</h1>
						<button>print</button>
						<div className="actionButtons">
							<ButtonWithModal
								modalName={MODAL_NAME_CREATE_DB}
								renderButton={(props) => 
									<ActionButton 
										{...props} 
										icon={<Icon url={newFileImage} />} 
										title="Создать БД"
									/>}
								renderModalContent={(props) => 
									<DeviceSelectPage {...props} />
								}
							/>
							<ButtonWithModal
								modalName={MODAL_NAME_OPEN_DB}
								renderButton={(props) => 
									<ActionButton 
										{...props} 
										icon={<Icon url={openFileImage} />} 
										title="Открыть БД"
									/>}
								renderModalContent={(props) => 
									<FileObserver 
										{...props}
										onSubmit={(path) => navigate('/workspace/saved', {
											state: {
												filePath: path
											}
										})}
										fileObserverType={FileObserverType.OPEN_FILE}
									/>
								}
							/>
							<ActionButton title="Считать БД из прибора" icon={<Icon url={downloadImage} />} onClick={() => {}} />
							<ButtonWithModal
								modalName={MODAL_NAME_SETTINGS}
								renderButton={(props) => 
									<ActionButton 
										{...props} 
										icon={<Icon url={settingsImage} />} 
										title="Настройки"
									/>}
								renderModalContent={(props) => 
									<Settings {...props} />
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage