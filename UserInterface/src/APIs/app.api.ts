import { IServerResponse } from "../interfaces/IServerResponse";
import { server } from "./server";


class AppAPIs {

    getDirectoryEntries(directoryPath: string) {

        if(!directoryPath) return ;

        const result = server.get('/getDirectoryEntries', directoryPath);
        return result;
    }

    getRootDerictories() {
        const result = server.get('/rootDirectories');
        return result;
    }

    createNewFile(newFilePath: string) {
        console.log(newFilePath)
        const result = server.action('/createNewFile', newFilePath);
        return result;
    }
}

export const appAPI = new AppAPIs();