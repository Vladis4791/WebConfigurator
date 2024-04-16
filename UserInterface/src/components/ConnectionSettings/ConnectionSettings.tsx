import React, { useEffect } from "react";
import "./ConnectionSettings.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import NumberInput from "../inputs/numberInput/NumberInput";
import Select from "../inputs/select/Select";
import {
	MAX_TIMEOUT_IN_SEC,
	MIN_TIMEOUT_IN_SEC,
	PROTOCOLS_OPTIONS,
} from "../../constants/Settings";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CheckboxField from "../checkboxField/CheckboxField";
import SettingsItem from "../settingsItem/SettingsItem";
import NetworkAddressInputs, {
	INetworkAddressInputsData,
} from "./UI/networkAddressInputs/NetworkAddressInputs";
import SubmitButton from "../inputs/submitButton/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../contexts/SettingsContext";
import ConnectionTypeTabview from "./UI/ConnectionTypeTabview/ConnectionTypeTabview";

export interface IConnectionSettings {
	waitingTime: number;
	protocolOptionIndex: number;
	isRequiredToKeepConnection: boolean;
	networkAddress: INetworkAddressInputsData;
	COMPortOption: string;
	COMSpeedOption: string;
	modemOption: string;
	phone: string;
	connectionType: string;
	networkProtocolAddress: string;
	networkProtocolPort: number;
}

const ConnectionSettings = () => {
	const { settings, saveSettings } = useSettings();

	const networkAddressInitialData: INetworkAddressInputsData = {
		shouldNetworkAddressBeUsed: settings.SavedUseDeviceAddress,
		ownAddress: settings.SavedOwnAdr,
		deviceAddress: settings.SavedDeviceAdr,
	};

	const defaultValues: IConnectionSettings = {
		protocolOptionIndex: settings.SavedProtocolIndex,
		waitingTime: settings.SavedTimeout,
		isRequiredToKeepConnection: settings.SavedKeepalive,
		networkAddress: networkAddressInitialData,
		COMPortOption: settings.SavedComPortName,
		COMSpeedOption:
			settings.SavedBaud === 0 ? "Авто" : settings.SavedBaud.toString(),
		modemOption: settings.SavedModemName,
		connectionType: settings.SavedConnType,
		phone: settings.SavedModemPhone,
		networkProtocolAddress: settings.SavedNetworkAddr,
		networkProtocolPort: settings.SavedNetworkPort,
	};

	const ConnectionSettingsToSettingsProperties = (
		webSettings: IConnectionSettings
	) => {
		const result = {
			SavedProtocolIndex: webSettings.protocolOptionIndex,
			SavedTimeout: webSettings.waitingTime,
			SavedKeepalive: webSettings.isRequiredToKeepConnection,
			SavedUseDeviceAddress:
				webSettings.networkAddress.shouldNetworkAddressBeUsed,
			SavedOwnAdr: webSettings.networkAddress.ownAddress,
			SavedDeviceAdr: webSettings.networkAddress.deviceAddress,
			SavedComPortName: webSettings.COMPortOption ?? "",
			SavedBaud:
				webSettings.COMSpeedOption === "Авто"
					? 0
					: parseInt(webSettings.COMSpeedOption),
			SavedModemName: webSettings.modemOption,
			SavedConnType: webSettings.connectionType,
			SavedModemPhone: webSettings.phone,
			SavedNetworkAddr: webSettings.networkProtocolAddress,
			SavedNetworkPort: webSettings.networkProtocolPort,
		};

		return {
			...settings,
			...result,
		};
	};

	const { control, handleSubmit } = useForm<IConnectionSettings>({
		defaultValues: defaultValues,
	});

	const navigation = useNavigate();

	const onSubmit: SubmitHandler<IConnectionSettings> = (data) => {
		const settingsToSave = ConnectionSettingsToSettingsProperties(data);
		console.log(settingsToSave);
		saveSettings(settingsToSave);
	};


	return (
		<div className="ConnectionSettings">
			<form
				className="connectionSettingsForm"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="protocolOptionIndex"
					control={control}
					render={({ field }) => (
						<SettingsItem
							input={
								<Select
									options={PROTOCOLS_OPTIONS}
									initialValue={PROTOCOLS_OPTIONS[field.value]}
									onChange={({ index }) => field.onChange(index)}
								/>
							}
							label="Протокол"
						/>
					)}
				/>
				<Controller
					name="waitingTime"
					control={control}
					render={({ field }) => (
						<SettingsItem
							input={
								<NumberInput
									initialValue={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
									min={MIN_TIMEOUT_IN_SEC}
									max={MAX_TIMEOUT_IN_SEC}
									step={1}
									fractionDigits={0}
								/>
							}
							label="Ожидание, с"
						/>
					)}
				/>
				<Controller
					name="isRequiredToKeepConnection"
					control={control}
					render={({ field }) => (
						<CheckboxField
							onCheckboxChange={field.onChange}
							label="Поддерживать соединение"
							initialValue={field.value}
						/>
					)}
				/>
				<Controller
					name="networkAddress"
					control={control}
					render={({ field }) => (
						<NetworkAddressInputs
							initialValue={field.value}
							onChange={field.onChange}
						/>
					)}
				/>

				<Controller
					name="connectionType"
					control={control}
					render={({ field }) => (
						<ConnectionTypeTabview
							formControl={control}
							initialValue={field.value}
							onChange={field.onChange}
						/>
					)}
				/>

				<div className="actionButtons">
					<SubmitButton />
					{/* <Button title="Отмена" onClick={onCancel}/> */}
					<input type="reset" />
					<button type="reset">Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default ConnectionSettings;
