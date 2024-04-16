import React, { useEffect, useState } from "react";
import RadioButton from "../../../inputs/radiobutton/RadioButton";
import { NETWORK_PROTOCOLS } from "../../../../constants/Settings";
import "./NetworkProtocols.scss";

const NetworkProtocols = (props: { onChange: (protocol: string) => void }) => {
	const { onChange } = props;
	const [selectedProtocol, setSelectedProtocol] = useState(NETWORK_PROTOCOLS.TCP);

	useEffect(() => {
		onChange(selectedProtocol);
	});

	const groupName = "networkProtocols";

	return (
		<div className="NetworkProtocols">
			<RadioButton
				groupName={groupName}
				checked={selectedProtocol === NETWORK_PROTOCOLS.TCP}
				radioButtonName={NETWORK_PROTOCOLS.TCP}
				onChange={() => setSelectedProtocol(NETWORK_PROTOCOLS.TCP)}
			/>
			<RadioButton
				groupName={groupName}
				radioButtonName={NETWORK_PROTOCOLS.UDP}
				checked={selectedProtocol === NETWORK_PROTOCOLS.UDP}
				onChange={() => setSelectedProtocol(NETWORK_PROTOCOLS.UDP)}
			/>
		</div>
	);
};

export default NetworkProtocols;
