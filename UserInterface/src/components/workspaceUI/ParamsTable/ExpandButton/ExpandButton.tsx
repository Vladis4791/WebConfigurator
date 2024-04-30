import { Row } from "@tanstack/react-table";
import React from "react";
import { ITableNode } from "../../../../interfaces/ITableNode";
import Icon from "../../../icon/Icon";
import arrow from "./../../../../assets/images/arrow.svg";

const ExpandButton = ({ row }: { row: Row<ITableNode> }) => {
	return (
		<button
			{...{
				onClick: row.getToggleExpandedHandler(),
				style: {
					cursor: "pointer",
					backgroundColor: "inherit",
					border: "none",
					marginLeft: "10px",
				},
			}}
		>
			{row.getIsExpanded() ? (
				<div
					style={{
						transform: "rotate(-90deg)",
					}}
				>
					<Icon url={arrow} />
				</div>
			) : (
				<div
					style={{
						transform: "rotate(180deg)",
					}}
				>
					<Icon url={arrow} />
				</div>
			)}
		</button>
	);
};

export default ExpandButton;
