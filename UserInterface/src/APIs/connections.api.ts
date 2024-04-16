import { server } from "./server";

export class ConnectionAPI {

    public configurateConnection() {
        server.action('/configurateConnection');
    }

    public readDataFromDevice() {
        server.get('/readDataFromDevice');
    }
}

export const connectionAPI = new ConnectionAPI();