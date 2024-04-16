import { TagInfo } from "../interfaces/ITableNode";
import { server } from "./server";

class WorkspaceAPI {
    public saveDeviceToFile(tagsInfo: TagInfo[], fileName: string) {
        return server.action('/saveDevice', {
            TagsInfo: tagsInfo,
            FileName: fileName
        });
    }

    public printReportForCurrentDevice(info: any) {
        return server.action('/printParams', {
            Params: info
        });
    }
}

export const workspaceAPI = new WorkspaceAPI();