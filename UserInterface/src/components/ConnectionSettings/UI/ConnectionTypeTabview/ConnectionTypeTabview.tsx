import { TabPanel, TabView, TabViewTabChangeEvent } from "primereact/tabview";
import React, { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { IConnectionSettings } from "../../ConnectionSettings";
import SettingsItem from "../../../settingsItem/SettingsItem";
import Select, { SelectOptionProps } from "../../../inputs/select/Select";
import { COM_PORTS, COM_SPEEDS, MODEM } from "../../../../constants/Settings";
import TextInput from "../../../inputs/textInput/TextInput";
import NetworkProtocols from "../networkProtocols/NetworkProtocols";
import NumberInput from "../../../inputs/numberInput/NumberInput";
import { settingsAPI } from "../../../../APIs/settings.api";

interface ComPort {
	port: string;
	description: string;
}

interface Modem {
	Name: string
}

interface ChangableSelectOptions {
	Modems: Modem[];
	ComPorts: ComPort[];
}

const ConnectionTypeTabview = ({
	formControl,
	onChange,
	initialValue,
}: {
	formControl: Control<IConnectionSettings, any, IConnectionSettings>;
	onChange: (connectionType: string) => void;
	initialValue: string;
}) => {
	const [modems, setModems] = useState<Modem[]>([]);
	const [comPorts, setComPorts] = useState<ComPort[]>([]);

	useEffect(() => {
		settingsAPI.getChangableSelectOptions().then((res) => {
			const changableSelectOptions = res.Data as ChangableSelectOptions;
			setModems(changableSelectOptions.Modems);
			setComPorts(changableSelectOptions.ComPorts);
		});
	}, []);

	const getActiveIndexByConnectionType = (connectionType: string) => {
		switch (connectionType) {
			case "COM":
				return 0;
			case "Модем":
				return 1;
			case "TCP" || "UDP":
				return 2;
			default:
				return 0;
		}
	};

	const [activeIndex, setActiveIndex] = useState(
		getActiveIndexByConnectionType(initialValue)
	);

	const handleTabChangeEvent = (event: TabViewTabChangeEvent) => {
		setActiveIndex(event.index);
		const currentConnectionType = getConnectionTypeByTabIndex(event.index);
		onChange(currentConnectionType);
	};

	const handleNetworkProtocolsChange = (protocol: string) => {
		onChange(protocol);
	};

	const getConnectionTypeByTabIndex = (index: number) => {
		switch (index) {
			case 0:
				return "COM";
			case 1:
				return "Модем";
			case 2:
				return "TCP";
			default:
				return "COM";
		}
	};

	const comPortChange = (index: number, onChange: (value: string) => void) => {
		const isNothingSelected = index === -1 || comPorts.length === 0;
		return isNothingSelected ? onChange("") : onChange(comPorts[index].port);
		
	};

	const modemChange = (index: number, onChange: (value: string) => void) => {
		const isNothingSelected = index === -1 || modems.length === 0;
		isNothingSelected ? onChange("") : onChange(modems[index].Name);
	};

	const getComPortInitialOption = (comPortName: string) => {
		const comPort = comPorts.find(comPort => comPort.port === comPortName);
		if(!comPort) return "";

		return `${comPort.port} (${comPort.description})`
	}	

	// TODO create a getModemInitialOption if it's neccessary

	return (
		<TabView
			className="tabview"
			activeIndex={activeIndex}
			onTabChange={handleTabChangeEvent}
		>
			<TabPanel header="COM">
				<Controller
					name="COMPortOption"
					control={formControl}
					render={({ field }) => (
						<SettingsItem
							input={
								<Select
									options={comPorts.map(
										(comPort) =>
											`${comPort.port} (${comPort.description})`
									)}
									initialValue={getComPortInitialOption(field.value)}
									onChange={({ index }) => comPortChange(index, field.onChange)}
								/>
							}
							label="COM Порт"
						/>
					)}
				/>
				<Controller
					name="COMSpeedOption"
					control={formControl}
					render={({ field }) => (
						<SettingsItem
							input={
								<Select
									options={COM_SPEEDS}
									initialValue={field.value}
									onChange={({ value }) =>
										field.onChange(value)
									}
								/>
							}
							label="Скорость"
						/>
					)}
				/>
			</TabPanel>
			<TabPanel header="Модем">
				<Controller
					name="modemOption"
					control={formControl}
					render={({ field }) => (
						<SettingsItem
							input={
								<Select
									options={modems.map(modem => modem.Name)}
									initialValue={field.value}
									onChange={({ index }) => modemChange(index, field.onChange)}
								/>
							}
							label="Модем"
						/>
					)}
				/>
				<Controller
					name="phone"
					control={formControl}
					render={({ field }) => (
						<SettingsItem
							input={
								<TextInput
									value={field.value}
									onChange={field.onChange}
								/>
							}
							label="Телефон"
						/>
					)}
				/>
			</TabPanel>
			<TabPanel header="Порт">
				<NetworkProtocols onChange={handleNetworkProtocolsChange} />
				<Controller
					name="networkProtocolAddress"
					control={formControl}
					render={({ field }) => (
						<SettingsItem
							input={
								<TextInput
									value={field.value}
									onChange={field.onChange}
								/>
							}
							label="Адрес"
						/>
					)}
				/>
				<Controller
					name="networkProtocolPort"
					control={formControl}
					render={({ field }) => (
						<SettingsItem
							input={
								<NumberInput
									initialValue={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
									min={0}
									max={65535}
									step={1}
									fractionDigits={0}
								/>
							}
							label="Порт"
						/>
					)}
				/>
			</TabPanel>
		</TabView>
	);
};

export default ConnectionTypeTabview;
