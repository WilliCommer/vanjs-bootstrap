# Menu

In addition to the dropdown menu, a popup menu and a context menu are also implemented based on the modal dialog. The MenuItem function simplifies the creation of menus.

## MenuItem

> ##### export function MenuItem ({label, header, divider, text, active, disabled, class, ...props})

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
- **onclick** event function  

## DropdownMenu

> ##### export function DropdownMenu (...items)

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

> ##### export function PopupMenu (...items)

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

> ##### export function ContextMenu (...items)

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
