import React, { useMemo, useState } from "react";
import Modal, { ModalContent } from "../Modal/Modal";
import { useModal } from "../../contexts/ModalsContext";

const ButtonWithModal = ({
	renderButton,
	renderModalContent,
	modalName,
}: {
	renderButton: (
		props: React.ButtonHTMLAttributes<HTMLButtonElement>
	) => React.ReactElement;
	renderModalContent: (props: ModalContent) => React.ReactElement;
	modalName: string;
}) => {

	const [isOpen, setIsOpen] = useState(false);

	const modalId = useMemo(() => `${Math.random()}-${Date.now()}`, []);

	const { isModalAlreadyOpen, setNewModalId, openedModalId, resetOpenedModalId } = useModal();

	const closeModal = () => {
		setIsOpen(false);
		resetOpenedModalId();
	}

	const openModal = () => {
		setNewModalId(modalId);	
		setIsOpen(true);
	}

	const toggleModal = () => {
		setIsOpen(prev => !prev);
	}

	const isTryingToCloseOpenedModal = openedModalId === modalId;

	const handleButtonClick = () => {
		toggleModal();
		// if(!isModalAlreadyOpen) {
		// 	openModal();
		// }

		// if(isModalAlreadyOpen && isTryingToCloseOpenedModal) {
		// 	closeModal();
		// }	

	}

    const button = renderButton({ onClick: handleButtonClick });

	return (
		<>
			{ button }
			<Modal
				isOpen={isOpen}
				onClose={closeModal}
				modalName={modalName}
			>
				{renderModalContent({ onClose: closeModal })}
			</Modal>
		</>
	);
};

export default ButtonWithModal;
