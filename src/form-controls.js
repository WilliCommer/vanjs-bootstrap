import van from 'vanjs-core';
import selectOptions from './select-options';
// import {selectOptions} from 'vanjs-bootstrap';

const {button, div, input, label, textarea, select} = van.tags;


export var typeMap = new Map();

typeMap.set( 'text',            Input);
typeMap.set( 'textarea',        Textarea);
typeMap.set( 'select',          SelectInput);
typeMap.set( 'radioselect',     RadioSelectInput);
typeMap.set( 'checkbox',        FormCheckInput);
typeMap.set( 'radio',           FormCheckInput);
typeMap.set( 'switch',          FormCheckInput);
typeMap.set( 'combobox',        ComboboxInput);


export function FormLabel({class: clas, bsSize, col, ...props}, children) {
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
    return label({class: cl, ...props}, children);
}


export function Input({class: clas, isvalid, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-control';
        if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
        if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
        return res;
    }
    return input({class: cl, ...props});
}


export function Textarea({class: clas, isvalid, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-control';
        if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
        if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
        return res;
    }
    return textarea({class: cl, ...props});
}



export function SelectInput ({class: clas, isvalid, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-select';
        if(van.val(bsSize)) res += ' form-select-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
        if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
        return res;
    }

    let { options = [],  ...rest } = props;
    if (typeof options !== 'function') {
        options = selectOptions(options, true, props.value);
    } else {
        options = options()
    }
    return select({class: cl, ...rest}, options);
}



export function RadioSelectInput (args) {

    var {
        options, class: clas, bsSize, inline, id,
        oninput, name, value, disabled, isvalid,
        ...props
    } = args;

    name = name || Math.random().toString(36).substring(2, 9);
    id = id || 'rgi_' + name
    options = selectOptions(options);

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
                disabled,
            }),
            label({ class: 'form-check-label', for: itemId }, option.children)
        );
    });

    return div({
        class: () => {
            let res = 'form-control';
            if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
            if(van.val(clas)) res += ' ' + van.val(clas);
            if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
            return res;
            },
            disabled,
            ...props
        },
        items,
    )
}



