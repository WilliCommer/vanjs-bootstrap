# SelectOptions

`function selectOptions (list, dom=false, selected)`

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
