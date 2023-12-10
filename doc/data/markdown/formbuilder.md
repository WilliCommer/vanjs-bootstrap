# FormBuilder

> ##### `export function FormBuilder (dom)`

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

<details>
  <summary>Show FormBuilder Code</summary>

## FormBuilder Code

```javascript
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
```

</details>


