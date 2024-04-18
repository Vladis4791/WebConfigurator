import React, { useMemo, useState } from "react";
import Modal, { ModalContent } from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";

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

	const { currentModalId, setNewModalId, modalAlreadyOpen, prohibitOpenNewModal, allowOpenNewModal } = useModal();

	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => setIsOpen(false);

    const toggleModal = () => setIsOpen(prev => !prev);

	const openModal = () => setIsOpen(true);

	const modalId = useMemo(() => `${Math.random()}-${Date.now()}`, []);

	const handleButtonClick = () => {
		console.log(modalId);
		const modalAlreadyOpen = currentModalId !== "";

		if(!modalAlreadyOpen) {
			setNewModalId(modalId);	
			toggleModal();
			console.log("open")
		} else {
			if(currentModalId === modalId) {
				console.log("close")
				toggleModal();
				setNewModalId("");
			} else {
				console.log("unresolved")
			}
		}
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
