import { BaseComponent } from "./base";
export interface ComponentDef {
    name: string,
    author: string,
    version: string,
    class: new(parent: Element) => InstanceType<typeof BaseComponent>,
    query?: string
}