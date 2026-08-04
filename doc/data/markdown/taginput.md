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

## Overwrite Translate Function

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


