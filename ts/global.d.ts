type Nullable<T> = T | null;
 
declare interface IBType {
    sd: {[key: string]: any}
}

interface Window {
    IB: IBType
    M: any
}