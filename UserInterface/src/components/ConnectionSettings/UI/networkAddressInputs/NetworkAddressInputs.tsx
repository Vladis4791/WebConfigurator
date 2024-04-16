import React, { useCallback, useMemo, useRef, useState } from 'react'
import Select from '../../../inputs/select/Select'
import { OWN_ADDRESS_NETWORK, TOOL_ADDRESS_OPTIONS } from '../../../../constants/Settings';
import './NetworkAddressInputs.scss';
import CheckboxField from '../../../checkboxField/CheckboxField';
import SettingsItem from '../../../settingsItem/SettingsItem';

export interface INetworkAddressInputsData {
	shouldNetworkAddressBeUsed: boolean
	ownAddress: string
	deviceAddress: string
}

const NetworkAddressInputs = ({ initialValue, onChange }: { initialValue: INetworkAddressInputsData, onChange: (data: INetworkAddressInputsData) => void}) => {

	const { shouldNetworkAddressBeUsed, ownAddress, deviceAddress } = initialValue;
	
	const data = useRef<INetworkAddressInputsData>({
		shouldNetworkAddressBeUsed,
		ownAddress,
		deviceAddress
	})

	const [isRequiredUsingNetworkAddress, setIsRequiredUsingNetworkAddress] = useState(shouldNetworkAddressBeUsed);

	const checkboxChangedHandler = (checked: boolean) => {
		setIsRequiredUsingNetworkAddress(checked);
		data.current.shouldNetworkAddressBeUsed = checked;
		onChange(data.current);
		
	}

	const ownAddressSelectChange = useCallback((value: string) => {
		data.current.ownAddress = value
		onChange(data.current);
	}, [onChange]);

	const deviceAddressSelectChange = useCallback((value: string) => {
		data.current.deviceAddress = value
		onChange(data.current);
	}, [onChange]);

	const ownAddressSelect = useMemo(() => 
		<Select
			initialValue={ownAddress}
			options={OWN_ADDRESS_NETWORK} 
			onChange={({ value }) => ownAddressSelectChange(value)}
			disabled={!isRequiredUsingNetworkAddress} 
		/>, [isRequiredUsingNetworkAddress, ownAddressSelectChange, ownAddress])

	const deviceAddressSelect = useMemo(() => 
		<Select 
			initialValue={deviceAddress}
			options={TOOL_ADDRESS_OPTIONS} 
			onChange={({ value }) => deviceAddressSelectChange(value)}
			disabled={!isRequiredUsingNetworkAddress} 
		/>, [isRequiredUsingNetworkAddress, deviceAddress, deviceAddressSelectChange])
	
	return (
		<>
			<CheckboxField 
				label="Использовать сетевой адрес"
				initialValue={shouldNetworkAddressBeUsed} 
				onCheckboxChange={checkboxChangedHandler} 
			/>
			<SettingsItem
				input={ownAddressSelect}
				label="Свой адрес"
			/>
			<SettingsItem
				input={deviceAddressSelect}
				label="Адрес прибора"
			/>
		</>
	)
}

export default NetworkAddressInputs