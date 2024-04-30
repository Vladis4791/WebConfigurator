import { CellContext } from "@tanstack/react-table";
import React from "react";
import { ITableNode } from "../../../interfaces/ITableNode";
import Checkbox from "../checkbox/Checkbox";
import { UpdatedNodeProps } from "../../workspaceUI/ParamsTable/ParamsTable";
import "./TableCheckbox.scss";

const TableCheckbox = (info: CellContext<ITableNode, unknown>) => {
	const {
		getValue,
		row: { id },
		table,
	} = info;

	const initialValue = getValue() as boolean;

	const onChange = (checked: boolean) => {
		const updatedNodeProps: UpdatedNodeProps = {
			newOperative: checked,
			updatedNodeId: id,
		};

		(table.options.meta as any).updateData(updatedNodeProps);
	};

	return <Checkbox className="TableCheckbox" checked={initialValue} onChange={onChange} />;
};

export default TableCheckbox;
