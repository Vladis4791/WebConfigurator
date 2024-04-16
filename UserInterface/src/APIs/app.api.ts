import { IServerResponse } from "../interfaces/IServerResponse";
import { server } from "./server";


class AppAPIs {

    getDirectoryEntries(directoryPath: string) {

        if(!directoryPath) return ;

        const result = server.get('/getDirectoryEntries', directoryPath);
        return result;
    }
}

export const appAPI = new AppAPIs();