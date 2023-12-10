# Custom Input

This example shows how to build a custom input control and register it as type 'align' for [FormBuilder](#formbuilder).


### AlignInput Source

```javascript
import van from 'vanjs-core';
import {Button} from 'vanjs-bootstrap';


// const t = i18n.tPath('align-input');        // use current language
const t = t=>t;                                // use dummy translate

const {svg, path} = van.tagsNS("http://www.w3.org/2000/svg");

// define button props
const LEFT = {
    value:      'left',
    title:      'align left',
    icon:       svg({width: "1em", height: "1em", viewBox: "0 0 448 512", stroke:"currentColor", fill:"currentColor"},
        path({d: "M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"})
    ),
}

const CENTER = {
    value:      'center',
    title:      'align center',
    icon:       svg({width: "1em", height: "1em", viewBox: "0 0 448 512", stroke:"currentColor", fill:"currentColor"},
        path({d: "M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"})
    ),
}

const RIGHT = {
    value:      'right',
    title:      'align right',
    icon:       svg({width: "1em", height: "1em", viewBox: "0 0 448 512", stroke:"currentColor", fill:"currentColor"},
        path({d: "M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"})
    ),
}

const JUSTIFY = {
    value:      'justify',
    title:      'align justify',
    icon:       svg({width: "1em", height: "1em", viewBox: "0 0 448 512", stroke:"currentColor", fill:"currentColor"},
        path({d: "M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"})
    ),
}

// validate function
const isValidValue = (value) => [LEFT.value, CENTER.value, RIGHT.value,JUSTIFY.value].includes(value);


// the custom align control

export default function AlignInput ({value, bsSize, class: clas, style, color="primary", ...props}) {

    const type = 'textalign';   // input type

    var select = {
        left:   van.state(),
        right:  van.state(),
        center: van.state(),
        justify:van.state()
    }
    const setSelect = value => Object.keys(select).forEach( k => select[k].val = k !== value); 

    if (!isValidValue(value)) value = 'left'; // default
    setSelect(value);

    // setup bootstrap control frame
    var divProps = {
        className:  () => {           // merge className
            let res = "d-flex flex-row form-control"; 
            if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
            if(van.val(clas)) res += ' ' + van.val(clas);
            return res;
        },
        style: () => {                   // merge style
            let res = "max-width: max-content";
            if(van.val(style)) res += '; ' + van.val(style);
            return res;
        }
    };

    // setup button props
    const Btn = (param) => Button({
        bsSize,
        class: "py-1 px-2 me-1",
        onclick: () => {
            props.oninput({
                target: {
                    name:   props.name,
                    type,
                    value:  param.value
                }                
            });
            setSelect(param.value);
        },
        color,
        outline: select[param.value],
        title:  t(param.title)
    }, param.icon);
    
    // return component
    return van.tags.div({...divProps},
        Btn(LEFT), Btn(RIGHT), Btn(CENTER), Btn(JUSTIFY),
    )
}

```

### Demo Source

```javascript
import van from 'vanjs-core';
import {FormBuilder, typeMap} from 'vanjs-bootstrap';
import AlignInput from './align-input';

const {div, h3, h5} = van.tags;

typeMap.set('align', AlignInput);  // register AlignInput as type 'align';

export default function demo () {

    const state = {
        bsSize: van.state(''),
        color:  van.state('primary'),
        align:  van.state('left'),
    }

    const fb = FormBuilder(); // create builder

    fb.onChange( (name,value) => {state[name].val = value} );

    fb.addRow("m-2");
    fb.add({label: 'bsSize', name: 'bsSize', type: 'radioselect', cols: "2 4", bsSize: 'sm',
        options: [['none',''],'sm','lg'], inline: true
    });
    fb.add({label: 'color', name: 'color', type: 'select', cols: "2 4", bsSize: 'sm',
        options: 'primary,secondary,success,danger,warning,info,light,dark,link',
    });

    fb.addRow("m-2");
    fb.add({label: 'Align', name: 'align', type: 'align', cols: "2 5", bsSize: state.bsSize, color: state.color});

    return div(
        h3('Align Demo'),
        div({class: "row my-4 border rounded-2"},
            fb.dom,
            h5(() => `align value: ${state.align.val}`)
        ),
    )
}

```
