import { Table } from "@tanstack/react-table";
import React from "react";
import { ITableNode } from "../../../../interfaces/ITableNode";
import './ParamsTableActionButtons.scss';

const ParamsTableActionButtons = ({ table }: { table: Table<ITableNode> }) => {
	return (
		<div className="ParamsTableActionButtons">
			<button
				className="paramTableActionButton"
				onClick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}

			>
				{"<<"}
			</button>
			<button
				className="paramTableActionButton"
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				{"<"}
			</button>
			<button
				className="paramTableActionButton"
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				{">"}
			</button>
			<button
				className="paramTableActionButton"
				onClick={() => table.setPageIndex(table.getPageCount() - 1)}
				disabled={!table.getCanNextPage()}
			>
				{">>"}
			</button>
		</div>
	);
};

export default ParamsTableActionButtons;
