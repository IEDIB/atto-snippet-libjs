import { BaseComponent } from "./base";

export interface IBase {
    new(parent: HTMLElement): BaseComponent
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