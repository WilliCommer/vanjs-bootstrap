# FormBuilder

> ##### `export function FormBuilder ({dom, values, rowClass="", formClass="", cols, autoRow, bsSize, id, onChange}={})`

The FormBuilder inherits from [FormController](#formcontroller). With it you can easily create forms in Bootstrap grid format.

- Create a FormBuilder with `function FormBuilder(dom)`
- Start a new row with `addRow(class)`
- Finish a row with `addRow(null)` or `addRow(class)` for next row
- Add a form group with label and input control with `add(props)`
- Add the form into dom tree with variable `dom`
- Check form validation with `getFormValid()` when `onvalidate` is used in `add`

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


