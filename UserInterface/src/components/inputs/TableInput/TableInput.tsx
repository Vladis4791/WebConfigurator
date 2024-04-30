import { CellContext } from '@tanstack/react-table';
import React, { useState } from 'react';
import { ITableNode } from '../../../interfaces/ITableNode';
import { UpdatedNodeProps } from '../../workspaceUI/ParamsTable/ParamsTable';

const TableInput = (info: CellContext<ITableNode, unknown>) => {

	const { getValue, row: { id }, table } = info;
	const initialValue = getValue() ?? "";

	const [value, setValue] = useState<string>(initialValue as string)


	const onBlur = () => {
		const updatedNodeProps: UpdatedNodeProps = {
			newValue: value,
			updatedNodeId: id,
		};
		(table.options.meta as any).updateData(updatedNodeProps);
	}


	return (
		<input
			style={{margin: "0 auto", display: "block"}}
			value={value}
			onChange={e => setValue(e.target.value)}
			onBlur={onBlur}
		/>
	)
}

export default TableInput;