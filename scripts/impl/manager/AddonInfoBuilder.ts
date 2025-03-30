import {IAddonInfo} from "./IAddonInfo";

export class AddonInfoBuilder {
  private _info: IAddonInfo;

  constructor() {
  }

  public static create() {
    return new AddonInfoBuilder();
  }

  namespace(namespace: string) {
    this._info.namespace = namespace;
    return this;
  }

  scriptEnvironmentId(scriptEnvironmentId: string) {
    this._info.scriptEnvironmentId = scriptEnvironmentId;
    return this;
  }

  description(description: string) {
    this._info.description = description;
    return this;
  }

  version(version: string) {
    this._info.version = version;
    return this;
  }

  author(author: IAddonInfo['author']) {
    this._info.author = author;
    return this;
  }

  icon(icon: string) {
    this._info.icon = icon;
    return this;
  }

  settings(settings: IAddonInfo['settings']) {
    this._info.settings = settings;
    return this;
  }

  build() {
    return this._info;
  }
}

const a: IAddonInfo = {
  namespace: 'ic2',
  scriptEnvironmentId: 'industrial_craft_2',
  description: '工业时代2（Industrial Craft 2），是围绕 Minecraft 生活现代化和生产自动化两个主题而展开的 Minecraft 模组。它在工业时代 1 的基础上发展而来，引入了名为 [EU] 能量单元 (Energy Unit) 的电力能源系统，以及对应的发电设备，并以此为基础添加了大量相关物品、方块以及机器。其内容涉及资源处理、矿物采集、农业等多个主题，极大地平衡和丰富了前代的游戏体验，同时还拥有许多拓展模组，进一步丰富了游戏体验，增加了新的游戏目标。',
  version: '1.1.0-alpha',
  author: {
    type: 'team',
    name: 'IndustrialCraft2 Dev Team - Bedrock',
    structure: {
      'leader': '项目负责人',
      'game_designer': '游戏设计师',
      'architecture_engineer': '架构工程师',
      'programmer': '程序员',
      'texture_artist': '纹理艺术家'
    },
    members: {
      'QianShanyao': ['leader', 'architecture_engineer', 'game_designer'],
      '请昵': ''
    }
  },
  icon: 'textures/ui/icon',
  settings: {
    enableIc2Zip: {
      type: 'toggle',
      default: true,
      description: '是否启用电击'
    },
    enableMachineExplosion: {
      type: 'toggle',
      default: true,
      description: '是否启用'
    }
  }
}