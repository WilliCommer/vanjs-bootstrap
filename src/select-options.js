/**
 
Input:
    'a,b,c'
or
    ['a','b'...]
or
    [['text1',1],['text2',2]]
or
    [{
        value: 3,
        ['children' || 'text' || 'displayValue']
    } 


output:
    [{
        value: 1,
        children: 'text 1',
    },{
        value: 2,
        children: 'text 2',
    }]    


usage:
    input(
        {type: 'select', value, oninput},
        selectOptions(optionList, true)
    )




Merge and Translate

const translate = txt => (txt==='None,Left,Right') ? 'Nix,Links,Rechts' : txt;

Input:
    {
        value: ',1,2',                          // required,    array acepted
        text:  translate('None,Left,Right'),    // should,      array acepted
    }

output:    
    [{
        value:      '',
        children:   'Nix',
    },{
        value:      1,
        children:   'Links',
    }]    
    },{
        value:      2,
        children:   'Rechts',
    }]    


  
 */





    
import van from 'vanjs-core';

const {option} = van.tags;

const log = 1 ? console.warn : ()=>{};

export default function parseSelectOptions (value, dom, selected) {

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
        warn && log('parseSelectOptions value invalid');
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
