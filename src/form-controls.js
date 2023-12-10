import van from 'vanjs-core';
import selectOptions from './select-options';

const {a, button, div, input, label, li, ul, select} = van.tags;


export var typeMap = new Map();

typeMap.set( 'text',            Input);
typeMap.set( 'textarea',        Input);
typeMap.set( 'select',          SelectInput);
typeMap.set( 'radioselect',     RadioSelectInput);
typeMap.set( 'checkbox',        FormCheckInput);
typeMap.set( 'radio',           FormCheckInput);
typeMap.set( 'switch',          FormCheckInput);
typeMap.set( 'combobox',        ComboboxInput);



export function Input({class: clas, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-control';
        if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
        return res;
    }
    return input({class: cl, ...props});
}


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



export function SelectInput ({class: clas, bsSize, ...props}) {
    const cl = () => {
        let res = 'form-select';
        if(van.val(bsSize)) res += ' form-select-' + van.val(bsSize);
        if(van.val(clas)) res += ' ' + van.val(clas);
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



export function RadioSelectInput ({options, class: clas, bsSize, inline, id, ...props}) {

    let name = props.name || Math.random().toString(36).substring(2, 9);
    id = id || 'rgi_' + name
    options = selectOptions(options);

    const oninput = ev => {
        let value = ev.target.value;
        props.oninput && props.oninput({target: { 
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
                checked:    props.value === option.value,
                oninput,
            }),
            label({ class: 'form-check-label', for: itemId }, option.children)
        );
    });

    return div( 
        {
            class: () => {
                let res = 'form-control';
                if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
                if(van.val(clas)) res += ' ' + van.val(clas);
                return res;
        }},
        items,
    )
}



export function FormCheckInput ({label: clabel, type, class: clas, style, bsSize, reverse, id, value, ...props}) {

    id = id || Math.random().toString(36).substring(2, 9);

    var isSwitch = type === 'switch';

    if(isSwitch) type = 'checkbox';

    var inputClass = 'form-check-input';
    if (clas && van.val(clas).includes('form-control')) {
        inputClass += ' ms-0 me-2';
    }

    const oninput = ev => {
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
            class: inputClass,
            id,
            type,
            checked: value || false,
            oninput,
            role: isSwitch ? 'switch' : undefined,
            },
        ),
        Label
    )
}


export const SwitchInput = props => FormCheckInput({...props, type: 'switch'});
export const CheckboxInput = props => FormCheckInput({...props, type: 'checkbox'});
export const RadioInput = props => FormCheckInput({...props, type: 'radio'});



export function FormGroup({ name, label, input, class: clas, bsSize, cols,id, ...props}) {
    const cl = () => {
        let res = '';
        if(van.val(clas)) res += ' ' + van.val(clas);
        return res;
    }
    let g_id = id ?? Math.random().toString(36).substring(2, 9);
    let i_id = 'i_' + g_id;
    let domInput = input ?? typeMap.get(props.type) ?? Input;

    if(cols) {
        let [col_l, col_r] = cols.split(' ');
        return [
            FormLabel({bsSize, col: col_l, for: i_id}, label),
            div({
                class: () => {
                    let res = col_r ? `col-${col_r}` : 'col';
                    if(['checkbox','radio','switch'].includes(props.type)) res += ' pt-2';
                    return res;
                }},
                domInput({bsSize, name, id: i_id, ...props})
            )
        ]
    }


    return div({class: cl, id: g_id, ...props},
        FormLabel({bsSize, for: i_id}, label),
        domInput({bsSize, name, id: i_id, ...props})
    );
}



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

    var {
        options = [],
        style,
        bsSize,
        onItemClick,
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
            return res;
        }},

        Input({
            ...inputProps,
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

        div({class: "dropdown"},
            button({class: "btn btn-secondary dropdown-toggle", type: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false"}),
            ul({class: "dropdown-menu"},
                options.map( (o) => li(
                    a({
                        class: "dropdown-item", href: "#",
                        onclick: () => selectClick(o.children)
                    }, o.children)
                ))
            )
        )
    )
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
        }
    }
    return self;
}


export function FormBuilder (dom) {
    var fc = FormController();
    var self = {
        ...fc,
        dom: dom ?? van.tags('form'),
        row: null,
        add (props, dom) {
            let {name, value, oninput, ...rest} = props;
            let args = {...rest, ...fc.args({name, value, oninput}) };
            van.add(dom ?? self.row ?? self.dom, FormGroup(args));
        },
        addRow (arg) {
            if(arg === null) return self.row=null;
            self.row = div({class: "row" + (arg ? ' '+arg : '')});
            van.add(self.dom, self.row);
            return self.row;
        }
    }
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
    
