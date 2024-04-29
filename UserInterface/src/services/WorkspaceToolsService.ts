import { workspaceAPI } from "../APIs/workspace.api";
import { ITableNode } from "../interfaces/ITableNode";
import { tableService } from "./TableService";

class WorkspaceToolsService {

    public saveDeviceToFile(tableNodes: ITableNode[], path: string) {
        const data = tableService.getTagsInfoFromTableData(tableNodes);
        return workspaceAPI.saveDeviceToFile(data, path);
    }

}

export const workspaceToolsService = new WorkspaceToolsService();