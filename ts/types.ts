import { BaseComponent } from "./base";

export interface IBase {
    new(parent: HTMLElement): BaseComponent
    meta?: ComponentMeta
}

export interface IBComponentNS {
    _class: IBase,
    init(): void,
    dispose(): void,
    inst?: Dict<unknown>,
    singl?: unknown
}


interface IBType {
    sd: Dict<IBComponentNS>,
    on$Ready?: ()=>void
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