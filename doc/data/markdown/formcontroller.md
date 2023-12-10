# FormController

> ##### `export function FormController ({values})`

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

