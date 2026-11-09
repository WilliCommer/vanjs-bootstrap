/** @module form-controls **/

import van from 'vanjs-core';
import selectOptions from './select-options';
// import {selectOptions} from 'vanjs-bootstrap';

const {button, div, input, label, textarea, select} = van.tags;
const randId = ()=> 'id_' + Math.random().toString(36).substring(2, 9);
const labelableTypes = ["button", "checkbox", "color", "combobox", "date", "datetime-local", 
  "email", "file", "image", "month", "number", "password", "radio",
  "range", "reset", "search", "submit", "select","switch", "tel", "text", "textarea", "time", "url", 
  "week" 
];


/**
 * Registry of built-in form control types.
 *
 * This map is used by FormGroup and similar helpers to resolve a control name such as
 * `text`, `select`, or `radioselect` to the matching factory function.
 *
 * @type {Map<string, function>}
 * @property {'text'} Input - normal text input
 * @property {'textarea'} Textarea - multi-line text input
 * @property {'select'} SelectInput - select box with `options`
 * @property {'radioselect'} RadioSelectInput - radio-button group
 * @property {'checkbox'} FormCheckInput - checkbox form control
 * @property {'radio'} FormCheckInput - radio form control
 * @property {'switch'} FormCheckInput - switch form control
 * @property {'combobox'} ComboboxInput - combobox-like selection input
 */
export var typeMap = new Map();

typeMap.set( 'text',            Input);
typeMap.set( 'textarea',        Textarea);
typeMap.set( 'select',          SelectInput);
typeMap.set( 'radioselect',     RadioSelectInput);
typeMap.set( 'checkbox',        FormCheckInput);
typeMap.set( 'radio',           FormCheckInput);
typeMap.set( 'switch',          FormCheckInput);
// typeMap.set( 'combobox',        ComboboxInput);


/**
 * Create a form label
 * @param {object} props
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} col - number for the col-form-label class 
 * @property {object} ...props other props
 * @returns {HTMLElement} an label element
 */

export function FormLabel({class: clas, bsSize, col, tag, ...props}, children) {
    const cl = () => {
        let res = 'form-label';
        if(van.val(col)) {
            res = 'col-form-label';
            if(van.val(bsSize)) {
                res += ' col-'+van.val(bsSize)+'-'+van.val(col)+' col-form-label-'+van.val(bsSize);
            } else {
                res += ' col-'+van.val(col);
            }
        } else {
            if(van.val(bsSize)) {
                res += ' col-form-label-'+van.val(bsSize);
            }
        }
        if(van.val(clas)) res += ' ' + van.val(clas);
        return res;
    }
    return van.tags[tag || 'label']({class: cl, ...props}, children);
}


/**
 * Create a input control
 * @param {object} props
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} disabled
 * @property {boolean} isvalid
 * @property {function} oninput - oninput(event) called on value changed
 * <br>event.target.value is the value
 * @property {object} ...props other props
 * @returns {HTMLElement} an input control element
 */

export function Input({class: clas, isvalid, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-control';
        if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
        if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
        return res;
    }
    if(!props.autocomplete) props.autocomplete = 'off';
    if(!props.id) props.id = randId();
    return input({class: cl, ...props});
}


/**
 * Create a textarea input control
 * @param {object} props
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} disabled
 * @property {boolean} isvalid
 * @property {function} oninput - oninput(event) called on value changed
 * <br>event.target.value is the text
 * @property {object} ...props other props
 * @returns {HTMLElement} an textarea input control element
 */

export function Textarea({class: clas, isvalid, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-control';
        if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
        if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
        return res;
    }
    if(!props.autocomplete) props.autocomplete = 'off';
    if(!props.id) props.id = randId();
    return textarea({class: cl, ...props});
}



/**
 * Create a select input control
 * @param {object} props
 * @property {SelectOption} options
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} disabled
 * @property {boolean} isvalid
 * @property {function} oninput - oninput(event) called on value changed
 * <br>event.target.value is the clicked option
 * @property {object} ...props other props
 * @returns {HTMLElement} an select input control element
 */

