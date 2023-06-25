/* eslint-disable @typescript-eslint/ban-ts-comment */

import { createElement } from "./_shared/utilsShared";
import { getPathValue, setPathValue, splitBar } from "./jsPath";

/**
 * Type of dialog
 * CLOSE, Only close button
 * CANCEL_ACCEPT, Accept and cancel buttons
 * CANCEL_ACCEPT_FORM, wraps body and footer into a form element
 * CANCEL_ACCEPT_FORM_VALIDATION, performs validation checks to the form when submitting
 */
export enum BSDialogType {
    CLOSE,
    CANCEL_ACCEPT,
    CANCEL_ACCEPT_FORM,
    CANCEL_ACCEPT_FORM_VALIDATION
}

/**
 * Simple dialog based on Boostrap dialogs
 * Extend this class to include further functionality
 */
export class BSDialog {
    protected type: BSDialogType;
    private elem: JQuery<HTMLDivElement>;
    protected header: JQuery<HTMLElement>;
    protected body: JQuery<HTMLDivElement>;
    protected primaryButton: JQuery<HTMLButtonElement>;
    protected form: JQuery<HTMLFormElement>;
    protected acceptCb: ((s?: {[key:string]:unknown}) => void) | undefined;
    protected validationDiv: JQuery<HTMLDivElement>;
    private hasValidation: boolean;
    protected scope: ({[key: string]: unknown}) | undefined;

