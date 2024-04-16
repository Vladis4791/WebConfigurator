import React from 'react'
import './HintBlock.scss'
import { Row } from '@tanstack/react-table'
import { ITableNode } from '../../../interfaces/ITableNode'

const HintBlock = ({ clickedRow }: { clickedRow?: Row<ITableNode>}) => {

	return (
		<div className="HintBlock">
			<div className="detailedDescription">
				{ clickedRow?.original?.detailedDescription as string }
			</div>
			<div className="valueRange">
				{ clickedRow?.original?.valueRange as string }
			</div>
		</div>
	)
}

export default HintBlock