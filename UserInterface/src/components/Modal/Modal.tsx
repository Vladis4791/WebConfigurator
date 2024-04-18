import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
import IconButton from "../IconButton/IconButton";
import Icon from "../icon/Icon";
import close from "../../assets/images/close.svg";
import { useHotkeys } from "react-hotkeys-hook";

export interface ModalContent {
	onClose: () => void;
}

const Modal = ({
	isOpen,
	onClose,
	children,
	modalName,
	modalWindowProps,
}: {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	modalName: string;
	modalWindowProps?: React.DOMAttributes<HTMLDivElement>;
}) => {

	if (!isOpen) return null;

	return createPortal(
		<>
			<div className="overlay" onClick={onClose}></div>
			<div className="modal" {...modalWindowProps}>
				<div className="header">
					<div className="container">
						<div className="header_content">
							<div className="fileObserverName">{modalName}</div>
							<IconButton
								renderIcon={() => <Icon url={close} />}
								onClick={onClose}
							/>
						</div>
					</div>
				</div>
				<div className="modal-content">{children}</div>
			</div>
		</>,
		document.getElementById("portal") as HTMLElement
	);
};

export default Modal;
