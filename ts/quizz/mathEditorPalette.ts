import { createElement } from "../_shared/utilsShared";
import { MathEditorPanel } from "./mathEditorPanel";
declare interface PaletteButton {
    name: string,
    latex: string,
    icon: string,
    moveto?: string,
    movefor?: number,
    tab?: number,
}
const tabs =  [
    {
        name: "General",
        buttons: [ 
            {name: "Multiplicació", latex: "\\times", tab: 1, icon: '\\times' },
            {name: "Fracció", latex: "\\frac{}{}", moveto: "Up", movefor: 1, tab: 1, icon: '\\frac{\\square}{\\square}' },
            {name: "Exponent", latex: "\\^{}", moveto: "Up", movefor: 1, tab: 1, icon: '\\square^2' },
            {name: "Parèntesis", latex: "\\left(\\right)", moveto: "Left", movefor: 1, tab: 1, icon: '\\left(\\square\\right)' },
            {name: "Arrel quadrada", latex: "\\sqrt{}", moveto: "Left", movefor: 1, tab: 1, icon: '\\sqrt{\\square}' },
            {name: "Arrel cúbica", latex: "\\sqrt[3]{}", moveto: "Left", movefor: 1, tab: 1, icon: '\\sqrt[3]{\\square}' },
            {name: "Radical", latex: "\\sqrt[{}]{}", moveto: "Left", movefor: 2, tab: 1, icon: '\\sqrt[\\square]{\\square}' },
            {name: "Matriu 2x2", latex: "\\begin{pmatrix} & \\\\ & \\end{pmatrix}", tab: 1, icon: 'M_{2\\times 2}' },
            {name: "Matriu 3x3", latex: "\\begin{pmatrix} & & \\\\ & &  \\\\ & & \\end{pmatrix}", tab: 1, icon: 'M_{3\\times 3}' }
        ]
    },
    {
        name: "Símbols",
        buttons: [
            {name: "pi", latex: "\\pi", tab: 2, icon: '\\pi' },
            {name: "e", latex: "e", tab: 2, icon: 'e' },
            {name: "infinit", latex: "\\infty", tab: 2, icon: '\\infty' },
            {name: "Més menys", latex: "\\pm", tab: 2, icon: '\\pm' },
            {name: "Diferent", latex: "\\neq", tab: 2, icon: '\\neq' },
            {name: "Major o igual", latex: "\\geq", tab: 2, icon: '\\geq' },
            {name: "Menor o igual", latex: "\\leq", tab: 2, icon: '\\leq' },
            {name: "Major que", latex: "\\gt", tab: 2, icon: '\\gt' },
            {name: "Menor que", latex: "\\lt", tab: 2, icon: '\\lt' }
        ]
    },
    {
        name: "Funcions",
        buttons: [
            {name: "Sinus", latex: "\\sin()", moveto: "Left", movefor: 1, tab: 5, icon: '\\sin{\\square}' },
            {name: "Cosinus", latex: "\\cos()", moveto: "Left", movefor: 1, tab: 5, icon: '\\cos{\\square}' },
            {name: "Tangent", latex: "\\tan()", moveto: "Left", movefor: 1, tab: 5, icon: '\\tan{\\square}' },
            {name: "Arcsinus", latex: "\\arcsin()", moveto: "Left", movefor: 1, tab: 5, icon: '\\arcsin{\\square}' },
            {name: "Arccosinus", latex: "\\arccos()", moveto: "Left", movefor: 1, tab: 5, icon: '\\arccos{\\square}' },
            {name: "Arctangent", latex: "\\arctan()", moveto: "Left", movefor: 1, tab: 5, icon: '\\arctan{\\square}' },
            {name: "Logaritme Neperià", latex: "\\ln()", moveto: "Left", movefor: 1, tab: 5, icon: '\\ln{\\square}' },
            {name: "Logaritme en base b", latex: "\\frac{\\log()}{\\log{b}}", moveto: "Left", movefor: 4, tab: 5, icon: '\\log_b{\\square}' }
        ]
    }
];

export class MathEditorPalette {
   
    private view: HTMLDivElement;
    staticMathFields: MQ.MathField[];
    constructor(private panel: MathEditorPanel) {
        this.staticMathFields = [];
        this.view = createElement("div", {
            class: "ibquizz-editor-palette"
        }) as HTMLDivElement;
        this.createPalettes();
    } 
    private createPalettes(): void { 
        tabs.forEach(tab => { 
            const panelTab = document.createElement("div");
            this.view.append(panelTab);
            tab.buttons.forEach( (button)=> {                
                panelTab.append(this.createButton(button));
            });
        })
    }
    private createButton(def: PaletteButton): HTMLButtonElement {
        const iconHtml = document.createElement('span');
        iconHtml.innerHTML = def.icon;
        const MQI: MQ.MathQuill = window.MathQuill!.getInterface(2);
        this.staticMathFields.push( MQI.StaticMath(iconHtml) );
        
        const btn = createElement('button', {
            class: 'btn btn-sm ibquizz-me-btn-toolbar',
            title: def.name
        }) as HTMLButtonElement;
        btn.append(iconHtml);

        btn.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.panel.write(def.latex, def.moveto, def.movefor);
        })

        return btn;
    }
    getView(): HTMLElement {
        return this.view;
    }
    reflow() {
       this.staticMathFields.forEach(f => f.reflow());
    }
}