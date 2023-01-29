import { BSDialog, BSDialogType } from "../bs-dialog";

class MsgDialog extends BSDialog {
    constructor(id: string) {
        super(id, BSDialogType.CLOSE, '');
    }
}

// Cache
const _chachedDlg: {[key:string]: BSDialog} = {};

export function getCachedMsgDialog(id: string, title: string): BSDialog {
    let dlg = _chachedDlg[id];
    if(!dlg) {
        dlg = new MsgDialog(id);
        _chachedDlg[id] = dlg;
    }
    dlg.setTitle(title);
    return dlg;
}