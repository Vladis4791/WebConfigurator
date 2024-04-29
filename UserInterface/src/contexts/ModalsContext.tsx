import React, { ReactNode, useContext, useState } from "react";

interface ModalsContextValue {
	openedModalId: string;
	setNewModalId: (modalId: string) => void;
	isModalAlreadyOpen: boolean;
    resetOpenedModalId: () => void
}


const ModalsContext = React.createContext<ModalsContextValue | undefined>(
	undefined
);

const ModalsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
	const [openedModalId, setOpenedModalId] = useState("");

	const setNewModalId = (modalId: string) => {
		setOpenedModalId(modalId);
	};

	const isModalAlreadyOpen = openedModalId !== "";

    const resetOpenedModalId = () => setOpenedModalId("");

	return (
		<ModalsContext.Provider
			value={{
				isModalAlreadyOpen,
				openedModalId,
				setNewModalId,
                resetOpenedModalId
			}}
		>
			{children}
		</ModalsContext.Provider>
	);
};

export const useModal = (): ModalsContextValue => {
	const context = useContext(ModalsContext);
	if (!context) {
		throw new Error("useModal can only be used inside SettingsProvider");
	}

	return context;
};

export default ModalsProvider;
