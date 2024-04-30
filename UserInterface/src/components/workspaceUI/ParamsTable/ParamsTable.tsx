import React, { useEffect, useRef, useState } from "react";
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
	Cell,
	Header,
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
import Icon from "../../icon/Icon";
import unsaved_star_image from "./../../../assets/images/star.svg";
import ExpandButton from "./ExpandButton/ExpandButton";
import ParamsTableActionButtons from "./ParamsTableActionButtons/ParamsTableActionButtons";

export interface UpdatedNodeProps extends NodeProps {
	newValue?: string;
	newOperative?: boolean;
}

export interface NodeProps {
	updatedNodeId: string;
}

const ParamsTable = () => {
	const { tableNodes, currentDevice, setTableNodes } = useWorkspace();

	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
		{}
	);

	const [expanded, setExpanded] = useState<ExpandedState>({});

	const [clickedRow, setClickedRow] = useState<Row<ITableNode> | undefined>(
		undefined
	);

	const columns = React.useMemo<ColumnDef<ITableNode>[]>(() => {
		const operativeParamIndex = 3;

		const columnsForLogika4: ColumnDef<ITableNode>[] = [
			{
				accessorKey: "choose",
				header: "Выбор",
				cell: ({ row }) => (
					<div
						style={{
							paddingLeft: `${row.depth * 2}rem`,
							display: "flex",
							alignItems: "center",
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
								<ExpandButton row={row} />
							) : (
								""
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
						if (isEdited)
							return (
								<div style={{ width: "30px", height: "30px" }}>
									<Icon url={unsaved_star_image} />
								</div>
							);
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

		if (currentDevice.DeviceType === "Logika6") {
			const columnsForLogika6 = columnsForLogika4.filter(
				(column, idx) => idx !== operativeParamIndex
			);
			return columnsForLogika6;
		}

		return columnsForLogika4;
	}, [currentDevice]);

	const table = useReactTable({
		data: tableNodes,
		columns,
		state: {
			expanded,
			rowSelection,
		},
		initialState: {
			pagination: {
				pageSize: 20
			}
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


	useEffect(() => {
		setExpanded({});
	}, [currentDevice]);

	const getClassNameByCell = (cell: Cell<ITableNode, unknown>) => {
		const columnIdAndColumnName = cell.id.split("_");
		const columnName = columnIdAndColumnName[1];
		return columnName;
	};

	return (
		<div className="ParamsTable">
			<div className="container">
				<div className="paramsTableHeaderMenu">
					<WorkspaceBreadCrumbs clickedRow={clickedRow} />
					<ParamsTableActionButtons table={table} />
				</div>
				<div className="paramsTableWrapper">
					<table
						className={`${currentDevice.DeviceType} paramTableRepresentation`}
					>
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<th
												key={header.id}
												colSpan={header.colSpan}
												className={header.id}
											>
												{header.isPlaceholder ? null : (
													<div>
														{flexRender(
															header.column
																.columnDef
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
												<td
													key={cell.id}
													className={getClassNameByCell(
														cell
													)}
												>
													{flexRender(
														cell.column.columnDef
															.cell,
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
					<div className="emptyBlock"></div>
					<HintBlock clickedRow={clickedRow} />
				</div>
			</div>
		</div>
	);
};

export default ParamsTable;
