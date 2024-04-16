export const PROTOCOLS_OPTIONS = ["Авто", "М4", "СПСеть"];
const ownAddressMax = 157;
const toolAddressMax = 27;
const minCOMSpeed = 1200;

export const OWN_ADDRESS_NETWORK = ["Авто"]
for(let i = 0; i <= ownAddressMax; i++) {
    OWN_ADDRESS_NETWORK.push(i.toString())
}

export const TOOL_ADDRESS_OPTIONS = ["Авто"]
for(let i = 0; i <= toolAddressMax; i++) {
    TOOL_ADDRESS_OPTIONS.push(i.toString())
}

export const COM_PORTS = ["COM3 (Стандартный последовательный порт по соединению Bluetooth)", "COM5 (Стандартный последовательный порт по соединению Bluetooth)"]

export const COM_SPEEDS = ["Авто"]
for(let i = 0; i < 8; i++) {
    COM_SPEEDS.push((Math.pow(2, i) * minCOMSpeed).toString())
}

export const MODEM = [""]

export enum NETWORK_PROTOCOLS {
    TCP = "TCP",
    UDP = "UDP"
}

export const MIN_FONT_SIZE = 16;
export const MAX_FONT_SIZE = 24;
export const FONT_SIZE_CHANGE_STEP = 1;

export const MIN_TIMEOUT_IN_SEC = 1;
export const MAX_TIMEOUT_IN_SEC = 10;


export enum SettingsSection {
	CONNECTION,
	PARAMS
}

export const INITIAL_SETTINGS_SECTION = SettingsSection.CONNECTION;

