import { IpcV1 } from "@tendrock/ipc";
export class Tendrock {
    static getIdentifier(id) {
        return `tendrock:${id}`;
    }
}
Tendrock.Namespace = 'tendrock';
Tendrock.Ipc = IpcV1.register('tendrock', 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a');