export function FormCheckInput ({label: clabel, type, class: clas, style, bsSize, reverse, id, value, isvalid, ...props}, ...children) {

    id = id || Math.random().toString(36).substring(2, 9);

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


export const SwitchInput = props => FormCheckInput({...props, type: 'switch'});
export const CheckboxInput = props => FormCheckInput({...props, type: 'checkbox'});
export const RadioInput = props => FormCheckInput({...props, type: 'radio'});





/*

    ComboboxInput
    a input control with dropdown options

    props: {
        // in
        value,                                                  // require
        options     [[text,value]] or 'value1,value2'           // should
        class                                                   // optional
        style                                                   // optional
                                                 
        // out
        oninput(event),                                        // require

        onItemClick,  (value,selItem) => must return value !    // optional
        - vaue = selItem.value
        - selItem = [text,value]  
    }

*/

export function ComboboxInput (props) {
    const {a,div,ul,li} = van.tags;
    var {
        options = [],
        style,
        bsSize,
        onItemClick,
        disabled,
        isvalid,
        ...inputProps                                               // name, value, oninput ...
    } = props;

    options = selectOptions(options);

    var dvalue = van.state(valueToDisplay(options, van.val(props.value)));  // declare display value as van.state

    function displayToValue (options, value) {
        let oItem = options.find( o => o.children === value );      // lookup in options to get associated value
        if (oItem) value = oItem.value;                             // value fount, otherwise it's still the caption
        return value;
    }
    
    function valueToDisplay (options, value) {
        var oItem = options.find( o => o.value === value );             // lookup in options to get associated display value
        if (oItem) value = oItem.children;
        return value;
    }
        
    function selectClick (value) {                                  // value is the clicked list caption
        let {name,type} = props;
        value = displayToValue(options, value);

        if (onItemClick) {                                          // this event is handeld external
            let selItem = options.find( o => o.children === value );
            value = onItemClick(value,selItem);
        }

        props.oninput({                                            // set input to clicked value
            target: {name, value, type}
        });

        dvalue.val = valueToDisplay(options, value);

        return false;  // don't change browser hash
    };

    
    return div({
        style: van.val(props.style),
        class: () => {
            let res = 'input-group';
            if(van.val(props.bsSize)) res += ' input-group-' + van.val(props.bsSize);
            if(van.val(props.class)) res += ' ' + van.val(props.class);
            if(isvalid != undefined) res += van.val(isvalid) ? ' is-valid' : ' is-invalid';
            return res;
        }},

        Input({
            ...inputProps,
            disabled,
            value: dvalue,
            oninput: event => {
                let {value} = event.target;
                dvalue.val = value;
                props.oninput({
                    target: {
                        value:  displayToValue(options, value),
                        name:   props.name,
                        type:   props.type
                    }
                })
            }
        }),

        Button({dropdown: "true", disabled}),
        ul({class: "dropdown-menu"},
            options.map( (o) => li(
                a({
                    class: "dropdown-item", href: "#",
                    onclick: () => selectClick(o.children)
                }, o.children)
            ))
        )
    )
}



export function FormGroup({ name, label, input, class: clas, inputClass, bsSize, cols, col, id, separated, ...props}, ...children) {
    const cl = () => {
        let res = '';
        if(van.val(clas)) res += ' ' + van.val(clas);
        return res;
    }
    let g_id = id ?? Math.random().toString(36).substring(2, 9);
    let i_id = g_id + '-i';
    let domInput = input ?? typeMap.get(props.type) ?? Input;
    let ischeck = ['checkbox','radio','switch'].includes(props.type);

    let inputEl, labelEl;
    if(ischeck) {
        if(separated) {
            labelEl = FormLabel({bsSize, for: i_id}, label);
            inputClass = (inputClass ?? '') + ' mt-2';
            inputEl = domInput({bsSize, name, id: i_id, class: inputClass, ...props}, ...children);
        } else {
            labelEl = null;
            inputEl = domInput({bsSize, name, id: i_id, class: inputClass, label, ...props}, ...children);
        }
        children = [];
    } else {
        labelEl = FormLabel({bsSize, for: i_id}, label);
        inputEl = domInput({bsSize, name, id: i_id, class: inputClass, ...props});
    }

    if(cols) {
        let [col_l, col_r] = cols.split(' ');
        col_r = col_r || 12 - Number(col_l);
        var res = [];
        if(labelEl) 
            res.push(FormLabel({bsSize, col: col_l, id: g_id + '-l', for: i_id}, label));
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

    return div({class: cl, id: g_id, ...props},
        labelEl,
        inputEl,
        ...children
    );
}



export function FormController ({values} = {}) {
    const isVanState = v => van.val(v) !== v;
    var listeners = [];
    var ccount = 1;
    var self = {
        values: {...(values ?? {})},
        onChange (func) { listeners.push(func); return () => self.offChange(func); },
        offChange (func) { listeners = listeners.filter( f => f !== func) },
        emitChange (name, value) { listeners.forEach( f => f(name, value)) },
        handleInput (event) {
            let {name, value} = event.target;
            if (isVanState(self.values[name])) {
                self.values[name].val = value;
            } else {
                self.values[name] = value;
            }
            self.emitChange( name, value );
        },
        args (args = {}) {
            let {name = `v${ccount++}`, value, oninput = self.handleInput} = args;
            value = value ?? self.values[name] ?? '';
            self.values[name] = value;
            return {name, value, oninput}
        },
    }
    return self;
}



export function FormBuilder ({dom, values, rowClass="", formClass="", cols, autoRow, bsSize, id, onChange}={}) {
    
    const toInt = v => {let n=Number(v); return isNaN(n) ? 0 :n};
    
    const splitCols = c => {let [l, r] = c.split(' '); l=toInt(l); r=toInt(r);
       r = r ? r : 12-l; 
       return {l,r,t:l+r,s:l+' '+r}
    };

    var fc = FormController({values});
    onChange && fc.onChange(onChange);

    var self = {
        ...fc,
        dom: dom ?? van.tags.form({class: formClass}),
        row: null,
        rowClass,
        cols,
        autoRow,
        colCount: 0,
        id: id ?? Math.random().toString(36).substring(2, 9),

        valid: {},
        onvalidate: {},
        getFormValid: () => Object.keys(self.valid).every( k => self.valid[k].val ),

        add (props, ...children) {
            let {name, value, oninput, cols, onvalidate, ...rest} = props;
            if(value === undefined && name) value = self.values[name];
            let args = {...rest, ...fc.args({name, value, oninput}) };
            args.id = args.id || self.id + '-' + name;
            if(bsSize && args.bsSize === undefined) args.bsSize = bsSize;
            args.cols = cols || self.cols;
            if(self.autoRow) {
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
    
            self.addGroup(args,...children);
            return self;
        },
        addGroup(args,...children) {
            van.add(self.row ?? self.dom, FormGroup(args,...children));
        },
        addRow (arg) {
            if(arg === null) return self.row=null;
            self.row = div({class: "row" + (self.rowClass ? ' '+self.rowClass : '') + (arg ? ' '+arg : '')});
            van.add(self.dom, self.row);
            return self;
        },
    }

    self.onChange((name,value) => {
        if(self.onvalidate[name]) self.valid[name].val = self.onvalidate[name](value);
    });

    return self;
}



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
    
