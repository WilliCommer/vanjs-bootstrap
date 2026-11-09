/** @module form-controls **/

import van from 'vanjs-core';
import selectOptions from './select-options';
import {Button, Input, typeMap} from './form-controls.js';

typeMap.set( 'comboboxp',        ComboboxInputP);

/**
 * Create a input control with dropdown options using bootstrap popper
 * @deprecated 
 * @param {object} props
 * @property {SelectOption} options 
 * @property {string} style 
 * @property {string} bsSize 
 * @property {boolean} disabled
 * @property {function} onitemclick - onitemclick(value,selItem)
 * <br>&nbsp;&nbsp;vaue = selItem.value
 * <br>&nbsp;&nbsp;selItem = [text,value] 
 * <br>&nbsp;&nbsp;returns new value
 * @property {function} afteritemclick - afteritemclick(event)
 * @property {object} ...inputProps other props
 * @returns {HTMLElement} input control with dropdown options
 */

export function ComboboxInputP (props) {
    const {a,div,ul,li} = van.tags;
    var {
        options = [],
        style,
        bsSize,
        onitemclick,
        afteritemclick,
        disabled,
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

        if (onitemclick) {                                          // this event is handeld external
            let selItem = options.find( o => o.children === value );
            let newValue = onitemclick(value,selItem);
            if(newValue !== undefined) value = newValue;
        }

        dvalue.val = valueToDisplay(options, value);

        props.oninput && props.oninput({                                            // set input to clicked value
            target: {name, value, type}
        });

        props.afteritemclick && props.afteritemclick({                                            // set input to clicked value
            target: {name, value, type}
        });

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
                    class: "dropdown-item", 
                    href: "javascript:void(0);",
                    onclick: (event) => {
                        event.preventDefault();
                        selectClick(o.children);
                        return false;
                    }
                }, o.children)
            ))
        )
    )
}

