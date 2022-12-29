type Nullable<T> = T | null;

declare interface IBComponentInstance { 
    bind(): void,
    dispose(): void
}

declare interface ComponentMeta {
    name: string,
    author: string,
    version: string,
    use$?: boolean | undefined,
    query?: string | undefined
}
 
declare type IBComponentClass = new(parent: Element) => IBComponentInstance;
   
declare interface IBComponentNS {
    _class: IBComponentClass,
    inst: {[key: string]: IBComponentInstance}
}

declare interface IBType {
    sd: {[key: string]: IBComponentNS}
}

interface Window {
    IB: IBType,
    M: any,
    wheelzoom: any
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