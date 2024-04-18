import { useState } from "react";

export const useModal = () => {
	const [isModalCanBeOpen, setIsModalCanBeOpen] = useState(false);
	const [currentModalId, setCurrentModalId] = useState("");

	const prohibitOpenNewModal = () => setIsModalCanBeOpen(false);
	const allowOpenNewModal = () => setIsModalCanBeOpen(true);

    const setNewModalId = (id: string) => setCurrentModalId(id);

	return { currentModalId, modalAlreadyOpen: isModalCanBeOpen, prohibitOpenNewModal, allowOpenNewModal, setNewModalId } as const;
};
