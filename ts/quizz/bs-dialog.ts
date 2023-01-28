/* eslint-disable @typescript-eslint/ban-ts-comment */
class BSDialog {

    private elem: JQuery<HTMLDivElement>;
    private body: JQuery<HTMLDivElement>;
    private header: JQuery<HTMLElement>; 


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
                  <div class="modal-body" style="max-height:450px;overflow-y:auto;">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Acceptar</button>
                   </div>
                </div>
                </div>`) as JQuery<HTMLDivElement>;

        this.body = this.elem.find('div.modal-body') as JQuery<HTMLDivElement>;
        this.header = this.elem.find('h5.modal-title') as JQuery<HTMLElement>; 

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

    show() {
        //@ts-ignore
        this.elem.modal('show'); 
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