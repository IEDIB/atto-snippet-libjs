import { BaseComponent } from "./base";
export interface ComponentType {
    name: string,
    author: string,
    version: string,
    class: new(parent: Element) => InstanceType<typeof BaseComponent>,
    query?: string,
    use$?: boolean
}

export interface PageInfoType {
    userId: number,
    userFullname: string,
    isTeacher: boolean,
    site: string,
    courseName: string,
    courseId: number
}

export type RanGen = () => number;
