import { TagInfo } from "../interfaces/ITableNode";
import { server } from "./server";

class WorkspaceAPI {
    public saveDeviceToFile(tagsInfo: TagInfo[], filePath: string) {
        return server.action('/saveDevice', {
            TagsInfo: tagsInfo,
            FilePath: filePath
        });
    }

    public printReportForCurrentDevice(info: any) {
        return server.action('/printParams', {
            Params: info
        });
    }
}

export const workspaceAPI = new WorkspaceAPI();