export function SelectInput ({class: clas, isvalid, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-select';
        if(van.val(bsSize)) res += ' form-select-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
        if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
        return res;
    }
    if(!props.autocomplete) props.autocomplete = 'off';
    if(!props.id) props.id = randId();
    let { options = [],  ...rest } = props;
    if (typeof options !== 'function') {
        options = selectOptions(options, true, props.value);
    } else {
        options = options()
    }
    return select({class: cl, ...rest}, options);
}


/**
 * Create a group of radio buttons as input control
 * @param {object} props
 * @property {SelectOption} options
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} inline
 * @property {boolean} disabled
 * @property {boolean} isvalid
 * @property {function} oninput - oninput(event) called on value changed
 * <br>event.target.value is the clicked option
 * @property {object} ...props other props
 * @returns {HTMLElement} an input control element
 */

export function RadioSelectInput (args) {

    var {
        options, class: clas, bsSize, inline, id,
        oninput, name, value, disabled, isvalid,
        ...props
    } = args;

    name = name || randId();
    id = id || 'rgi_' + name
    options = selectOptions(options);
    disabled = disabled ? {disabled: true} : {};

    const iteminput = ev => {
        let value = ev.target.value;
        oninput && oninput({target: { 
            name, 
            value, 
            type:   'radiogroup'
        }});
    }

    const items = options.map( (option, index) => {
        let itemId = id+'_'+index;
        return div({
            class: 'form-check' + (inline ? ' form-check-inline' : '')
            },
            input({
                class:      'form-check-input',
                type:       'radio',
                id:         itemId,
                value:      option.value,
                name,
                checked:    value === option.value,
                oninput:    iteminput,
                ...disabled,
            }),
            label({ class: 'form-check-label', for: itemId }, option.children)
        );
    });

    return div({
        id,
        role: 'radiogroup',
        'aria-labelledby': id,
        class: () => {
            let res = 'form-control';
            if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
            if(van.val(clas)) res += ' ' + van.val(clas);
            if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
            return res;
            },
            ...disabled,
            ...props
        },
        items,
    )
}


/**
 * Create a checkbox input control
 * @param {object} props
 * @property {string} label 
 * @property {string} type 'checkbox' | 'radio' | 'switch' 
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} disabled
 * @property {boolean} reverse - swap label left and control right
 * @property {boolean} isvalid
 * @property {function} oninput - oninput(event) called on value changed
 * @property {object} ...props other props
 * @returns {HTMLElement} an checkbox switch or radio control
 */

export function FormCheckInput ({label: clabel, type, class: clas, style, bsSize, reverse, id, value, isvalid, ...props}, ...children) {

    id = id || randId();

    var isSwitch = type === 'switch';

    if(isSwitch) type = 'checkbox';

    const oninput = ev => {
        ev.stopPropagation();
        var {checked, name, type} = ev.target;
        checked = !!checked;
        props.oninput({
            target: {
                value: checked,
                checked, name, type
            }
        });
    }

    const Label = () => {
        if (!clabel) {
            return null;
        }
        return label({class: 'form-check-label', for: id}, clabel);
    }

    return div({
        class: () => {
            let res = 'form-check';
            if(isSwitch) res += ' form-switch';
            if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
            if(van.val(reverse)) res += ' form-check-reverse';
            if(van.val(clas)) res += ' ' + van.val(clas);
            return res;
        },
        style,
        },
        input({
            ...props,
            class: () => {
                let res = 'form-check-input';
                if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
                return res;
            },
            id,
            type,
            checked: value || false,
            oninput,
            role: isSwitch ? 'switch' : undefined,
            },
        ),
        Label,
        ...children
    )
}


/**
 * Create a switch control
 * @param {object} props
 * @property {string} label 
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} disabled
 * @property {boolean} reverse - swap label left and control right
 * @property {boolean} isvalid
 * @property {object} ...props other props
 * @returns {HTMLElement} an switch control
 */
