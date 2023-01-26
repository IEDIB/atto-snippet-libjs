/**
     * Creates a basic dialog which can be extended for further functionality
     * @param {*} title 
     * @param {*} width 
     * @param {*} height 
*/ 
class PwDialog {
    id: string;
    window: JQuery<HTMLDivElement>;
    topBar: JQuery<HTMLDivElement>;
    closeBtn: JQuery<HTMLButtonElement>;
    dragStart: (e: any) => void;
    dragEnd: (e: any) => void;
    setTranslate: (xPos: number, yPos: number, el: HTMLElement) => void;
    drag: (e: any) => void;
    onAccept: (() => void) | undefined;
    onCancel: (()=> void) | undefined;
    body: JQuery<HTMLElement>;
    
    constructor(title: string, width: number, height: number) {
        this.id = "pwdlg_" + Math.random().toString(32).substring(2);
        this.window = $('<div id="' + this.id + '" class="pw-me-dlg" style="width:' + width + 'px;height:' + height + 'px;display:none;"></div>') as JQuery<HTMLDivElement>;
        const topBar = $('<div class="pw-me-dlg-header"></div>') as JQuery<HTMLDivElement>;
        this.topBar = topBar;
        const headerTitle = $('<span class="pw-me-dlg-headertitle">' + title + '</span>') as JQuery<HTMLSpanElement>;
        this.closeBtn = $('<button class="btn btn-sm pw-me-btn-dlgclose" title="Tancar"><i class="fa fas fa-times"></i></button>') as JQuery<HTMLButtonElement>;
        this.closeBtn.on("click", (ev) => {
            ev.preventDefault();
            this.window.css("display", "none");
        });
        topBar.append(headerTitle);
        topBar.append(this.closeBtn);

        //Topbar
        this.window.append(topBar);
        //The body region
        this.body = $('<div class="pw-me-dlg-body"></div>');
        this.window.append(this.body);

        //The accept/cancel buttons
        const controlButtons = $('<div class="pw-me-dlg-controls"></div>') as JQuery<HTMLDivElement>
        const acceptBtn = $('<button class="btn btn-sm btn-primary">Acceptar</button>') as JQuery<HTMLButtonElement>
        const cancelBtn = $('<button class="btn btn-sm btn-outline-primary">Cancel·lar</button>') as JQuery<HTMLButtonElement>
        
        acceptBtn.on("click", ()=> {
            this.close();
            this.onAccept && this.onAccept();
        });

        cancelBtn.on("click", ()=> {
            this.close();
            this.onCancel && this.onCancel();
        });
        
        controlButtons.append(acceptBtn);
        controlButtons.append(cancelBtn);
        this.window.append(controlButtons);

        //Add dialog to body
        $('body').append(this.window);

        // Make this dialog draggable
        let active = false;
        let currentX: number;
        let currentY: number;
        let initialX: number;
        let initialY: number;
        let xOffset = 0;
        let yOffset = 0;

        this.dragStart = function (e: any) {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target === topBar[0]) {
                active = true;
            }
        };

        this.dragEnd = function (e: any) {
            initialX = currentX;
            initialY = currentY;
            active = false;
        };


        this.setTranslate = function (xPos: number, yPos: number, el: HTMLElement) {
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        };
 
        this.drag = (e: any) => {
            if (active) {
                e.preventDefault();

                if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;

                this.setTranslate(currentX, currentY, this.window[0]);
            }
        };


        topBar[0].addEventListener("touchstart", this.dragStart, false);
        topBar[0].addEventListener("touchend", this.dragEnd, false);
        topBar[0].addEventListener("touchmove", this.drag, false);

        topBar[0].addEventListener("mousedown", this.dragStart, false);
        topBar[0].addEventListener("mouseup", this.dragEnd, false);
        topBar[0].addEventListener("mousemove", this.drag, false);
    }

    append(element: JQuery<HTMLElement>): void {
        this.window.append(element);
    }
    show(): void {
        this.window.css("display", "flex");  
    }
    close(): void {
        this.window.css("display", "none");
    }
    remove(): void {
        this.closeBtn.off();
        this.window.remove();
        this.topBar[0].removeEventListener("touchstart", this.dragStart);
        this.topBar[0].removeEventListener("touchend", this.dragEnd);
        this.topBar[0].removeEventListener("touchmove", this.drag);
        this.topBar[0].removeEventListener("mousedown", this.dragStart);
        this.topBar[0].removeEventListener("mouseup", this.dragEnd);
        this.topBar[0].removeEventListener("mousemove", this.drag);
    }
    dispose(): void {
        this.remove();
    }
    setAcceptAction(action: ()=>void) {
        this.onAccept = action;
    }
    setCancelAction(action: ()=>void) {
        this.onCancel = action;
    }
    setBody(body: JQuery<HTMLElement>): void {
        this.body.html("");
        this.body.append(body);
    }
}

let singleton: PwDialog;

export function getDialog(): PwDialog {
    if(singleton == null) {
        singleton = new PwDialog("Editor", 600, 400);
    }
    return singleton;
}