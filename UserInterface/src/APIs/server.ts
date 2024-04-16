import EventEmitter from "events";
import { IServerResponse } from "../interfaces/IServerResponse";
import { IServerRequest } from "../interfaces/IServerRequest";

interface EmitterWithId {
    emitter: EventEmitter
    requestId: string
}

enum METHODS {
    GET = "GET",
    ACTION = "ACTION",
    POST = "POST"
}


class Server {
    private serverObj: any;
    private emitters: EmitterWithId[];

    constructor() {
       // @ts-ignore
        this.serverObj = window.external;
        this.emitters = [];
        // @ts-ignore
        this.serverObj.receiveMessage((res: string) => {

            const response = JSON.parse(res) as IServerResponse;
            const { RequestId } = response;

            const emitterWithIdIndex = this.getEmitterIndexByRequestId(RequestId);
            this.emitters[emitterWithIdIndex].emitter.emit("getMessage", response)
            this.emitters.splice(emitterWithIdIndex, 1);
        });
    }

    private getEmitterIndexByRequestId(requestId: string) {
        const emitterIndex = this.emitters.findIndex(emitterWithId => emitterWithId.requestId === requestId);
        return emitterIndex;
    }

    private sendRequest(path: string, method: string, params: any) {

        const requestId = `${Math.random()}-${Date.now()}`;


        const request: IServerRequest = {
            Path: path,
            RequestId: requestId,
            Method: method,
            Params: params ? params : {}
        }

        const emitter = this.createEmitterForRequest(requestId);
        this.serverObj.sendMessage(JSON.stringify(request));
        return this.waitForEvent<IServerResponse>(emitter, "getMessage")
    }

    private createEmitterForRequest(requestId: string) {
        const emitter = new EventEmitter();
        const emitterWithId: EmitterWithId = {
            emitter,
            requestId: requestId
        };

        this.emitters.push(emitterWithId);

        return emitter;
    }

    private waitForEvent<T>(emitter: EventEmitter, event: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const success = (val: T) => {
                emitter.off("error", fail);
                resolve(val);
            };
            const fail = (err: Error) => {
                emitter.off(event, success);
                reject(err);
            };
            emitter.once(event, success);
            emitter.once("error", fail);
        });
    }


    public get(path: string, params?: any): Promise<IServerResponse> {    
        return this.sendRequest(path, METHODS.GET, params);      
    }

    public action(actionName: string, params?: any) {
        return this.sendRequest(actionName, METHODS.ACTION, params);      
    }
}

export const server = new Server();