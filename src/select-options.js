
/** @module selectoptions **/

import van from 'vanjs-core';
const {option} = van.tags;

/**
 * Input type for {@link selectOptions}
 * <pre>
 * - a komma separated list: 'TextValue1,TextValue2'
 * - a array of values: ['TextValue1', 'TextValue2'...]  
 * - a array of display / value pairs: [['Text1', Value1], ['Text2', Value2]...]
 * - a array of objects: [{value: 1, ['children' || 'text' || 'displayValue']}]  
 * </pre>  
 * @typedef {string|string[]|Array<Array<string|number>>|Array<Object>|Object} SelectOption
 */
 
 
/**
 * Form controls in this library uses the selectOptions function.
 * This converts different kind of lists into a uniform format that can easily be mapped into a dom.
 * Is the `dom` parameter `true`, the function returns a ready mapped dom `option` list.
 * <br>The `list` parameter accepts four notations:
 * <pre>
 * - a komma separated list: 'TextValue1,TextValue2'
 * - a array of values: ['TextValue1', 'TextValue2'...]  
 * - a array of display / value pairs: [['Text1', Value1], ['Text2', Value2]...]
 * - a array of objects: [{value: 1, ['children' || 'text' || 'displayValue']}]  
 * </pre>  
 * <br>
 * @example Notations can be mixed inside a array.
 * For example `[ '', ['text 1', 1], ['text 2', 2] ]` will be converted to:
 * [
 *   {
 *     value: '',
 *     children: '',
 *   },
 *   {
 *     value: 1,
 *     children: 'text 1',
 *   },
 *   {
 *     value: 2,
 *     children: 'text 2',
 *   }
 * ]
 * and with `dom=true` and `selected: "1"`:
 * [
 * option({value=""}),
 *  option({value="1", selected: true}, "text 1"),
 *  option({value="2"}, "text 2"),
 * ]
 * @example an other example:
 * import {selectOptions} from 'lib';
 * ..
 * return input({type: 'select', value: fontName}, selectOptions(fontNames, true, fontName))
 * @example
 * selectOptions('red,green,blue', false)
 * // => [{ value: 'red', children: 'red' }, ...]
 *
 * @example
 * selectOptions([['Text 1', 1], ['Text 2', 2]], true, 1)
 * // => [option({ value: '1', selected: true }, 'Text 1'), ...]
 *
 * @example Merge and Translate
 * const translate = txt => (txt==='None,Left,Right') ? 'Nix,Links,Rechts' : txt;
 * input:
 *     {
 *         value: ',1,2',                          // required,    array acepted
 *         text:  translate('None,Left,Right'),    // should,      array acepted
 *     }
 * 
 * output:    
 *     [{
 *         value:      '',
 *         children:   'Nix',
 *     },{
 *         value:      1,
 *         children:   'Links',
 *     }]    
 *     },{
 *         value:      2,
 *         children:   'Rechts',
 *     }]    
 * @param {SelectOption} value - input list in one of the supported formats
 * @param {boolean} [dom=false] - when true, return a DOM-ready option list instead of plain objects
 * @param {string|number} [selected] - selected value used when `dom` is true
 * @returns {Array<Object>|Array<HTMLElement>} either normalized option objects or mapped `<option>` elements
 */


function selectOptions (value, dom, selected) {

    // check input value

    if (value && !Array.isArray(value) && typeof value === 'object' && !!value.value )
        value = mergeAndTranslate(value);
    
    value = toArray(value || [], true);

    value = value.map( 

        function( option ) {

            let result = {                          // object template for one <option>
                value:      '',
                children:   '',
                // key:        index + 1
            };

            // case: empty

            if (!option) return result;


            // case: [['a',1],['b']]

            if (Array.isArray(option)) {
                if (option.length > 0) {
                    result.value    = option[0];
                    result.children = option[0];
                }
                if (option.length > 1) {
                    result.value    = option[1];
                }
                return result;
            };
            
            // case: [{value: ...}, ...]

            if (typeof option === 'object') {
                result.value    = option.value;
                result.children = option.value;
                ['children','text','displayValue']
                .some( key => {
                    if (option[key] !== undefined) {
                        result.children = option[key];
                        return true;
                    }
                    return false;
                })
                return result;
            }

            
            // case: ['a','b'...]

            result.value    = option;
            result.children = option;
            return result;
        }
    );


    return dom 
        ? value.map( o => {
            let attr = {value: o.value};
            if(selected !== undefined && o.value === selected) attr.selected=true;
            return option( attr, o.children )
        }) 
        : value;

}



function toArray (value, warn) {
    if (!value) return [];
    if (typeof value === 'string') 
        value = value.split(',');
    if (!Array.isArray(value)) {
        warn && console.warn('parseSelectOptions value invalid');
        value = [];
    }
    return value;
}



function mergeAndTranslate (obj) {

    var {value,text} = obj;
    if (!value) 
        return [];
    value   = toArray(value, true);
    text    = toArray(text, false);

    return (
        value.map( (v,i) => ({
            value:  v,
            text:   text[i]
        }))
    )
}

export default selectOptions;