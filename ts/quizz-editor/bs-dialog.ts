/* eslint-disable @typescript-eslint/ban-ts-comment */
class BSDialog {

    private elem: JQuery<HTMLDivElement>;
    private body: JQuery<HTMLDivElement>;
    private header: JQuery<HTMLElement>;
    private secondaryBtn: JQuery<HTMLButtonElement>;
    private primaryBtn: JQuery<HTMLButtonElement>;


    constructor(id: string, title: string) {

        this.elem = $(`
            <div class="modal fade moodle-dialogue" id="${id}" tabindex="-1" aria-labelledby="bsdialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel·lar</button>
                    <button type="button" class="btn btn-primary">Acceptar</button>
                   </div>
                </div>
                </div>`) as JQuery<HTMLDivElement>;

        this.body = this.elem.find('div.modal-body') as JQuery<HTMLDivElement>;
        this.header = this.elem.find('h5.modal-title') as JQuery<HTMLElement>;
        this.secondaryBtn = this.elem.find('button.btn-secondary') as JQuery<HTMLButtonElement>;
        this.primaryBtn = this.elem.find('button.btn-primary') as JQuery<HTMLButtonElement>;

        this.secondaryBtn.on('click', () => {
            //@ts-ignore
            this.elem.modal('hide');
        });

        $('body').append(this.elem);
    }

    clearBody(): void {
        this.body.html('');
    }

    setBody(htmlElem: HTMLElement): void {
        this.clearBody();
        this.body.append($(htmlElem));
    }

    setTitle(title: string): void {
        this.header.html(title);
    }

    show(cb: () => void) {
        //@ts-ignore
        this.elem.modal('show');
        this.primaryBtn.off();
        this.primaryBtn.on('click', () => {
            cb();
            //@ts-ignore
            this.elem.modal('hide');
        });
    }
}

const dialogCache: {[key:string]: BSDialog} = {};

export function getDialog(id: string, title: string): BSDialog {
    let dlg = dialogCache[id];
    if(!dlg) {
        dlg = new BSDialog(id, title);
        dialogCache[id] = dlg;
    }
    dlg.setTitle(title);
    return dlg;
}