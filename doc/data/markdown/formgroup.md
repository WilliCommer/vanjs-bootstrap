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
| col | Bootstrap column size of the group alternative to cols. i.e. `col: "col-md-6"` creates a `<div class="col-md-6"`. Used for form class "row g-3". |
| id | HTML id of group. Will get random id if omited. Label id is id+'-l', input id is id + '-i' |
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

