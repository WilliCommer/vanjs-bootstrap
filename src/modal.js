import van  from 'vanjs-core';
import {Modal as BsModal} from 'bootstrap';

const {div, button, h5} = van.tags;

/**
 * Bootstrap modal Components. Require 'bootstrap.js'
 * 
 * usage: import modal from 'vanjs-bootstrap/modal'
 * 
 * @module vanjs-bootstrap/modal
 */

/**
 * function ModalFrame(args = {})
 *
 * Create a Bootstrap modal frame DOM structure.
 *
 * @param {object} [args={}] - modal configuration
 * @property {string} [id] - modal DOM id
 * @property {string} [class] - additional CSS class applied to the modal dialog
 * @property {string|HTMLElement|Array<HTMLElement>} [header] - modal header content. A simple string value become a title element
 * @property {string|HTMLElement|Array<HTMLElement>} [body] - modal body content
 * @property {string|HTMLElement|Array<HTMLElement>} [footer] - modal footer content
 * @property {boolean} [close=true] - show the close button in the header
 * @property {boolean} [centered=true] - center the dialog vertically
 * @property {boolean} [scrollable=false] - make the dialog scrollable
 * @property {{left:number, top:number}} [position] - custom position for an anchored modal
 * @property {string} [width] - custom dialog width such as "20em"
 * @property {string} [color] - Bootstrap contextual color class for the modal content
 * @property {string} [dialogstyle=''] - inline styles applied to the modal dialog element
 * @property {string} [bodystyle=''] - inline styles applied to the modal body element
 * @returns {HTMLElement}
 */

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

    if(typeof header === "string") {
        let text = h5({class: "modal-title"}, header);
        header = div({class:"modal-header"}, text, (close ? CloseButton : null));
    }
    if (!header && close) {
        header = div({class:"modal-header"}, CloseButton);
    }

    return (
        div({class: () => "modal", id, "aria-hidden": "true", tabindex:"-1", ...props},
        div({class: dialogClass, style: dialogstyle},
            div({class: contentClass},
                header,
                (body && div({class: "modal-body", style: bodystyle}, body)),
                (footer && div({class: "modal-footer"}, footer)),
            )
        )
    )
    )
}


/**
 * function Modal(args = {}, options)
 *
 * Create a Bootstrap modal controller object.
 * The returned object contains the modal DOM and methods to open, close, show, hide and dispose it.
 *
 * @param {object} [args={}] - modal frame options passed to ModalFrame
 * @param {object} [options] - Bootstrap modal initialization options
 * @property {HTMLElement} dom - the current modal DOM element
 * @property {boolean} isOpen - current open state
 * @property {*} modalResult - last result passed to close(result)
 * @property {function} open(left, top) - open the modal at an optional position
 * @property {function} close(result) - close the modal with an optional result value
 * @property {function} asyncOpen(left, top) - open the modal and resolve when it closes
 * @property {function} dispose() - remove the modal from the DOM
 * @property {function} hide(dispose) - hide the modal
 * @property {function} show() - show the modal
 * @property {function} onShown(event) - event handler for shown.bs.modal
 * @property {function} onHidden(event) - event handler for hidden.bs.modal
 * @returns {object}
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



/**
 * Create the default close button used in a modal header.
 * <br>&lt;button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" /&gt;
 * 
 * @param {object} [props={}] - button attributes
 * @param {string} [props.class] - CSS class, defaults to `btn-close`
 * @param {string|HTMLElement|Array<HTMLElement>} [children] - optional content rendered inside the button
 * @returns {HTMLElement} close button element
 */
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

/**
 * Create a popup/dropdown menu frame with a Bootstrap dropdown-menu layout.
 *
 * @param {...(string|HTMLElement|object|Array<HTMLElement>)} children - menu items or content
 * @returns {HTMLElement} dropdown-style menu container
 */
export function PopupMenuFrame (...children) {
    const {ul} = van.tags;
    return ul({
        class: "dropdown-menu", 
        style: "display: table; z-index: 0; position: inherit; min-width: 10rem; max-height: 400px; overflow-y: auto;"
        },
        ...children.map( item => item instanceof HTMLElement ? item : MenuItem(item))
    )
}

/**
 * Create a Bootstrap dropdown menu.
 *
 * @param {...(string|HTMLElement|object|Array<HTMLElement>)} children - menu items or raw item configs
 * @returns {HTMLElement} unordered list element styled as a dropdown menu
 */
export function DropdownMenu (...children) {
    const {ul} = van.tags;
    return ul({class: "dropdown-menu"},
        ...children.map( item => item instanceof HTMLElement ? item : MenuItem(item))
    )
}

/**
 * Create a single menu entry for a dropdown or popup menu.
 * 
 * &lt;li&gt;&lt;button class="dropdown-item" role="button" type="button"&gt;label&lt;/button&gt;&lt;/li&gt;
 *
 * @param {object} props - menu item configuration
 * @param {string|HTMLElement} [props.label] - visible content
 * @param {boolean} [props.header] - render as a dropdown header
 * @param {boolean} [props.divider] - render as a divider &lt;li&gt;&lt;hr class="dropdown-divider"&gt;&lt;/li&gt;
 * @param {boolean} [props.text] - render text-only item
 * @param {boolean} [props.active] - mark item as active
 * @param {boolean} [props.disabled] - disable item
 * @param {string} [props.class] - additional CSS class
 * @param {string} [props.tag] - custom tag name for the item element
 * @param {object} [props.rest] - additional attributes passed to the underlying element
 * @returns {HTMLElement} menu item element
 */
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
    
    // console.log('tag', tag, button)
    // if( tag === button ) 
        rest.type = 'button';
    return li(tag({class: classf("dropdown-item"), role:"button", ...rest}, label));
}



/**
 * Create a popup menu modal that closes automatically when an item is clicked.
 *
 * @param {...(string|HTMLElement|object)} items - menu items or configs passed to `PopupMenuFrame`
 * @returns {{dom: HTMLElement, isOpen: boolean, modalResult: any, open: function, close: function, asyncOpen: function, dispose: function, hide: function, show: function}} popup menu controller
 */
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

/**
 * Create a context menu that opens at the mouse position of the triggering event.
 *
 * @param {...(string|HTMLElement|object)} items - menu items or configs passed to `PopupMenuFrame`
 * @returns {{dom: HTMLElement, isOpen: boolean, modalResult: any, open: function, close: function, asyncOpen: function, dispose: function, hide: function, show: function}} context menu controller
 */
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
