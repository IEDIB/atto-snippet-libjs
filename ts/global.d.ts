 
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
    MathJax: any,
    MathQuill: MQ.MathQuill
}

/**
 * Interace to Mathquill instance
 * https://raw.githubusercontent.com/trevorhanus/mathquill-types/master/index.d.ts
 */
declare namespace MQ {
    export interface IMathFieldConfig {
        spaceBehavesLikeTab?: boolean;
        leftRightIntoCmdGoes?: 'up' | 'down';
        restrictMismatchedBrackets?: boolean;
        sumStartsWithNEquals?: boolean;
        supSubsRequireOperand?: boolean;
        charsThatBreakOutOfSupSub?: string;
        autoSubscriptNumerals?: boolean;
        autoCommands?: string;
        autoOperatorNames?: string;
        substituteTextarea?: () => void;
        handlers?: {
            deleteOutOf?: (direction: Direction, mathField: MathField) => void;
            moveOutOf?: (direction: Direction, mathField: MathField) => void;
            selectOutOf?: (direction: Direction, mathField: MathField) => void;
            downOutOf?: (mathField: MathField) => void;
            upOutOf?: (mathField: MathField) => void;
            edit?: (mathField: MathField) => void;
            enter?: (mathField: MathField) => void;
        }
    }

    export enum Direction {
        R,
        L,
    }

    export interface InnerFieldController {
       textarea: JQuery<HTMLTextAreaElement>,
       editable: boolean
    }

    export interface InnerField {
       latex(latex: string): void,
       latex(): string,
       __controller: InnerFieldController
    }

    export interface MathField {
        id: any;
        innerFields: InnerField[];
        revert(): void;
        reflow(): void;
        el(): HTMLElement;
        latex(): string;
        latex(latexString: string): void;
        focus(): void;
        blur(): void;
        write(latex: string): void;
        cmd(latexString: string): void;
        select(): void;
        clearSelection(): void;
        moveToLeftEnd(): void;
        moveToRightEnd(): void;
        keystroke(keys: string): void;
        typedText(text: string): void;
        config(newConfig: IMathFieldConfig): void;
    }

    export interface MathQuill {
        noConflict(): MathQuill;
        getInterface(n: number): MathQuill;
        StaticMath(div: HTMLElement): MathField;
        MathField(div: HTMLElement, config: IMathFieldConfig): MathField;
    }
}
 