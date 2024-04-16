import React, { useState } from 'react'
import Modal, { ModalContent } from '../Modal/Modal'

const ButtonWithModal = ({
    renderButton,
    renderModalContent,
    modalName
}: {
    renderButton: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => React.ReactElement,
    renderModalContent: (props: ModalContent) => React.ReactElement,
    modalName: string
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <>
            { renderButton({ onClick: closeModal }) }
            <Modal 
                isOpen={isOpen} 
                onClose={closeModal}
                modalName={modalName}
            >
                { renderModalContent({ onClose: closeModal }) }
            </Modal>
        </>
    )
}

export default ButtonWithModal