export function SwitchInput(props) {return FormCheckInput({...props, type: 'switch'});}

/**
 * Create a checkbox input control
 * @param {object} props
 * @property {string} label 
 * @property {string} type 'checkbox' | 'radio' | 'switch' 
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} disabled
 * @property {boolean} reverse - swap label left and control right
 * @property {boolean} isvalid
 * @property {object} ...props other props
 * @returns {HTMLElement} an checkbox control
 */
export function CheckboxInput(props) {return FormCheckInput({...props, type: 'checkbox'});}

/**
 * Create a radio input control
 * @param {object} props
 * @property {string} label 
 * @property {string} bsSize 
 * @property {string} class 
 * @property {string} style
 * @property {string} id 
 * @property {string} value 
 * @property {boolean} disabled
 * @property {boolean} reverse - swap label left and control right
 * @property {boolean} isvalid
 * @property {object} ...props other props
 * @returns {HTMLElement} an radio control
 */

export function RadioInput(props) {return FormCheckInput({...props, type: 'radio'});}





/**
 * Create a form control
 * @param {object} props
 * @param {object} props.type - input control type
 * @param {object} props.input - optional input element
 * @param {string} props.class 
 * @returns {HTMLElement} div element
 */

export function FormControl({ name, input, class: inputClass, bsSize, id, ...props}) {
    if(!id) id = randId();
    const domInput = input ?? typeMap.get(props.type) ?? Input;
    return domInput({bsSize, name, id, class: inputClass, ...props});
}



/**
 * Create a form group, a formated combination of label ind input
 * @param {object} props
 * @param {array} ...children
 * @property {label} label - text for the label 
 * @property {object} input - input element
 * @property {string} style 
 * @property {string} class 
 * @property {string} inputClass 
 * @property {string} cols
 * @property {string} col
 * @property {boolean} separated
 * @property {object} ...inputProps other props
 * @returns {HTMLElement} div element
 */


export function FormGroup({ name, label, input, class: clas, inputClass, bsSize, cols, col, id, separated, ...props}, ...children) {
    const g_id = id ?? randId();
    const i_id = g_id + '-i';
    const l_id = g_id + '-l';
    let domInput = input ?? typeMap.get(props.type) ?? Input;
    const ischeck = ['checkbox','radio','switch'].includes(props.type);
    const isLabelable = !input && (!props.type || labelableTypes.includes(props.type));
    const forId = isLabelable ? {'for': i_id} : {tag: 'span'};
    const byId = isLabelable ? {} : {'aria-labelledby': l_id};


    let inputEl, labelEl;
    if(ischeck) {
        if(separated) {
            labelEl = FormLabel({bsSize, ...forId}, label);
            inputClass = (inputClass ?? '') + ' mt-2';
            inputEl = domInput({bsSize, name, id: i_id, class: inputClass, ...props}, ...children);
        } else {
            labelEl = null;
            inputEl = domInput({bsSize, name, id: i_id, class: inputClass, label, ...props}, ...children);
        }
        children = [];
    } else {
        labelEl = label ? FormLabel({id: l_id, bsSize, ...forId}, label) : null;
        inputEl = domInput({bsSize, name, id: i_id, class: inputClass, ...byId, ...props});
    }

    if(cols) {
        let [col_l, col_r] = cols.split(' ');
        col_r = col_r || 12 - Number(col_l);
        var res = [];
        if(labelEl) 
            res.push(FormLabel({bsSize, col: col_l, id: l_id, ...forId}, label));
        else
            res.push(div({class: col_l ? `col-${col_l}` : 'col'}));
        res.push(div({class: col_r ? `col-${col_r}` : 'col'}, inputEl, ...children));
        return res;
    }

    if(col) {
        return div({class: col},
            labelEl,
            inputEl,
            ...children
        );
    }

    const divProps = {id: g_id}
    if(clas) divProps.class = van.val(clas);
    return div(divProps,
        labelEl,
        inputEl,
        ...children
    );
}

