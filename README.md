# vanjs-bootstrap

- [Start](#home)
- [Button](#page-button)
- Form
  - [FormController](#formcontroller)
  - [FormGroup](#formgroup)
  - [FormBuilder](#formbuilder)
  - [Input Controls](#inputcontrols)
  - [Custom Input](#custominput)
- [Navbar](#navbar)
- [Modal](#modal)
- [Menu](#menu)
- [TagInput](#taginput)
- Tools
  - [DragSort](#dragsort)
  - [i18n](#i18n)
  - [Icons](#icons)
  - [selectOptions](#selectoptions)
- [History](#history)
<br />

----

<a name="home" />

# <img src="img/form-lib.svg" alt="logo" height="60">&nbsp; <img src="img/vanjs.svg" alt="logo" height="60"> VanJs Bootstrap Components

![vanjs](https://img.shields.io/badge/🍦VanJs-1.2-blue)
![bs](https://img.shields.io/badge/Bootstrap-5-blue?logo=bootstrap&logoColor=white)

----

> a component library using VanJs and Bootstrap

For a long time I built my UIs with React and Bootstrap. Then I met VanJs and am amazed at how easy it is. So that I don't have to mess with CSS, I'm introducing some Bootstrap components here.

[Check out the demo](http://familiecommer.de/vanjs-bootstrap-demo)


## Installation

To use this library you also need VanJs and Bootstrap.

```batch
npm install vanjs-core bootstrap vanjs-bootstrap
```

main.js

```javascrript
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap'
import van from 'vanjs-core';
import App from './app.js';
const app = document.querySelector("#app");
van.add(app, App());
```


<br />

----

<a name="page-button" />

# Button

> ### `export function Button ({bsSize, class, color='secondary', outline, dropdown, ...props}, children)`

Implements a Bootstrap [button](https://getbootstrap.com/docs/5.3/components/buttons/)

## Demo Code

```javascript
import van from 'vanjs-core';
import { Button, CheckboxInput, Input, RadioSelectInput, SelectInput } from 'vanjs-bootstrap';

const { div, h2, span } = van.tags;

var bsSize = van.state('md');
var color = van.state('secondary');
var disabled = van.state(false);
var outline = van.state(false);
var dropdown = van.state(false);
var label = van.state("Button");

export default function Page() {

    const OptionsBar = div(
        div({ class: "input-group input-group-sm" },
            span({ class: "input-group-text" }, 'bsSize'),
            RadioSelectInput({
                value: bsSize.val,
                oninput: e => bsSize.val = e.target.value,
                options: 'sm,md,lg', inline: true,
            }),

            span({ class: "input-group-text" }, 'color'),
            SelectInput({
                value: color.val,
                oninput: e => color.val = e.target.value,
                options: ',primary,secondary,success,danger,warning,info,light,dark,link',
            }),

            span({ class: "input-group-text" }, 'outline'),
            CheckboxInput({ value: outline.val, oninput: e => outline.val = e.target.value, class: "form-control", style: "max-width: 2em" }),

            span({ class: "input-group-text" }, 'disabled'),
            CheckboxInput({ value: disabled.val, oninput: e => disabled.val = e.target.value, class: "form-control", style: "max-width: 2em" }),

            span({ class: "input-group-text" }, 'dropdown'),
            CheckboxInput({ value: dropdown.val, oninput: e => dropdown.val = e.target.value, class: "form-control", style: "max-width: 2em" }),
        ),
    );

    return div({},
        div({class: "row"},
            h2('Button Demo'),
            OptionsBar,
            div({class: "col"},
                Button({ bsSize, color, outline, disabled, dropdown, class: "mt-3" }, label),
            ),
        ),
    )
}
```
<br />

----

<a name="formcontroller" />

# FormController

> ### `export function FormController ({values})`

Function FormController creates a simple object to handle multiple inputs.

- create a FormController object  
  `var fc = FormController()`  
- assign its *handleInput* to your controls *oninput* event
- subscribe changes with *onChange* which returns a unsubscribe function
- use *args* to inject properties into your control  
  `input({type: "text", ...fc.args({name: 'name', value: 'init'})})` will allso set `oninput`  
  or omit *name* and *value* for auto generation  
  `input({type: "number", ...fc.args()})`  
  ⇨ `input({type: "number", name: "v1", value: "", oninput: fc.handleInput})`  
- all values are collected in object *values* as `name: value`

<details>
  <summary>Show code</summary>

## FormController Code

```javascript
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
```

</details>

<br />

----

<a name="formgroup" />

# FormGroup

> ##### `export function FormGroup({name, label, type, input, class, bsSize, cols, id, ...props}, ...children})`

FormGroup creates a combination of label and input.
The most important arguments are "name", "label" and "type".
The value for "type" is usually an [\<input\> type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types). However, special input fields can either be passed as "input" (a van function) or registered in *typeMap* with their own "type" ([see example](#aligndemo)).
The "id" can be specified, but will be generated automatically if not present.
All other arguments in "...props" are passed to the input element, such as "oninput" and "value".
The elements are displayed on top of each other.
If cols is set, they can also be placed next to each other in a row. For example `cols: "2 4"` uses 2 colums for the label and 4 colums for the input.

See [FormBuilder Demo](#formbuilder) for example.


## FormGroup Args

| arg | comment |
| --- | --- |
| name | string becomes input name |
| label | string or func becomes a label component |
| input | a input control alternative to type. See [Custom Input](#custominput) |
| class | class of the enveloping group |
| inputClass | class of the input control |
| bsSize | Bootstrap size |
| cols | space separated string "left right" for the Bootstrap column sizes i.e. "3 6" |
| col | Bootstrap column size of the group alternative to cols. Used for form class "row g-3" |
| id | HTML id of group. Will get random id if omited. Label id is it+'-l', input id is id + '-i' |
| separated | special for FormCheck. Separate label and check if true |
| ...props | passed to input control |
| ...children | appendix for input control like :form-text :valid-feedback or :invalid-feedback |

<p></p>

<details>
  <summary>Show FormGroup Code</summary>

## FormGroup Code

```javascript
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
```

</details>

<br />

----

<a name="formbuilder" />

# FormBuilder

> ##### `export function FormBuilder ({dom, values, rowClass="", formClass="", cols, autoRow, bsSize, id, onChange}={})`

The FormBuilder inherits from [FormController](#formcontroller). With it you can easily create forms in Bootstrap grid format.

- Create a FormBuilder with `function FormBuilder(dom)`
- Start a new row with `addRow(class)`
- Finish a row with `addRow(null)` or `addRow(class)` for next row
- Add a form group with label and input control with `add(props)`
- Add the form into dom tree with variable `dom`

## Usage

```javascript
var fb = FormBuilder();
var fbValues = van.state({});
fb.onChange( () => {fbValues.val = {...fb.values}} );

fb.addRow("m-2 p-2 border border-primary rounded-2 ");
fb.add({label: 'Name 1', name: 'name1', cols: "2 4"});
fb.add({label: 'Name 2', name: 'name2', cols: "2 4"});

...

return div({class: 'row p-2 border'},
    fb.dom,  // form dom
    div({class: "row mt-1"},
        p(JSON.stringify(fbValues.val),  // show form values
        ()=>fb.emitChange(),    // effect to call fb.onChange to show initial values
    ),
)
```

## FormBuilder Args

| arg | comment |
| --- | --- |
| dom | Container for the form groups to be inserted. If omitted a `<form class=formClass />` is created. |
| values | Optional initial values as object `{name: value,..}` |
| formClass | Class for the generated form tag |
| rowClass | Class for the generated rows if autoRow is true |
| cols | Default cols attribute for addRow |
| autoRow | If true, will add a new row if the columns in a row exceeds 12 |
| bsSize | Default Bootstrap size for inserted components. '' or 'sm' or 'lg' |
| id | HTML id of the form. Random id if omitted. It is the prefix for label id (formId-groupId-l) and input id (formId-groupId-i) |
| onChange | Optional callback function(name,value) for input change |

## FormBuilder Props

Properties inherited from FormControl.

| property | comment |
| --- | --- |
| values | input values as object `{name: value,..}` |
| onChange(func) | Subscribe input value change events. func=function(name,value) |
| emitChange(name, value) | Notify change to all subscribers |
| handleInput(event) | input element oninpup(event) handler |
| args(props) | Function returns completetd props for a input control. Generate 'value', 'oninput' and 'name'. |

Own properties.

| property | comment |
| --- | --- |
| dom | Container for the form groups to be inserted. |
| row | Actual row element |
| rowClass | Default ow class |
| cols | Default cols attribute for inserted groups |
| autoRow | If true, will add a new row if the columns in a row exceeds 12 |
| colCount | Number of colums in actual row |
| id | Form tag id |
| valid | Container for form validation |
| onvalidate | Container for form validation |
| **add(props, ...children)** | The main function used to insert a form group. |
| addGroup(args,...children) | Finally insert a group |
| **addRow(arg)** | Add a new row with ...args injected. i.e. `addRow({class: "m-2"})` |
| **getFormValid()** | Function returns true/false when all input values are valid |

## Function add(props, ...children)

The main function used to insert a form group.
The props argument decides how the inserted form group is created.
The further arguments are added as an appendix to the input component.

### Add Properties

| property | comment |
| --- | --- |
| **name** | string becomes input name |
| **label** | string or func becomes a label component |
| **type** | Type attribute for the input control |
| oninput | Optional for special usage. Is generally generated automatically |
| input | a input control alternative to type. See [Custom Input](#custominput) |
| class | class of the enveloping group |
| inputClass | class of the input control |
| bsSize | Bootstrap size |
| cols | space separated string "left right" for the Bootstrap column sizes i.e. "3 6" |
| col | Bootstrap column size of the group alternative to cols. Used for form class "row g-3" |
| id | HTML id of group. Will get random id if omited. Label id is "formId-id-l", input id is "formId-id-i" |
| separated | special for FormCheck. Separate label and check if true |
| isvalid | Boolean add :is-valid or :is-invalid to input class |
| **onvalidate** | function(value) {return value_is-valid }. Add a validation check for input and add isvalid argument |

See also [Form Layout](http://familiecommer.de/vanjs-bootstrap-demo/#formlay) and [Form Validation](http://familiecommer.de/vanjs-bootstrap-demo/#formval) in the online demo.




<details>
  <summary>Show FormBuilder Code</summary>

## FormBuilder Code

```javascript
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
```

</details>


<br />

----

<a name="inputcontrols" />

# Input Controls

The special Bootstrap form controls are implemented in the library and can be imported. In the FormGroup the controls are specified as “type”. The mapping is the Map "typeMap".

A special feature of SelectInput, RadioSelectInput and ComboboxInput is that the options are not specified as children, but as an attribute "options". The value here is a list. See [selectOptions](#selectoptions) for details.

## API

```javascript
export function Input({class: clas, bsSize, ...props})

export function FormLabel({class: clas, bsSize, col, ...props}, children)

export function Textarea({class: clas, bsSize, ...props})

export function SelectInput ({class: clas, bsSize, ...props})

export function FormCheckInput ({label: clabel, type, class: clas, style, bsSize, reverse, id, value, ...props})

export const SwitchInput = props => FormCheckInput({...props, type: 'switch'})

export const CheckboxInput = props => FormCheckInput({...props, type: 'checkbox'})`

export const RadioInput = props => FormCheckInput({...props, type: 'radio'})

export function ComboboxInput (options = [], style, bsSize, onItemClick, ...props)

export function RadioSelectInput ({options, class: clas, bsSize, inline, id, ...props})
```

## typeMap


| type | control |
| --- | --- |
| 'text' |            Input |
| 'textarea' |        Textarea |
| 'select' |          SelectInput |
| 'radioselect' |     RadioSelectInput |
| 'checkbox' |        CheckboxInput |
| 'radio' |           RadioInput |
| 'switch' |          FormCheckInput |
| 'combobox' |        ComboboxInput |


<br />

----

<a name="custominput" />

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
<br />

----

<a name="navbar" />

# Navbar

This component simplifies the use of the Bootstrap [navigation bar](https://getbootstrap.com/docs/5.3/components/navbar/).

```javascript
function Navbar({class: clas, sticky = true, menu, t = t=>t, ...props})

function NavItem({href='#', label, icon, items, level=0, Comp, hidden=false, t=t=>t, ...props})

function NavLink({label, class: clas, active, disabled, divider, level=0, ...props})

function NavMenu ({label, items, t=t=>t, level, ...props})
```

## Navbar Arguments

- **class**  
  optional class string or van.state for the \<nav\> element  

- **sticky**  
  add 'sticky-top' to class  

- **t**  
  optional translation function for labels and titles  

- **menu**  
  The **menu** is an object with properties [**brand**](https://getbootstrap.com/docs/5.3/components/navbar/#brand), a dom element and **items**, the array of menu items.  
  See example below  

## item props

The object 'item' is passed as an argument to the function NavItem.

- **label**  
  A string, function or van.state  

- **href**  
  Optional url, default is '#'  

- **icon**  
  Not supported  

- **items**  
  A array of items. The item is a submenu when set  

- **Comp**  
  A optional function returning a van dom, preferably an NavLink element  
  All properties are passed to the function as an argument  

- **hidden**  
  item is not visible when true  

- **t**  
  Optional translation function for labels and titles 

- **active**  
  Add 'active' to class when true.. Can be a van.state.  

- **disabled**  
  Add 'disabled' to class. Can be a van.state.  

- **divider**  
  Shows a divider in submenu  

- **...props**  
  Additional properties are passed on  



## Usage Examples

See nav bar above in this app.

#### App Code

```javascript
import van from 'vanjs-core';
import Navbar from 'vanjs-bootstrap';
import ToggleTheme from './app/toggle-theme';
import Page from './app/home';
import {tPath} from './i18n';

const {div} = van.tags;

const appMenu = {

    brand: van.tags.a({ class: "nav-brand me-3", href: "#", onclick: ()=>false },
            van.tags.img({ src: "img/form-lib.svg", alt: "Home", height: "30" }),
    ),
    
    items: [
        {label: 'home', href: '#home'},
        {label: 'Form', items: [
            {label: 'formbuilder', href: '#formbuilder'},
            {label: 'aligndemo', href: '#aligndemo'},
        ]},
        {label: 'about', href: '#about'},
        {label: 'theme', Comp: ToggleTheme},
    ]
}


function AppNav () {
    return Navbar({t: tPath('nav'), menu: appMenu})
}

export default function App() {
    return () => div(
        AppNav,
        div({class: "container"},
            Page
        )
    )
}

```

#### ToggleTheme Code

```javascript
import van from 'vanjs-core';
import {NavLink} from 'vanjs-bootstrap';
import {tPath} from '../i18n';

const {svg, path} = van.tagsNS("http://www.w3.org/2000/svg");

const sun = svg({width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 16 16"},
    path({d: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"})
);
const moon = svg({width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 16 16"},
    path({d: "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"})
);

export default function ToggleTheme () {
    const t = tPath('theme');
    const toggle = (v) => v === 'dark' ? 'light' : 'dark';
    const getTheme = () => document.documentElement.getAttribute('data-bs-theme');
    const setTheme = (v) => document.documentElement.setAttribute('data-bs-theme', v);
    const btnColor = van.state(toggle(getTheme()));
    const toggleClick = () => {
        btnColor.val = toggle(btnColor.val);
        setTheme(toggle(getTheme()));
        return false;
    }
    const Icon = v => v === 'dark' ? sun : moon;

    return NavLink({
        label: Icon(btnColor.val), 
        onclick: toggleClick,
        title: t(`${btnColor.val}-title`),
    });
}
```

<br />

----

<a name="modal" />

# Modal

Work with Bootstrap [Modal](https://getbootstrap.com/docs/5.3/components/modal).

## ModalFrame

> ### `export function ModalFrame (options)`

The function ModalFrame creates a complete modal dom struture like:

```html
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

You only need to specify the van functions for header, body and footer:

```javascript
div(
    // Button trigger modal
    Button({"data-bs-toggle": "modal", "data-bs-target": "#exampleModal"}, "Launch demo modal"),

    // Modal
    ModalFrame({
        id:      "exampleModal",
        header:  "Modal title",
        body:    "Modal body text goes here.",
        footer:  div(
            Button({"data-bs-dismiss": "modal"}, 'Close'),
            Button({color: "primary"}, 'Save changes'),
        )
    })
);
```

## ModalFrame Options

- **header**  
  **body**  
  **footer**  
  A van dom function or null.  

- **id**  
  An optional dialog id.  

- **close**  
  A boolean value for the close cross in header. Default is true.  

- **centered**  
  A boolean value for centered dialog position. Default is true.  

- **scrollable**  
  A boolean value for scrollable dialog. Default is false.  

- **color**  
  A Bootstrap color name.  
  `color: "warning"`

- **position**  
  A optional position object like `{left: 100, top: 50}`  

- **width**  
  A optional diallog width like "20em" or "fit-content"  

- **class**  
  An additional class  

<br/>

## Modal Controller

You can achieve more flexibility by using the Modal function.

> ### `export function Modal (args, options)`

Where **args** are the options used for ModalFrame and **options** are controller options.
The function returns an object with properties and functions.

### Modal Controller Object

- **dom**  
  The ModalFrame dom  

- **isOpen**  
  A boolean value  

- **modalResult**  
  A value that corresponds to the argument of the close function.  

- **open (left,top)**  
  Function to open the dialog at a given (optional) position  

- **async asyncOpen (left,top)**  
  Function to open the dialog asynchron and returns modalResult when closed.  

- **close (result)**  
  Function to close the dialog with optional modalResult.  

- **dispose ()**  
  Funtion to remove the dialog from dom.  
  
- **show ()**  
  Show the dialog.  

- **hide (dispose)**  
  Hide the dialog.  

You can also use the bootstrap [events](https://getbootstrap.com/docs/5.3/components/modal/#events)

##### `dom.addEventListener('shown.bs.modal', onShown)`

### Modal Controller Options

- **backdrop**  
  boolean, default true.  
  Includes a modal-backdrop element.  
  Alternatively, specify static for a backdrop which doesn’t close the modal when clicked.  
  
- **focus**  
  boolean, default true  
  Puts the focus on the modal when initialized.  

- **keyboard**  
  boolean, default true  
  Closes the modal when escape key is pressed.  
  
- **dispose**  
  boolean, default true  
  Dispose dialog on hide.  

<br/>

### Confirm Example

```javascript
const ConfirmDlg = Modal({
    close: false,               // don't show any header
    color: "text-bg-danger",
    centered: false,
    body: h5("Are you sure ?"),
    footer: div({class: ""},
        Button({onclick: ()=>ConfirmDlg.close(true), bsSize: "sm", class: "me-2"}, 'Yes'),
        Button({onclick: ()=>ConfirmDlg.close(false), bsSize: "sm"}, 'No'),
    )
});

const DemoConfirm = () => {
    const result = van.state("");
    return div({class: "row"},
        div({class: "col-3"},
            Button({
                onclick: async () => {
                    result.val = await ConfirmDlg.asyncOpen();
                }
            }, "Confirm")
        ),
        div({class: "col-3"}, () => `Result: ${result.val}`),
    )
}
```


### Form Example

```javascript

const LoginDlg = ({name, pw}) => {
    var fb = FormBuilder();
    fb.add({label: 'Name', name: 'name', value: name, id: 'login-dlg-name'});
    fb.add({label: 'Password', name: 'pw', value: pw, type: 'password'});

    var dlg = Modal({
        header: 'Login',
        body: fb.dom,
        footer: div({class: "btn-group btn-group-sm"},
            Button({onclick: ()=>dlg.close(fb.values)}, 'Ok'),
            Button({onclick: ()=>dlg.close(false)}, 'Cancel'),
        )
    });

    // close on Enter pressed
    fb.dom.addEventListener('keypress', event => {
        if (event.key === 'Enter') dlg.close(fb.values);
    });

    // focus first input after open
    dlg.onShown = () => {
        document.getElementById('i_login-dlg-name').focus()
    };

    return dlg;
};

const DemoForm = () => {
    const result = van.state({name: 'Jack', pw: 'secret'});
    return div({class: "row"},
        div({class: "col-3"},
            Button({onclick: async () => {
                let res = await LoginDlg(result.val).asyncOpen();
                if (res) result.val = res;
            }
            }, "Login")
        ),
        div({class: "col-3"}, () => `Result: ${JSON.stringify(result.val)}`),
    )
}

```
<br />

----

<a name="menu" />

# Menu

In addition to the dropdown menu, a popup menu and a context menu are also implemented based on the modal dialog. The MenuItem function simplifies the creation of menus.

## MenuItem

> ### `export function MenuItem ({label, header, divider, text, active, disabled, tag, class, ...props})`

This function returns dom like

```html
<li>
    <button class="dropdown-item" role="button" .../>label</button>
</li>
```

### MenuItem Props

- **label** the visible button children  
- **header**  boolean  
- **divider** boolean  
- **text** boolean  
- **active** boolean  
- **disabled** boolean  
- **tag** string  
  a optional tag overwrite the default tag, like "div"  
- **onclick** event function  
  use `event.preventDefault(); event.stopPropagation();` to prevent the menu from closing in your *onclick* function.  


## DropdownMenu

> ### `export function DropdownMenu (...items)`

For *items* functions or objects are accepted.

```javascript
 DropdownMenu(
    {label: 'Header', header:1},
    MenuItem({label: 'Menu Item', onclick:()=>result.val='Menu Item'}),
    {label: 'Item1',onclick:()=>result.val='Item1'},
)
```

### Dropdown Example

```javascript
const DropdownDemo = () => {
    const result = van.state("");
    return div({class: "row"},
        div({class: "col-3"},
            div({class: "dropdown"},
                Button({dropdown: true}, "Dropdown button"),
                DropdownMenu(
                    {label: 'Header', header:1},
                    {label: 'Item1',onclick:()=>result.val='Item1'},
                    {label: 'active item',active:1,onclick:()=>result.val='active item'},
                    {label: 'Item2',onclick:()=>result.val='Item2'},
                    {divider:1},
                    {label: 'Text',text:1},
                    {label: 'Disabled',disabled:1},
                )
            )
        ),
        div({class: "col-3"}, () => `Result: ${result.val}`),
    )
}
```

## PopupMenu

> ### `export function PopupMenu (...items)`

For *items* functions or objects are accepted.
This function returns a Modal object. Call function *open* to show.

### Popup Example

```javascript
const PopupDemo = () => {
    const result = van.state("");
    return div({class: "row"},
        div({class: "col-3"},
            Button({
                onclick: () => PopupMenu(
                    {label: 'Popup Menu', header:1},
                    MenuItem({label: 'Menu Item', onclick:()=>result.val='Menu Item'}),
                    {label: 'Item1',onclick:()=>result.val='Item1'},
                    {label: 'active item',active:1,onclick:()=>result.val='active item'},
                    {label: 'Item2',onclick:()=>result.val='Item2'},
                    {divider:1},
                    {label: 'Text',text:1},
                    {label: 'Disabled',disabled:1},
                    ).open()
            }, "Popup")
        ),
        div({class: "col-3"}, () => \`Result: \${result.val}\`),
    )
}
```

## ContextMenu

> ### `export function ContextMenu (...items)`

For *items* functions or objects are accepted.
This function returns a Modal object. Call function *open(event)* to show. Function *open* accepts the click event to open the menu at click position.

### Context Menu Example

```javascript
const ContextDemo = () => {
    const result = van.state("");

    const menu = ContextMenu(
        {label: 'Context Menu', header:1},
        MenuItem({label: 'Menu Item', onclick:()=>result.val='Menu Item'}),
        {label: 'Item1',onclick:()=>result.val='Item1'},
        {label: 'Item2',onclick:()=>result.val='Item2'},
    );

    return div({class: "row"},
        div({
            class: "col-12 p-4 mt-3 border rounded-2",
            oncontextmenu: event => menu.open(event),
        },
            h3('right click in this area to open context menu')
        ),
        div({class: "col-3"}, () => \`Result: \${result.val}\`),
    )
}
```
<br />

----

<a name="taginput" />

# TagInput

A form multi select control to edit a list of tag items.

- support visual 'tag sort order' modification.
- support text / value options like select control
- allow to enter items, not in option list
- handle key board

| Props                 | Default |                                                              |
| --------------------- | ------- | ------------------------------------------------------------ |
| **value**             |         | required. Format "a,b,c" or ["a", "b", "c"]                  |
| **options**           | []      | optional array of string to be used in select list<br />or [ ["text1", "value1"], ["text2", "value2"]]<br />comma separated options are allowed<br />see [Select Options](#selectoptions) |
| **oninput( event )** |         | required, value change event feedback                        |
| **commaValue**        | true    | **false:** value is array of string<br />**true:** value is comma separated string |
| **dragSort**          | true    | allow items drag'n drop                                      |
| **delIcon**           | 'none'  | "Remove Cross" position 'left', 'right', 'none'              |
| **orderIcon**         | false   | show minus sign as icon                                      |
| **allowCreate**       | true    | enable edit for new items                                    |
| **multi**             | true    | enable multi select                                          |
| **closeOnCheck** | false | close option list on check |
| **bsSize**            | 'sm'    | bootstrap size                                               |
| **placeholder**       |         | show text if no value                                        |
| **tagColor**       | "text-bg-primary" | badges color like "text-bg-primary" or "text-bg-secondary" |
| **loading**           |         | show spinner on "true"                                       |
| **style**             |       | extra control style<br/>`style:"height:5em;"`               |
| **icons**             | {}      | overwrite icons               |
| **t**             | t=>t      | overwrite translate function               |
| **...props**          |         | extra props                                                  |

<br/>

## Keyboard

- navigate drop down items with up / down key
- press space bar to toggle item
- hold ctrl key to select / deselect all items
- hold shift key to prevent list close

## icons

icons = {IconDelete, IconCheck, IconUncheck, IconAsc,IconDsc}

For example overwrite IconDelete with trash can

```javascript
import { TagInput, Icon, SvgStrIcon} from 'vanjs-bootstrap';

const IconDelete = props => Icon(SvgStrIcon(
    '<svg viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" /></svg>',
    {style: "vertical-align: bottom;", fill: 'currentColor', stroke: 'currenColor', ...props}
));

const tagInput = TagInput({ value, oninput, icons: {IconDelete}})

```

## t

Use your own translate function.

Example

```javascript
const myT = t => {
    const i18nWords = {
        'remove':               'entfernen',
        'ascending':            'aufsteigend',
        'descending':           'absteigend',
        'edplaceholder':        'neuen Tag eingeben',
    };
    return i18nWords[t] ?? t;
}

const tagInput = TagInput({ value, oninput, t: myT})

```

<br/>

<details>
  <summary>Show Demo Code</summary>

```javascript

import van from 'vanjs-core';
import { TagInput, RadioSelectInput, SelectInput, CheckboxInput } from 'vanjs-bootstrap';
import { Icon, SvgStrIcon} from 'vanjs-bootstrap';

const { div, h2, span } = van.tags;

var bsSize = van.state('md');
var color = van.state('');
var allowCreate = van.state(true);
var multi = van.state(true);
var delIcon = van.state('none');
var orderIcon = van.state(false);
var tagValue = van.state("1,2");
// var tagValue = van.state("1,2,aaa,bbb,ccccccccc,dddddddd,eeeeeee,fffffff,ggggggg,hhhhhhh,iiiiiii,jjjjjjj,kkkkkkk");
var value = tagValue.val;

van.derive( ()=> console.log('tagValue change', tagValue.val))


const IconDelete = props => Icon(SvgStrIcon(
    '<svg viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" /></svg>',
    {style: "vertical-align: bottom;", fill: 'currentColor', stroke: 'currenColor', ...props}
));

const myT = t => {
    const i18nWords = {
        'remove':               'entfernen',
        'ascending':            'aufsteigend',
        'descending':           'absteigend',
        'edplaceholder':        'neuen Tag eingeben',
    };
    return i18nWords[t] ?? t;
}

export default function Page() {

    const OptionsBar = div(
        div({ class: "input-group input-group-sm" },

            span({ class: "input-group-text" }, 'bsSize'),
            RadioSelectInput({
                value: bsSize.val,
                oninput: e => bsSize.val = e.target.value,
                options: 'sm,md,lg', 
                // inline: true,
            }),

            span({ class: "input-group-text" }, 'tagColor'),
            SelectInput({
                value: color.val,
                oninput: e => color.val = e.target.value,
                options: ",text-bg-primary,text-bg-secondary,text-bg-success,text-bg-danger,text-bg-warning,text-bg-info,text-bg-light,text-bg-dark",
                style: "max-width: 10em",
            }),

            span({ class: "input-group-text" }, 'delIcon'),
            RadioSelectInput({
                value: delIcon.val,
                oninput: e => delIcon.val = e.target.value,
                options: 'none,left,right', 
                // inline: true,
            }),


            span({ class: "input-group-text" }, 'orderIcon'),
            CbControl({ value: orderIcon.val, oninput: e => orderIcon.val = e.target.value}),

            span({ class: "input-group-text" }, 'multi'),
            CbControl({ value: multi.val, oninput: e => multi.val = e.target.value}),

            span({ class: "input-group-text" }, 'allowCreate'),
            CbControl({ value: allowCreate.val, oninput: e => allowCreate.val = e.target.value}),

        ),
    );

    return div({},
        div({class: "row"},
            h2('TagInput Demo'),
            OptionsBar,
            div({class: "col"},
                TagInput({ bsSize, tagColor: color.val, multi: multi.val,
                allowCreate: allowCreate.val,
                orderIcon: orderIcon.val,
                class: "mt-3",
                placeholder: "placeholder",
                options: [["one","1"],["two","2"],["three","3"],"","x","y"],
                value,
                oninput: ev => {tagValue.val = ev.target.value; value = ev.target.value},
                delIcon: delIcon.val,
                // loading:    true,
                tabindex: "1",
                icons: {IconDelete},
                t: myT,
            }),
            ),
        ),
        ValueState,
    )
}


function ValueState() {
    return div({class: "row"},
        div({class: "col"}, ()=>`value: ${tagValue.val}` )
    )
}


function CbControl({class: clas, bsSize, ...props}) {
    return div(
        {class: "form-control d-flex align-items-center", style: "max-width: 2.25em"},
        CheckboxInput(props)
    )
}
```
</details>


<br />

----

<a name="dragsort" />

# DragSort

A helper to sort a list per drag and drop.

> ### `export function DragSort (list, setList)`

- list:  array to be sorted
- setList: function to store reordered list

Function DragSort returns an object with all required function. The function dragProps of the object can inject all html attributes like draggable, ondragstart and so on.

The function used to be a React Hook, but works great in VanJs and is now used in this library by TagInput.

Usage example:

```javascript
import van          from 'vanjs-core';
import { DragSort } from 'vanjs-bootstrap';

const {div, h2} = van.tags;

const gitems = van.state(["A","B","C"])

function MyList () {
    const drag = DragSort(gitems.val, v => gitems.val=v);  // create drag sort object
    const items = gitems.val.map( (item,index) => {
        return van.tags.li({
            class: () => "list-group-item",
            ...drag.dragProps(index)                // inject properties
            },
            item
        )
    });
    return van.tags.ul({class: "list-group"}, ...items)
}

export default function Page() {
    return div({},
        h2('DragSort Demo'),
        MyList,
    )
}

```
<br />

----

<a name="i18n" />

# i18n

Translation tool. A very simple object for multilingual texts. The texts are stored in the variable `dict` and are divided into language and chapter.

The current language is set with the `setLanguage` function. The texts are retrieved with the function `t`. Texts are added with the `addWords` function.




## Interface

- **dict**  
object tree structured according to language, chapter and subchapter  

- **getLanguage**()  
  current language  

- **setLanguage**(newLanguage)  

- **t**('category.key')  
  returns the text of the current language to a key. 
  the key contains the category, the subcategory and the actual key, separated by a dot  

- **tPath**('category')  
  returns a `t` function for a category  

- **addWords**(words, [lang], [chapter])  
  inserts an object tree with texts into the dict  


## Example

Create a translation instance and add imported JSON files.

```javascript
import {I18n}  from 'vanjs-bootstrap';
import lang_en from './en.json';
import lang_de from './de.json';

const i18n = I18n();

i18n.addWords( lang_en, 'en' );
i18n.addWords( lang_de, 'de' );

let nl = (navigator?.language || 'en').substring(0,2);
i18n.setLanguage(nl);

const {t, tPath, getLanguage, setLanguage} = i18n;
export { t, tPath, getLanguage, setLanguage };
```

<p/>

Toggle language in your App.

```javascript
import van  from 'vanjs-core';
import { tPath, getLanguage, setLanguage }  from './i18n'

const tNav = tPath('nav');  // translate function for chapter 'nav'

const lang = van.state(getLanguage());

// use this in NavBar
const toggleLanguage = () => a({
    class: "nav-link", 
    href: "#", 
    onclick: () => {
        let l = (lang.val === 'en') ? 'de' : 'en'
        setLanguage(l);
        lang.val = l;
        return false;
    },
    title: tNav('lang-title') 
    }, 
    tNav('lang')
);


export default function App() {
    return () => div(
        {lang: lang.val}, // inject lang will redraw app on language change
        AppNav,
        div({class: "container"}, 
            div({class: "row justify-content-md-center"},
                div({class: "col-10 p-4 m-2 border rounded-2"}, 
                ctrl.pageDom.val())
            )
        ),
    )
}
```

<br />

----

<a name="icons" />

# Icons

Icons, the small images used on buttons or in the text, make the UI appealing and clear. One or more libraries such as Font Awesom, Bootstrap or Simple Icons serve as the source. However, it is not uncommon for additional icons to be required that you create yourself, such as your own logo.

The library contains simple functions for displaying and managing icons from different sources.

- [Icon](#icon)
- [Icon Map](#icon-map)
- [setIcon](#function-seticon-key-icon)
- [getIcon](#function-geticon-key)
- [setWarning](#function-setwarning-value)
- [SvgIconBase](#function-svgiconbase-props---children)
- [ImgIcon](#function-imgicon-src-alt-rest)
- [SvgStrIcon](#function-svgstricon-str-svgargs--)



## Icon

> ### `function Icon( anything, {size, ...props} )`

The function icon displays icons on different sources.

- **key of a icon in iconMap**  
    anything = 'key'  

- **UTF-8 char**  
  anything = '🗺️'  

- **SVG string**  
  `anything = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>'`  

- **modified SVG string**  
  `anything = SvgStrIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>',`  
    `{fill: 'currentColor', stroke: 'currentColor'}));`  

- **Image URL**  
  anything = ImgIcon({src: "https://avatars.githubusercontent.com/u/25134550", class: "rounded-4"})  

- **[react-icon](https://react-icons.github.io/react-icons/) object**  

```javascript
  anything = GenIcon({tag: "svg",attr: {viewBox:"0 0 30 10"},child: [  
    {tag: "circle", attr: {cx:"5", cy:"5", r:"3", stroke:"green"}},  
    {tag: "circle", attr: {cx:"15", cy:"5", r:"3", stroke:"green", "stroke-width": "3"}}  
    ]})  
```  

- **VanJs function**  

```javascript
  const {path} = van.tagsNS("http://www.w3.org/2000/svg");  
  anything = props => SvgIconBase({viewBox: "0 0 16 16", ...props},  
    path({d: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"})  
  );  
```

- **Font Awesome class**  
  anything = "fa-solid fa-beer-mug-empty"  


Argument **size** puts width and height and is a CSS value.

`size = '16px' || '2.5em' || '60%' || 'inherit'`

Other '...props' like 'class' or 'style' are passed on.

---

## Icon Map

> ### `export var iconMap = new Map()`

Variable **iconMap** is a JavaScript Map to store icon by key. It is recommended to store icons here and display them with `Icon('key')`.
The best approach is to create an icon library.

file 'icons.js'

```javascript
import van from 'vanjs-core';
import {setIcon, ImgIcon, SvgStrIcon, SvgIconBase} from 'vanjs-bootstrap';
import FormLogo from './form-lib.svg?raw';

const {path} = van.tagsNS("http://www.w3.org/2000/svg");

const sun = props => SvgIconBase({viewBox: "0 0 16 16", ...props},
    path({d: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"})
);

const Beer = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 200v240a40.12 40.12 0 01-40 40H136a40.12 40.12 0 01-40-40V224"></path><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M352 224h40a56.16 56.16 0 0156 56v80a56.16 56.16 0 01-56 56h-40"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M224 256v160m64-160v160M160 256v160m160-304a48 48 0 010 96c-13.25 0-29.31-7.31-38-16H160c-8 22-27 32-48 32a48 48 0 010-96 47.91 47.91 0 0126 9"></path><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M91.86 132.43a40 40 0 1160.46-52S160 91 160 96m-14.17-31.29C163.22 44.89 187.57 32 216 32c52.38 0 94 42.84 94 95.21a95 95 0 01-1.67 17.79"></path></svg>';


setIcon('VANLOGO', ImgIcon({src: "img/vanjs.svg"}));
setIcon('BEER', SvgStrIcon(Beer));
setIcon('BEER_BLUE', SvgStrIcon(Beer, {fill: 'blue', stroke: 'blue'}));
setIcon('FORM', SvgStrIcon(FormLogo, {fill: 'currentColor', stroke: 'currentColor'}));
setIcon('SUN', sun)

```

file 'app.js'

```javascript
import van from 'vanjs-core';
import {Icon} from 'vanjs-bootstrap';
import './icons';  // initialize iconMap

const {div, h1} = van.tags;

export default function App() {
    return () => div(
      h1('VanJs ',Icon('VANLOGO'),' is nice'),
    )
}

```

> ### `function setIcon (key, icon)`

Sets an icon to a key. *icon* should be a function to pass arguments of the function Icon.
Icons can also be derived from other icons.

`setIcon( 'LOGO', props => Icon('VANLOGO', props) )`


> ### `function getIcon (key)`

Gets an icon by key.


> ### `function setWarning (value)`

This is useful for debugging. Value is

- '**get**' logs a warning when a undefined icon should be rendered
- '**all**' logs also if a defined icon is overwritten
- '**off**' disable warnings

### Show Icons Demo

Use this Button to display all icons.

```javascript
import van from 'vanjs-core';
import {Button, Modal, Icon, iconMap} from 'vanjs-bootstrap';

function ShowIconMap() {
    const keys  = [...iconMap.keys()];
    const {div} = van.tags;
    const dlg = Modal({
        header: "Icon Map",
        body: div(
            ...keys.map( key => div({class: "row"},
                div({class: "col"}, key ),
                div({class: "col bg-white text-black"}, Icon(key) ),
                div({class: "col bg-black text-white"}, Icon(key) ),
                div({class: "col col bg-secondary text-black"}, Icon(key) ),
            ))
        ),
        scrollable: true,
    });

    return Button({onclick: ()=>dlg.open()}, "Show Icons");
}
```

## Icon Transformers

> ### `function SvgIconBase (props = {}, ...children)`

Is a base component wrapper for SVG icons build as VanJs function.
The idea behind is to have a SVG image that size is 1em. So it fit to font-size.
"fill" should be "currentColor" to use the font-color.
The icon size (width and height) can be changed by "size" property.

**main props**

- **color** directed to SVG style
- **size** to set SVG width and height
- **class** directed into SVG tag
- **style** directed into SVG tag
- **attr** directed into SVG tag
- **title** inserts a `<title>title</title>` into childrens

```javascript
function MyIcon (props) {
  const {rect} = van.tagsNS("http://www.w3.org/2000/svg");
  return SvgIconBase({viewBox: "0 0 100 100", ...props},
    rect({x:"11.5", y:"9.4", width:"80", height:"80", rx:"4.4444", ry:"4.4444" stroke-width:"8"})
  )
}
```



> ### `function GenIcon(data)`

This function returns a Icon function, where data is a svg data tree:

   `{tag: "svg", attr: {viewBox: "0 0 16 16"}, child: [{tag: ..}, ..]}`

This data format was found by react-icons.
The advantage is the generality of this format, which can be easily transformed, here into a VanJs function.
The first tag is usually "svg". In this function, if the first tag is missing, 
an SvgIconBase function is generated, otherwise a standard SVG function.

```javascript
const moon = GenIcon({
  attr: {viewBox: "0 0 16 16"},
  child:[
    {tag: 'path', attr: {d: "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"}}
  ]
});
```

> ### `function ImgIcon ({src, alt, ...rest})`

Create a Icon function by image url. The "size" is injected as style so we can use units like "em".
For original size use "inherit".
If "alt" is not specified, the last part of the URL is used for this

`setIcon( 'KEY', ImgIcon({src: "img/key.png"}))``


> ### `function SvgStrIcon (str, svgargs = {})`

Create a Icon function from a SVG string. svgargs will overwrite svg attributes like fill and stroke.

```javascript
SvgStrIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>',
  {fill: 'currentColor', stroke: 'currenColor'}
)
```


<br />

----

<a name="selectoptions" />

# SelectOptions

> ### `function selectOptions (list, dom=false, selected)`

All form controls in this library use the selectOptions function. This converts different kind of lists into a uniform format that can easily be mapped into a dom.
Is the `dom` parameter `true`, the function returns a ready mapped dom `option` list.

The `list` parameter accepts four notations:

1. `'TextValue1,TextValue2'`  
  a komma separated list
2. `['TextValue1', 'TextValue2'...]`  
  a array of values
3. `[['Text1', Value1], ['Text2', Value2]...]`  
  a array of display / value pairs
4. `[ {
     value: 1,
     ['children' || 'text' || 'displayValue']
}`  
  a array of objects

Notations can be mixed inside a array.

For example `[ '', ['text 1', 1], ['text 2', 2] ]` will be converted to:

```javascript
[
  {
    value: '',
    children: '',
  },
  {
    value: 1,
    children: 'text 1',
  },
  {
    value: 2,
    children: 'text 2',
  }
]
```

and with `dom=true` and `selected: "1"`:

```javascript
[
 option({value=""}),
 option({value="1", selected: true}, "text 1"),
 option({value="2"}, "text 2"),
]
```

an other example:

```javascript
import {selectOptions} from 'lib';
..
return input({type: 'select', value: fontName}, selectOptions(fontNames, true, fontName))
```
<br />

----

<a name="history" />

## History

- 1.0.5  
  bugfix  
  FormBuilder enhance  

<details>
  <summary>older</summary>

- 1.0.4  
  FormBuilder change  
  add Textarea
  add [TagInput](#taginput)  
  add [DragSort](#dragsort)  
  add tag option for [MenuItem](#menuitem)  

- 1.0.3  
  Modal header style  
  enhance documentation  

- 1.0.2  
  add [repository](https://github.com/WilliCommer/vanjs-bootstrap)  
  formbuilder add returns self  

- 1.0.1  
  add Icons  

- 1.0.0  
  start  

</details>
