type Nullable<T> = T | null;

declare interface IBComponentInstance { 
    bind(): void,
    dispose(): void
}

declare interface IBComponentNS {
    _class: new(parent: Element) => IBComponentInstance,
    inst: {[key: string]: IBComponentInstance}
}

declare interface IBType {
    sd: {[key: string]: IBComponentNS}
}

interface Window {
    IB: IBType,
    M: any
}

declare interface PageInfo {
    userId: number,
    userFullname: string,
    isTeacher: boolean,
    site: string,
    courseName: string,
    courseId: number
}

declare type RanGen = () => number;