/**
 * function FormController({values})
 *
 * Create a simple controller to collect and synchronize form values.
 * The controller stores the current values in `self.values`, emits change events,
 * and provides helper methods for generated input controls.
 *
 * @param {object} [params={}] - controller configuration
 * @param {object} [params.values] - initial form values object
 * @property {object} values - key/value object with the current input values
 * @property {function} onChange(func) - subscribe to value changes
 * @property {function} offChange(func) - unsubscribe from value changes
 * @property {function} emitChange(name, value, event) - notify all listeners
 * @property {function} handleInput(event) - default input handler for form controls
 * @property {function} args(args) - return the basic {@link FormGroup} arguments `{name, value, oninput}` <br/>
 * The result will merged with values in parameter `args`<br/>
 * `args` should have `name` else the name will get something like `v3`<br/>
 * @returns {object}
 */
export function FormController ({values} = {}) {
    const isVanState = v => van.val(v) !== v;
    var listeners = [];
    var ccount = 1;


    var self = {
        /** Key/Value object with mirrored form control values */
        values: {...(values ?? {})},

        /**
         * subscribe value change events
         * @param {callback} func - callback function
         * @return {function} the undescribe function
        */
        onChange (func) { listeners.push(func); return () => self.offChange(func); },

        /**
         * unsubscribe change event
         * @param {callback} func - callback function
        */
        offChange (func) { listeners = listeners.filter( f => f !== func) },

        /**
         * notify all subscribers
         * @param {string} name - variable name
         * @param {*} value - the new vale
         * @param {EVENT} event
        */
        emitChange (name, value, event) { listeners.forEach( f => f(name, value, event)) },

        /**
         * the oninput handler for all form controls
         * @param {EVENT} event
        */
        handleInput (event) {
            let {name, value} = event.target;
            if (isVanState(self.values[name])) {
                self.values[name].val = value;
            } else {
                self.values[name] = value;
            }
            // console.log('handleInput',name,value)
            // console.log('handleInput', self.values)
            self.emitChange( name, value, event );
        },


        /**
         * return the basic {@link FormGroup} arguments {name, value, oninput}<br/>
         * The result will merged with values in parameter `args`<br/>
         * `args` should have `name` else the name will get something like `v3`<br/>
         * @param {object} args - initial args `{name, value}`
         * @return {object} {name, value, oninput}
        */
        args (args = {}) {
            let {name = `v${ccount++}`, value, oninput = self.handleInput} = args;
            value = value ?? self.values[name] ?? '';
            self.values[name] = value;
            return {name, value, oninput}
        },
    }
    return self;
}


