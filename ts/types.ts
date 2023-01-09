import { BaseComponent } from "./base";

export interface IBaseConstructor {
    new(parent: HTMLElement): BaseComponent
}

export interface IBase extends IBaseConstructor {
    meta: ComponentMeta
}

export interface IBComponentNS {
    _class: IBase,
    _init(): void,
    _dispose(): void,
    inst?: Dict<BaseComponent> | undefined,
    singl?: BaseComponent | undefined
}


interface IBType {
    sd: Dict<IBComponentNS>
}

declare global {
    interface Window {
        IB: IBType,
        M: {
            cfg: {
                courseId: string
            }
        },
        audiosInPage?: AudioNode[]
    }
} 