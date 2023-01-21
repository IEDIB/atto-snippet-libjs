type Nullable<T> = T | null;
type Dict<T> = {[key: string]: T};

declare interface ComponentMeta {
    name: string,
    author: string,
    version: string,
    use$?: boolean | undefined,
    query?: string | undefined
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

declare interface ZoomwheelDefaults {
    zoom: number,
    maxZoom: number,
    initialZoom: number,
    initialX: number,
    initialY: number,
}

declare interface VoicePlayer {
    src?: string,
    play(): void,
    pause(): void,
    dispose(): void
}

interface Window {
    MathJax: any
}