import React from 'react'
import ToolMenu from '../../components/workspaceUI/toolMenu/ToolMenu'
import WorkspaceProvider from '../../contexts/WorkspaceContext'
import { Outlet } from 'react-router-dom'

const Workspace = () => {

	return (
		<div className="Workspace">
				<ToolMenu />
				<Outlet />
		</div>
	)
}

export default Workspace