/**
 * function FormBuilder({dom, values, rowClass="", formClass="", cols, autoRow, bsSize, id, onChange}={})
 *
 * A {@link FormController} with convenient features for creating forms quickly.
 * It creates rows, adds form groups, keeps the DOM tree, manages validation,
 * and updates values from input events.
 *
 * @example
 * const fb = FormBuilder({
 *   formClass: 'row g-2 m-2 p-2',
 *   autoRow: true,
 * });
 * fb.add({ name: 'name', label: 'Name', type: 'text' });
 * fb.add({ name: 'pw', label: 'Password', type: 'password' });
 *
 * @param {object} [params={}] - controller configuration
 * @param {object} [params.values] - initial form values object
 * @param {HtmlElemennt} [params.dom] - container for the form groups to be inserted. If omitted a `<form class=formClass />` is created.
 * @param {string} [params.formClass] - class for the generated form tag
 * @param {string} [params.rowClass] - class for the generated rows if autoRow is true
 * @param {string} [params.cols] - default cols attribute for addRow
 * @param {boolean} [params.autoRow] - if true, will add a new row if the columns in a row exceeds 12
 * @param {boolean} [params.inline] - create a Bootstrap Input Group
 * @param {string} [params.bsSize] - default Bootstrap size for inserted components. '' or 'sm' or 'lg'
 * @param {string} [params.id] - HTML id of the form. Random id if omitted. It is the prefix for label id (formId-groupId-l) and input id (formId-groupId-i)
 * @param {function} [params.onChange] - optional callback function(name,value,event) for input change
 * @property {HTMLElement} dom - form DOM container
 * @property {object} values - current values from the controller
 * @property {string} rowClass - default CSS class for rows
 * @property {string} formClass - CSS class applied to the form element
 * @property {string} cols - default columns setting for inputs
 * @property {boolean} autoRow - automatically create rows when columns exceed 12
 * @property {string} bsSize - default Bootstrap size for children controls
 * @property {string} id - form id prefix used for generated input ids
 * @property {function} onChange(func) - subscribe to changed values
 * @property {function} add(args) - add a form group to the current or new row. `add(args, ...children)`
 * @property {function} addGroup(args) - add a prepared form group directly. `addGroup(args, ...children)`
 * @property {function} addRow(arg) - create a new row or end the current one with `null`
 * @property {function} addChildren(...children) - add HTMLElements to dom
 * @property {function} getFormValid() - return true if all validation checks pass
 * @property {function} setValues(values) - update a set of field values in the form
 * @property {function} groupIdByName(name) - return generated group id
 * @property {function} inputIdByName(name) - return generated control id
 * @property {function} labelIdByName(name) - return generated label id
 * @returns {object}
 */
export function FormBuilder ({dom, values, rowClass="", formClass="", cols, autoRow, inline, bsSize, id, onChange}={}) {
    
    const toInt = v => {let n=Number(v); return isNaN(n) ? 0 :n};
    
    const splitCols = c => {let [l, r] = c.split(' '); l=toInt(l); r=toInt(r);
       r = r ? r : 12-l; 
       return {l,r,t:l+r,s:l+' '+r}
    };

    var fc = FormController({values});
    onChange && fc.onChange(onChange);

    const inputGroup = () => {
        let cl = 'input-group'
        if(bsSize === 'sm') cl += ' input-group-sm'
        if(bsSize === 'lg') cl += ' input-group-lg'
        if(rowClass) cl += ' ' + rowClass
        return div({ class: cl })
    }

    if(!dom) dom = van.tags.form(formClass ? {class: formClass} : {} )

    var self = {
        ...fc,
        dom,
        row: null,
        rowClass,
        cols,
        autoRow,
        colCount: 0,
        id: id ?? randId(),

        valid: {},
        onvalidate: {},
        getFormValid: () => Object.keys(self.valid).every( k => self.valid[k].val ),

        add (props = {}, ...children) {
            let {name, value, oninput, cols, onvalidate, ...rest} = props;
            if(value === undefined && name) value = self.values[name];
            let args = {...rest, ...fc.args({name, value, oninput}) };
            args.id = args.id || self.id + '-' + args.name;
            if(inline && !props.id) args.id += '-i';
            if(bsSize && args.bsSize === undefined) args.bsSize = bsSize;
            args.cols = cols || self.cols || '';
            if(self.autoRow && !inline) {
                cols = splitCols(args.cols);
                if(!self.row) { self.addRow(); self.colCount = 0; } 
                self.colCount += cols.t;
                args.cols = cols.s;
                if(self.colCount > 12) {
                    self.addRow();
                    self.colCount = cols.t;
                }
            }

            if(onvalidate) {
                self.onvalidate[args.name] = onvalidate;
                self.valid[args.name] = van.state(onvalidate(self.values[args.name]));
                args.isvalid = self.valid[args.name];
            }

            if(inline) {
                if(!self.row) self.addRow();
                delete args.cols;
                const ischeck = ['checkbox','radio','switch'].includes(props.type);
                if(ischeck) {
                    self.addChildren(
                        div({ class: "input-group-text" }, FormControl(args)),
                        ...children
                    )
                    return self;
                }
                if(props.type === 'combobox') args.inline = true;
                if(args.label) {
                    const label = args.label;
                    delete args.label;
                    self.addChildren(
                        div({ class: "input-group-text" }, label), 
                        FormControl(args),
                         ...children
                    )
                    return self;
                }
                self.addChildren(
                    FormControl(args),
                    ...children
                )
                return self;
            }
    
            self.addChildren(FormGroup(args,...children));
            return self;
        },

        addRow (arg) {
            self.colCount = 0;
            if(arg === null) {
                self.row = null;
                return self;
            }
            if(typeof arg === 'string') {
                self.row = div({class: arg})
                van.add(self.dom, self.row);
                return self;
            }
            if(!arg && inline) {
                self.row = inputGroup()
                van.add(self.dom, self.row);
                return self;
            }
            if(!arg) {
                self.row = div({class: "row" + (self.rowClass ? ' '+self.rowClass : '')});
                van.add(self.dom, self.row);
                return self;
            }
            self.row = arg;
            van.add(self.dom, self.row);
            return self;
        },
        
        addChildren(...children) {
            van.add(self.row ?? self.dom, ...children);
            return self;
        },

        groupIdByName( name ) { return self.id + '-' + name; },
        inputIdByName( name ) { return self.id + '-' + name + '-i'; },
        labelIdByName( name ) { return self.id + '-' + name + '-l'; },
        
        getInputElement (name) {
            const id = self.id + '-' + name + '-i';
            var el;
            try { el = self.dom.querySelectorAll('#'+id)[0]; } catch {};
            if(!el) el = document?.getElementById(id);
            // console.log('getInputElement("'+id+'")', el)
            return el;
        },

        setValuesImmediately (values) {
            for (const [key, value] of Object.entries(values)) {
                // console.log(`${key}: ${value}`);
                self.values[key] = value;
                if(self.onvalidate[key]) self.valid[key].val = self.onvalidate[key](value);
                let el = self.getInputElement(key);
                if (el) {
                    if(el.type === 'checkbox') {
                        el.checked = !!value;
                    }
                    else {
                        el.value = value;
                    }
                    if(self.onvalidate[key]) 
                        setElementValid(el, self.valid[key].val);
                }
            }
        },

        setValues (values) {
            setTimeout( ()=>self.setValuesImmediately(values), 80 );
        },
    }

    self.onChange((name,value) => {
        if(self.onvalidate[name]) self.valid[name].val = self.onvalidate[name](value);
    });

    return self;
}




