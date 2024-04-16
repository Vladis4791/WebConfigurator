import { deviceParams } from "../constants/Test";
import { server } from "./server";

class DeviceAPIs {
    getAllDevicesCaptions() {
        return server.get('/allDevicesCaptions');
    }

    getNewDeviceInstance(deviceName: string) {
        return server.get('/getNewDevice', deviceName);
        // return Promise.resolve(deviceParams);
    }

    getDeviceFromFile(filePath: string) {
        return server.get('/getDeviceFromFile', filePath);
    }
}

export const DeviceAPI = new DeviceAPIs();

