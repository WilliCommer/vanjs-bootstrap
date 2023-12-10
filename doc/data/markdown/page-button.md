# Button

> ##### `export function Button ({bsSize, class, color='secondary', outline, dropdown, ...props}, children)`

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
