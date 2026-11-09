/** @module form-controls **/

import van from 'vanjs-core';
import selectOptions from './select-options';
import { Button, Input, typeMap } from './form-controls.js';

typeMap.set('combobox', ComboboxInput);


/**
 * Create a searchable input control with dropdown options.
 * Dropdown behavior is implemented by the component and does not require Bootstrap JavaScript or Popper.
 * @param {object} props
 * @property {SelectOption} options 
 * @property {string|object} style
 * @property {string} bsSize 
 * @property {boolean} disabled
 * @property {object} ...inputProps other props
 * @returns {HTMLElement} input control with dropdown options
 */

export function ComboboxInput(props) {
    const { div, ul, li } = van.tags;
    var {
        options = [],
        style,
        bsSize,
        disabled,
        inline,
        type,               // remove type="combobox"
        ...inputProps      // name, value, oninput ...
    } = props;

    if (!props.name) props.name = 'cb_' + Math.random().toString(36).substring(2, 9);
    if (!props.id) props.id = 'cbi_' + Math.random().toString(36).substring(2, 9);
    const listId = props.id + '-options';
    const itemId = index => (listId + '-' + index);
    options = selectOptions(options);

    var dvalue = van.state(valueToDisplay(options, van.val(props.value)));  // declare display value as van.state
    const isOpen = van.state(false);


    function displayToValue(options, value) {
        let oItem = options.find(o => o.children === value);      // lookup in options to get associated value
        if (oItem) value = oItem.value;                             // value fount, otherwise it's still the caption
        return value;
    }

    function valueToDisplay(options, value) {
        var oItem = options.find(o => o.value === value);             // lookup in options to get associated display value
        if (oItem) value = oItem.children;
        return value;
    }

    function postValue(value) {
        dvalue.val = value;
        if (props.oninput) props.oninput({
            target: {
                value: displayToValue(options, value),
                name: props.name,
                type: props.type
            }
        });
    }

    function selectClick(value) {
        postValue(value);
        isOpen.val = false;
        return false;
    };


    // create component body

    const componentProps = {
        class: () => {           // merge class
            let res = "d-flex flex-row form-control";
            if (van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
            if (van.val(props.class)) res += ' ' + van.val(props.class);
            return res;
        },
        style: () => {               // merge style
            let res = 'padding:0;';
            if (van.val(style)) res += '; ' + van.val(style);
            return res;
        },
        onfocusout: event => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
                isOpen.val = false;
            }
        }
    }
    if(props.value !== undefined) componentProps.value = props.value;
    const groupClass = van.val(bsSize) ? 'input-group input-group-' + van.val(bsSize) : 'input-group'
    let component;
    if(inline) {
        component = (...children) => div( componentProps, ...children )
        inputProps.class = (inputProps.class || '') + ' rounded-0'
    } else {
        component = (...children) => div( componentProps,
            div({class: groupClass}, ...children)
        )
    }
    // create input part

    const input = Input({
        ...inputProps,
        bsSize,
        disabled,
        value: dvalue,
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-haspopup': 'listbox',
        'aria-controls': listId,
        'aria-expanded': () => isOpen.val,
        onfocus: event => {
            inputProps.onfocus && inputProps.onfocus(event);
        },
        oninput: event => {
            postValue(event.target.value);
        },
        onkeydown: event => {
            if (options.length && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault();
                if (!isOpen.val) isOpen.val = true;
                const step = event.key === 'ArrowDown' ? 1 : -1;
                const current = options.findIndex(o => dvalue.val === o.children);
                const next = current < 0
                    ? (step > 0 ? 0 : options.length - 1)
                    : (current + step + options.length) % options.length;
                postValue(options[next].children);
            } else if (options.length && event.key === 'Enter' && isOpen.val) {
                event.preventDefault();
                selectClick(dvalue.val);
            } else if (event.key === 'Escape' && isOpen.val) {
                event.preventDefault();
                isOpen.val = false;
            }
            inputProps.onkeydown && inputProps.onkeydown(event);
        },
    })

    // create select list

    const menuStyle = 'top:100%;left:0;right:0;max-height:16rem;overflow-y:auto;cursor:default;'

    const list = ul({
        id: listId,
        role: 'listbox',
        class: 'dropdown-menu',
        style: () => (menuStyle + `display: ${isOpen.val ? 'block' : 'none'};`),
    },
        options.map((o, index) => li(
            van.tags.button({
                id: itemId(index),
                class: () => `dropdown-item${o.children === dvalue.val ? ' active' : ''}`,
                type: 'button',
                role: 'button',
                onmousedown: event => event.preventDefault(),
                onclick: () => selectClick(o.children),
            }, o.children))
        )

    )

    // create open button

    const button = van.tags.span({
        class: 'input-group-text' + (inline ? ' rounded-0' : ''),
        style: 'user-select:none;',
        role: 'button',
        'aria-label': 'Show options',
        'aria-haspopup': 'listbox',
        'aria-controls': listId,
        'aria-expanded': () => isOpen.val,
        tabindex: -1,
        onclick: () => {
            isOpen.val = !isOpen.val;
        },
    }, '▾')

    return component(input, list, button)
}
