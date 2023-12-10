# Input Controls

The special Bootstrap form controls are implemented in the library and can be imported. In the FormGroup the controls are specified as “type”. The mapping is the Map "typeMap".

A special feature of SelectInput, RadioSelectInput and ComboboxInput is that the options are not specified as children, but as an attribute "options". The value here is a list. See [selectOptions](#selectoptions) for details.

## API

```javascript
export function Input({class: clas, bsSize, ...props})

export function FormLabel({class: clas, bsSize, col, ...props}, children)

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
| 'textarea' |        Input |
| 'select' |          SelectInput |
| 'radioselect' |     RadioSelectInput |
| 'checkbox' |        CheckboxInput |
| 'radio' |           RadioInput |
| 'switch' |          FormCheckInput |
| 'combobox' |        ComboboxInput |


