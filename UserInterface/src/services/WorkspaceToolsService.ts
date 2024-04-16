import { workspaceAPI } from "../APIs/workspace.api";
import { ITableNode } from "../interfaces/ITableNode";
import { tableService } from "./TableService";

class WorkspaceToolsService {

    public saveDeviceToFile(tableNodes: ITableNode[], fileName: string) {
        const data = tableService.getTagsInfoFromTableData(tableNodes);
        return workspaceAPI.saveDeviceToFile(data, fileName);
    }

}

export const workspaceToolsService = new WorkspaceToolsService();