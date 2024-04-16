import React from 'react'
import ToolMenu from '../../components/workspaceUI/toolMenu/ToolMenu'
import ParamsTable from '../../components/workspaceUI/ParamsTable/ParamsTable'
import WorkspaceProvider from '../../contexts/WorkspaceContext'
import { Outlet } from 'react-router-dom'

const Workspace = () => {

	return (
		<div className="Workspace">
			<WorkspaceProvider>
				<ToolMenu />
				<ParamsTable />
			</WorkspaceProvider>
		</div>
	)
}

export default Workspace