    constructor(id: string, type: BSDialogType, title = "Diàleg") {
        this.type = type;
        const hasForm = (type === BSDialogType.CANCEL_ACCEPT_FORM || type === BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);
        this.hasValidation = (type === BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);
        let formBegin = '';
        let formEnd = '';
        if (hasForm) {
            formBegin = `<form${this.hasValidation ? ' class="needs-validation" novalidate' : ''}>`;
            formEnd = '</form>';
        }
        let footerContent = `<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">${type === BSDialogType.CLOSE ? 'Tancar' : 'Cancel·lar'}</button>`;
        if (type !== BSDialogType.CLOSE) {
            footerContent += `<button type="${hasForm ? 'submit' : 'button'}" class="btn btn-sm btn-primary">Acceptar</button>`;
        }

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
                  ${formBegin}
                  <div class="modal-body" style="max-height:400px;overflow-y:auto;font-size:90%;">
                  </div>
                  <div class="modal-footer">
                    ${footerContent}
                  </div>
                  ${formEnd}
                </div>
                </div>`) as JQuery<HTMLDivElement>;

        this.body = this.elem.find('div.modal-body') as JQuery<HTMLDivElement>;
        this.header = this.elem.find('h5.modal-title') as JQuery<HTMLElement>;
        this.primaryButton = this.elem.find('button.btn.btn-primary') as JQuery<HTMLButtonElement>;
        this.form = this.elem.find('form') as JQuery<HTMLFormElement>;
        this.validationDiv = this.elem.find('div.alert.alert-danger') as JQuery<HTMLDivElement>;

        $('body').append(this.elem);
    }

    private resetDialog(): void {
        this.body.html('');
        this.primaryButton?.off();
        if (this.form) {
            this.form.off();
        }
        this.validationDiv.css('display', 'none');
        this.validationDiv.html('');
    }

    setBody(htmlElem: HTMLElement): void {
        this.resetDialog();
        const $htmlElem = $(htmlElem);
        this.validationDiv = $(`<div class="alert alert-danger" style="display:none;max-height:100px;overflow-y:auto;"></div>`);
        this.body.append(this.validationDiv);
        this.body.append($htmlElem);
        // Check if has primary button
        if (this.primaryButton) {
            if (this.form) {
                //Attach action to formElement because it is of submit type
                this.form.on('submit', (evt) => {
                    // Do validation
                    evt.preventDefault();
                    evt.stopPropagation();

                    if (this.hasValidation) {
                        this.form.addClass('was-validated');
                        // Needs validation
                        // First check userDefined validation
                        this.updateValues();
                        const error = this.customValidation();
                        console.log("Custom validation is ", error);
                        if (error && this.validationDiv!=null) {
                            this.validationDiv.css('display', '');
                            this.validationDiv.html(error);
                            const offset = this.validationDiv.offset();
                            offset && this.body.animate({
                                scrollTop: 0
                            });
                            return;
                        }
                        // Then build-in validation
                        if (this.form[0].checkValidity()) {
                            // close dialog
                            //@ts-ignore
                            this.elem.modal('hide');
                            // execute succesCb 
                            this.acceptCb && this.acceptCb(this.scope);
                        }
                    } else {
                        //No validation required
                        this.updateValues();
                        this.acceptCb && this.acceptCb(this.scope);
                    }
                });
            } else {
                //Directly attach action to primary button if not of submit type
                this.primaryButton.on('click', (evt) => {
                    evt.preventDefault();
                    this.acceptCb && this.acceptCb();
                    //@ts-ignore
                    this.elem.modal('hide');
                })
            }

        }
    }



    private setValues(scope: { [key: string]: unknown }) {
        this.scope = scope;
        const allBindable = this.body.find('input[id], textarea[id], select[id]');
        allBindable.each((i, elem) => {
            const idParts = (elem.getAttribute("id") || '').split("_");
            if (idParts.length < 2) {
                return;
            }
            const barPath = splitBar(idParts[idParts.length - 1]);
            //Seach the value in scope
            const value = getPathValue(barPath, scope);
            //TODO serialize the value and handle [0] syntax
            if (elem.nodeName === 'TEXTAREA') {
                (elem as HTMLTextAreaElement).value = value || '';
            } else {
                const inputElem = elem as HTMLInputElement;
                const t = (inputElem.getAttribute('type') || '').toLowerCase();
                const isCheckRadio = (t === 'radio' || t === 'checkbox');
                if (isCheckRadio) {
                    inputElem.checked = (value === 'true');
                } else {
                    inputElem.value = value || '';
                }
            }
        });
    }

    private updateValues() {
        if(this.scope==null) {
            return;
        }
        const allBindable = this.body.find('input[id], textarea[id], select[id]');
        allBindable.each((i, elem) => {
            const idParts = (elem.getAttribute("id") || '').split("_");
            if (idParts.length < 2) {
                return;
            }
            const barPath = splitBar(idParts[idParts.length - 1]);
            //Seach the parent bar in scope
            if (elem.nodeName === 'TEXTAREA') {
                const newValue = (elem as HTMLTextAreaElement).value || '';
                setPathValue(barPath, this.scope || {}, newValue);
            } else {
                const inputElem = elem as HTMLInputElement;
                const t = (inputElem.getAttribute('type') || '').toLowerCase();
                const isCheckRadio = (t === 'radio' || t === 'checkbox');
                if (isCheckRadio) {
                    setPathValue(barPath, this.scope || {}, inputElem.checked); 
                } else {
                    setPathValue(barPath, this.scope || {}, inputElem.value); 
                }
            }
        });
    }

    setBodyBindings(bodyHTML: string, scope: { [key: string]: unknown }) {
        const panel = createElement('div', {
            style: 'width:100%;padding:10px',
            html: bodyHTML
        });
        this.setBody(panel);
        console.log('bs-dialog recieved the scope', scope);
        this.setValues(scope);
    }

    customValidation(): string | null {
        //Overide me! Return the error/s description
        return null;
    }

    setTitle(title: string): void {
        this.header.html(title);
    }

    show(acceptCb?: (s?: {[key:string]:unknown}) => void) {
        this.form.removeClass('was-validated');
        //@ts-ignore
        this.elem.modal('show');
        //It is strange, but it rquires a timeout!!!
        window.setTimeout(()=>this.body.scrollTop(0), 400);
        this.acceptCb = acceptCb;
    }
}