/**
 * Create a button control
 * @param {object} props
 * @param {string} props.bsSize - Bootstrap size 'sm', 'md', 'lg'
 * @param {string} props.class - additional class
 * @param {string} props.style - additional style
 * @param {string} props.id 
 * @param {string} props.color - 'secondary' | 'primary' | 'blue' | ..
 * @param {boolean} props.disabled
 * @param {boolean} props.outline
 * @param {boolean} props.dropdown
 * @param {function} props.onclick - onclick(event) called on click
 * @param {object} ...props other props
 * @param {object} children
 * @returns {HTMLElement} a button element
 */

export function Button ({bsSize, class: clas, color='secondary', outline, dropdown, type='button', ...props}, children) {
    const cl = () => {
        let res = 'btn';
        if(van.val(color)) 
            if(van.val(outline)) res += ' btn-outline-'+ van.val(color);
            else res += ' btn-'+ van.val(color);
        if(van.val(bsSize)) res += ' btn-' + van.val(bsSize);
        if(van.val(dropdown)) res += " dropdown-toggle";
        if(van.val(clas)) res += ' ' + van.val(clas);
        return res;
    }
    if(van.val(dropdown)) props["data-bs-toggle"] = "dropdown"; 

    return button({type, class:  cl, ...props}, children);
}

// this tool switch element class 'is_valid' / 'is_invalid'
export function setElementValid(element, isValid) {
    if(!element) return;
    element.classList.toggle('is_valid', isValid);
    element.classList.toggle('is_invalid', !isValid);
}
    
