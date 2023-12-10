# FormGroup

> ##### `export function FormGroup({name, label, type, input, class, bsSize, cols, id, ...props})`

FormGroup creates a combination of label and input.
The most important arguments are "name", "label" and "type".
The value for "type" is usually an [\<input\> type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types). However, special input fields can either be passed as "input" (a van function) or registered in *typeMap* with their own "type" ([see example](#align-demo)).
The "id" can be specified, but will be generated automatically if not present.
All other arguments in "...props" are passed to the input element, such as "oninput" and "value".
The elements are displayed on top of each other.
If col is set, they can also be placed next to each other in a row. For example `col: "2 4"` uses 2 colums for the label and 4 colums for the input.



See [FormBuilder Demo](#formbuilder) for example.

<details>
  <summary>Show FormGroup Code</summary>

## FormGroup Code

```javascript
export function FormGroup({name, label, class: clas, bsSize, cols, id, ...props}) {
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


    return div({class: cl, ...props},
        FormLabel({bsSize, for: i_id}, label),
        domInput({bsSize, name, id: i_id, ...props})
    );
}
```

</details>

