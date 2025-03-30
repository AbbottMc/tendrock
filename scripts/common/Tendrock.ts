import {IpcV1} from "@tendrock/ipc";

export class Tendrock {
  public static Ipc = IpcV1.register('tendrock', 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a');

  public static getIdentifier(id: string) {
    return `tendrock:${id}`;
  }
}