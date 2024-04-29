import React, { useEffect, useRef, useState } from "react";
import { DeviceAPI } from "../../../APIs/device.api";
import { IDevice } from "../../../interfaces/IDeviceParams";
import { useLocation } from "react-router-dom";
import "./ParamsTable.scss";
import {
	ExpandedState,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	getExpandedRowModel,
	ColumnDef,
	flexRender,
	RowSelectionState,
	Row,
} from "@tanstack/react-table";
import { useSkipper } from "../../../hooks/useSkipper";
import TableInput from "../../inputs/TableInput/TableInput";
import IndeterminateCheckbox from "../../inputs/indeterminateCheckbox/IndeterminateCheckbox";
import { ITableNode } from "../../../interfaces/ITableNode";
import { useWorkspace } from "../../../contexts/WorkspaceContext";
import { tableService } from "../../../services/TableService";
import TableCheckbox from "../../inputs/TableCheckbox/TableCheckbox";
import HintBlock from "../HintBlock/HintBlock";
import WorkspaceBreadCrumbs from "../WorkspaceBreadCrumbs/WorkspaceBreadCrumbs";

export interface UpdatedNodeProps extends NodeProps {
	newValue?: string;
	newOperative?: boolean;
}

export interface NodeProps {
	updatedNodeId: string;
}

const ParamsTable = () => {
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
		{}
	);

	const { tableNodes, currentDevice, setTableNodes } = useWorkspace();

	useEffect(() => {
		setExpanded({})
		console.log("currentDevice changed")
	}, [currentDevice]);

	const columns = React.useMemo<ColumnDef<ITableNode>[]>(
		() => {
			const operativeParamIndex = 3;

			const columnsForLogika4: ColumnDef<ITableNode>[] = [
				{
					accessorKey: "choose",
					header: "Выбор",
					cell: ({ row }) => (
						<div
							style={{
								paddingLeft: `${row.depth * 2}rem`,
							}}
						>
							<>
								<IndeterminateCheckbox
									{...{
										checked: row.getIsSelected(),
										indeterminate: row.getIsSomeSelected(),
										onChange: row.getToggleSelectedHandler(),
									}}
								/>{" "}
								{row.getCanExpand() ? (
									<button
										{...{
											onClick: row.getToggleExpandedHandler(),
											style: { cursor: "pointer" },
										}}
									>
										{row.getIsExpanded() ? "👇" : "👉"}
									</button>
								) : (
									"🔵"
								)}
							</>
						</div>
					),
					footer: (props) => props.column.id,
				},
				{
					accessorFn: (row) => row.paramName,
					id: "param",
					cell: (info) => info.getValue(),
					header: () => <span>Параметр</span>,
					footer: (props) => props.column.id,
				},
				{
					accessorKey: "isEdited",
					header: "",
					cell: (info) => {
						if (info.row.subRows.length === 0) {
							const isEdited = info.getValue() as boolean;
							if (isEdited) return "unsaved";
							return null;
						}
	
						return null;
					},
				},
				{
					accessorKey: "isOperative",
					header: "Оперативный",
					cell: (info) => {
						return info.row.subRows.length === 0 ? (
							<TableCheckbox {...info} />
						) : null;
					},
				},
				{
					accessorKey: "value",
					header: () => "Значение",
					cell: (info) => {
						return info.row.subRows.length === 0 ? (
							<TableInput {...info} />
						) : null;
					},
					footer: (props) => props.column.id,
				},
				{
					accessorKey: "measurementUnits",
					header: () => <span>Единицы</span>,
					cell: (props) => props.getValue(),
					footer: (props) => props.column.id,
				},
				{
					accessorKey: "description",
					header: "Описание",
					cell: (props) => props.getValue(),
					footer: (props) => props.column.id,
				},
			];

			if(currentDevice.DeviceType === "Logika6") {
				const columnsForLogika6 = columnsForLogika4.filter((column, idx) => idx !== operativeParamIndex);
				return columnsForLogika6;
			}

			return columnsForLogika4;
		},
		[currentDevice]
	);

	const [expanded, setExpanded] = useState<ExpandedState>({});

	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

	const table = useReactTable({
		data: tableNodes,
		columns,
		state: {
			expanded,
			rowSelection,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onExpandedChange: setExpanded,
		getSubRows: (row) => row.subRows,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		autoResetPageIndex,
		meta: {
			updateData: (updatedNodeProps: UpdatedNodeProps) => {
				skipAutoResetPageIndex();
				setTableNodes((old) =>
					tableService.getCopyOfTableUpdatedWithNewInfo(
						old,
						updatedNodeProps
					)
				);
			},
		},
		debugTable: true,
	});

	const [clickedRow, setClickedRow] = useState<Row<ITableNode> | undefined>(
		undefined
	);

	return (
		<div className="ParamsTable">
			<div className="container">
				<WorkspaceBreadCrumbs clickedRow={clickedRow} />
				<table className="paramTableRepresentation">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
										>
											{header.isPlaceholder ? null : (
												<div>
													{flexRender(
														header.column.columnDef
															.header,
														header.getContext()
													)}
												</div>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<tr
									key={row.id}
									onClick={() => setClickedRow(row)}
								>
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				<HintBlock clickedRow={clickedRow} />
				<div className="flex items-center gap-2">
					<button
						className="border rounded p-1"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{"<<"}
					</button>
					<button
						className="border rounded p-1"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{"<"}
					</button>
					<button
						className="border rounded p-1"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{">"}
					</button>
					<button
						className="border rounded p-1"
						onClick={() =>
							table.setPageIndex(table.getPageCount() - 1)
						}
						disabled={!table.getCanNextPage()}
					>
						{">>"}
					</button>
					<span className="flex items-center gap-1">
						<div>Page</div>
						<strong>
							{table.getState().pagination.pageIndex + 1} of{" "}
							{table.getPageCount()}
						</strong>
					</span>
					<span className="flex items-center gap-1">
						| Go to page:
						<input
							type="number"
							defaultValue={
								table.getState().pagination.pageIndex + 1
							}
							onChange={(e) => {
								const page = e.target.value
									? Number(e.target.value) - 1
									: 0;
								table.setPageIndex(page);
							}}
							className="border p-1 rounded w-16"
						/>
					</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
				<div>{table.getRowModel().rows.length} Rows</div>
				<button
					onClick={() =>
						console.log(
							tableService.getTagsInfoFromTableData(tableNodes),
							tableNodes
						)
					}
				>
					submit
				</button>
			</div>
		</div>
	);
};

export default ParamsTable;
