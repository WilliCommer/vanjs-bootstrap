import van  from 'vanjs-core';
import {Modal as BsModal} from 'bootstrap';

const {div, button,h5} = van.tags;

export function ModalFrame (args = {}) {

    var {
        id, class: modalClass,
        header, body, footer, 
        close = true,
        centered = true,
        scrollable,
        position,
        // width = '40em',
        width,
        // bodyProps,
        color,
        dialogstyle = "",
        bodystyle = "",
        ...props
    } = args;

    if (width) dialogstyle += `width: ${width};`;
    if (width) dialogstyle += `max-width: inherit;`;
    if (position) {
        dialogstyle += `margin-left: ${position.left}px; margin-top: ${position.top}px;`;
        centered = false;
    }

    const dialogClass = "modal-dialog" 
      + (centered ? " modal-dialog-centered" : "")
      + (scrollable ? " modal-dialog-scrollable" : "")
      + (modalClass ? " "+modalClass : "");

    const contentClass = "modal-content" + (color ? " " + color : "");

    if((typeof header === "string")) header = h5({class: "modal-title"}, header);

    return (
        div({class: () => "modal", id, "aria-hidden": "true", tabindex:"-1", ...props},
        div({class: dialogClass, style: dialogstyle},
            div({class: contentClass},
                ((header || close)
                  ? (div({class:"modal-header"},
                    header, (close ? CloseButton : null)))
                  : null
                ),
                (body && div({class: "modal-body", style: bodystyle}, body)),
                (footer && div({class: "modal-footer"}, footer)),
            )
        )
    )
    )
}


/*

## Options

| Name | Type |	Default | Description |
| ---  | ---  | ---     | ---         | 
| backdrop | boolean, 'static' | true | Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn’t close the modal when clicked. |
| focus | boolean | true | Puts the focus on the modal when initialized. |
| keyboard | boolean | true | Closes the modal when escape key is pressed. |
| dispose | boolean | true | Dispose dialog on hide |


*/

export function Modal (args = {}, options) {

    var _bsm;
    var disposeOnHide = options?.dispose ?? true;
    var skipdispose;
    var self = {
        dom:            null,
        isOpen:         false,    
        modalResult:    undefined,  
        
        open (left,top) {
            self.modalResult = undefined;
            if(left != undefined && top != undefined) {
                args = {...args, position: {left,top}}
            }
            self.bsm.show();
        },

        close (result) {
            self.modalResult = result;
            self.bsm.hide();
        },

        async asyncOpen (left,top) {
            return new Promise( (resolve) => {
                self.open(left,top);
                self.dom.addEventListener('hidden.bs.modal', ()=>resolve(self.modalResult));
            });
        },
    
        get bsm() {
            if(!_bsm) {
                self.dom = ModalFrame(args);
                _bsm = new BsModal(self.dom, options);
                self.dom.addEventListener('shown.bs.modal', self.onShown)
                self.dom.addEventListener('hidden.bs.modal', self.onHidden)
            }
            return _bsm;
        },

        dispose () {
            if(_bsm) {
                _bsm.dispose();
                _bsm = null;
            }
            if(self.dom) {
                self.dom.remove();
                self.dom = null;
            }
        },

        hide (dispose) { 
            skipdispose = dispose;
            _bsm.hide() 
        },
        show () { _bsm.show() },

        onShown (event) {
            self.isOpen = true;
        },
        onHidden (event) {
            self.isOpen = false;
            if(skipdispose) {
                skipdispose = false
            } else {
                if(disposeOnHide) self.dispose();
            }
        },

//         show () { return self.bsm.show() },

    }

    return self;
}



export function CloseButton({class: clas} = {}, children) { 
    return button({
        type:"button", 
        class: clas ? clas : "btn-close", 
        "data-bs-dismiss": "modal", 
        "aria-label":"Close"
    },
    children
    ) 
};



export function PopupMenuFrame (...children) {
    const {ul} = van.tags;
    return ul({
        class: "dropdown-menu", 
        style: "display: table; z-index: 0; position: inherit; min-width: 10rem; max-height: 400px; overflow-y: auto;"
        },
        ...children.map( item => item instanceof HTMLElement ? item : MenuItem(item))
    )
}

export function DropdownMenu (...children) {
    const {ul} = van.tags;
    return ul({class: "dropdown-menu"},
        ...children.map( item => item instanceof HTMLElement ? item : MenuItem(item))
    )
}



export function MenuItem (props)  {
    const {li,span,hr,button} = van.tags;
    const noclick = event => {event.preventDefault(); event.stopPropagation();}; 
    var {label, header, divider, text, active, disabled, class: clas, tag, ...rest} = props;
    var classf = (cl) => () => {
        let res = cl;
        if(van.val(active)) res += ' active';
        if(van.val(disabled)) res += ' disabled';
        if(van.val(clas)) res += ' ' + van.val(clas);
        return res;
    }
    if(header) {
        tag = tag ? van.tags[tag] : span;
        return li(tag({class: classf("dropdown-header fw-bold border-bottom"), onclick: noclick, ...rest}, label));
    }
    if(divider) {
        tag = tag ? van.tags[tag] : hr;
        return li(tag({class: classf("dropdown-divider"), onclick: noclick, ...rest}, label));
    }
    if(text) {
        tag = tag ? van.tags[tag] : span;
        return li(tag({class: classf("dropdown-item-text"), onclick: noclick, ...rest}, label));
    }
    tag = tag ? van.tags[tag] : button;
    return li(tag({class: classf("dropdown-item"), role:"button", ...rest}, label));
}



export function PopupMenu (...items) {
    const menu = PopupMenuFrame(...items);
    const modal = Modal({
        close: false,               // don't show any header
        dialogstyle: "display: table; padding: 0;",
        bodystyle: "padding: 0;",
        body: menu,
    });
    menu.addEventListener('click', ()=>modal.close());
    return modal;
}


export function ContextMenu (...items) {
    const menu = PopupMenuFrame(...items);
    const modal = Modal({
        close: false,               // don't show any header
        dialogstyle: "display: table; padding: 0;",
        bodystyle: "padding: 0;",
        body: menu,
    });
    menu.addEventListener('click', ()=>modal.close());
    const open1 = modal.open;
    modal.open = event => {
        event.preventDefault();
        event.stopPropagation();
        open1(event.clientX, event.clientY);
    }
    return modal;
}

