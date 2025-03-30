export interface IAddonAuthor<T extends Record<string, string>> {
  type: 'team' | 'individual',
  name: string,
  structure: T,
  members: { [member: string]: (keyof T) | (Array<keyof T>) }
}

export interface IAddonSettings {
  type: string;
  default: any;
  description: string;
}

export interface IAddonInfo {
  namespace: string,
  scriptEnvironmentId: string,
  description: string,
  version: string,
  author: IAddonAuthor<Record<string, string>>,
  icon: string,
  settings: {
    // enableIc2Zip: {
    //   type: 'toggle',
    //   default: true,
    //   description: '是否启用电击'
    // },
    // enableMachineExplosion: {
    //   type: 'toggle',
    //   default: true,
    //   description: '是否启用机器爆炸机制'
    // }
  }
}