import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import SettingsSection from './UI/SettingsSection/SettingsSection'
import CheckboxField from '../checkboxField/CheckboxField'
import NumberInput from '../inputs/numberInput/NumberInput'
import SettingsItem from '../settingsItem/SettingsItem'
import './ParamsSettings.scss';
import FolderPicker from './UI/FolderPicker/FolderPicker'
import { useSettings } from '../../contexts/SettingsContext'
import { FONT_SIZE_CHANGE_STEP, MAX_FONT_SIZE, MIN_FONT_SIZE } from '../../constants/Settings'

interface IParamsSettings {
	useCurrentTimeAsDO_TO: boolean
	selectedDBAutoSave: boolean
	generateDBFileNames: boolean
	fileSavePath: string
	printTurnedOffParams: boolean
	printParamsDescriptions: boolean
	showChangingFontButtons: boolean
	fontSize: number
}


const ParamsSettings = () => {

	const { settings, saveSettings } = useSettings();

	const defaultValues: IParamsSettings = {
		useCurrentTimeAsDO_TO: settings.SavedUseCurrentTime,
		selectedDBAutoSave: settings.SavedAutoSave,
		generateDBFileNames: settings.SavedGenerateFileName,
		fileSavePath: settings.SavedFolderPath,
		printTurnedOffParams: settings.SavedPrintReadonly,
		printParamsDescriptions: settings.SavedPrintDescriptions,
		showChangingFontButtons: settings.SavedShowZoomButtons,
		fontSize: settings.FontSize
	}

	const { control, handleSubmit } = useForm<IParamsSettings>({
		defaultValues: defaultValues,
	})

	const ParamsSettingsToSettingsProperties = (webSettings: IParamsSettings) => {
		const result = {
			SavedUseCurrentTime: webSettings.useCurrentTimeAsDO_TO,
			SavedAutoSave: webSettings.selectedDBAutoSave,
			SavedGenerateFileName: webSettings.generateDBFileNames,
			SavedFolderPath: webSettings.fileSavePath,
			SavedPrintReadonly: webSettings.printTurnedOffParams,
			SavedPrintDescriptions: webSettings.printParamsDescriptions,
			SavedShowZoomButtons: webSettings.showChangingFontButtons,
			FontSize: webSettings.fontSize
		}
	
		return {
			...settings,
			...result
		}
	}

	const onSubmit: SubmitHandler<IParamsSettings> = (data) => {
		const settingsToSave = ParamsSettingsToSettingsProperties(data);
		saveSettings(settingsToSave);
	}

	return (
		<div className="ParamsSettings">
			<form className="ParamsSettingsForm" onSubmit={handleSubmit(onSubmit)}>
				<SettingsSection sectionName="Запись параметров">
					<Controller
						name="useCurrentTimeAsDO_TO"
						control={control}
						render={({ field }) => 
							<CheckboxField onCheckboxChange={field.onChange} label="Использовать текущие время как ДО/ТО" initialValue={defaultValues.useCurrentTimeAsDO_TO} />
						}
					/>
				</SettingsSection>
				<SettingsSection sectionName="Сохранение файлов">
					<>	
						<Controller
							name="selectedDBAutoSave"
							control={control}
							render={({ field }) => 
								<CheckboxField onCheckboxChange={field.onChange} label="Автоматически сохранять выбранные БД" initialValue={defaultValues.selectedDBAutoSave} />
							}
						/>
						<Controller
							name="generateDBFileNames"
							control={control}
							render={({ field }) => 
								<CheckboxField onCheckboxChange={field.onChange} label="Генерировать названия файлам БД" initialValue={defaultValues.generateDBFileNames} />
							}
						/>
						<Controller
							name="fileSavePath"
							control={control}
							render={({ field }) => 
								<FolderPicker onChange={field.onChange} initialValue={defaultValues.fileSavePath} />
							}
						/>

						
					</>
				</SettingsSection>
				<SettingsSection sectionName="Печать БД">
					<>
						<Controller
							name="printTurnedOffParams"
							control={control}
							render={({ field }) => 
								<CheckboxField onCheckboxChange={field.onChange} label="Печать отключенных параметров" initialValue={defaultValues.printTurnedOffParams} />
							}
						/>
						<Controller
							name="printParamsDescriptions"
							control={control}
							render={({ field }) => 
								<CheckboxField onCheckboxChange={field.onChange} label="Печать описаний параметров" initialValue={defaultValues.printParamsDescriptions} />
							}
						/>
					</>
				</SettingsSection>
				<SettingsSection sectionName="Размер шрифта">
					<>
						<Controller
							name="showChangingFontButtons"
							control={control}
							render={({ field }) => 
								<CheckboxField onCheckboxChange={field.onChange} label="Показывать кнопки измерения шрифта" initialValue={defaultValues.showChangingFontButtons} />
							}
						/>
						<Controller
							name="fontSize"
							control={control}
							render={({ field }) => 
								<SettingsItem 
									input={
										<NumberInput
											initialValue={defaultValues.fontSize} 
											onChange={field.onChange} 
											onBlur={field.onBlur} 
											min={MIN_FONT_SIZE} 
											max={MAX_FONT_SIZE} 
											step={FONT_SIZE_CHANGE_STEP}
											fractionDigits={0}
											// step={0.5} 
											// fractionDigits={1} 
										/>
									}
									label="Размер шрифта"
								/>
							}
						/>
					</>
				</SettingsSection>
				<button type="submit">submit</button>
			</form>
		</div>
	)
}

export default ParamsSettings