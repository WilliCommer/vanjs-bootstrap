# DragSort

A helper to sort a list per drag and drop.

> ### `export function DragSort (list, setList)`

- list:  array to be sorted
- setList: function to store reordered list

Function DragSort returns an object with all required function. The function dragProps of the object can inject all html attributes like draggable, ondragstart and so on.

The function used to be a React Hook, but works great in VanJs and is now used in this library by TagInput.

During dragging CSS :dragging is set.

Usage example:

```javascript
import van          from 'vanjs-core';
import { DragSort } from 'vanjs-bootstrap';

const {div, h2} = van.tags;

const gitems = van.state(["A","B","C"])

function MyList () {
    const drag = DragSort(gitems.val, v => gitems.val=v);  // create drag sort object
    const items = gitems.val.map( (item,index) => {
        return van.tags.li({
            class: () => "list-group-item",
            ...drag.dragProps(index)                // inject properties
            },
            item
        )
    });
    return van.tags.ul({class: "list-group"}, ...items)
}

export default function Page() {
    return div({},
        h2('DragSort Demo'),
        MyList,
    )
}

```
