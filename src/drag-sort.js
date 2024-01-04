/*
# function DragSort

A helper to sort a list per drag and drop.

> ### `export function DragSort (list, setList)`

- list:  array to be sorted
- setList: function to store reordered list

Function DragSort returns an object with all required function. The function dragProps of the object can inject all html attributes like draggable, onDragStart and so on.

Usage example:

```javascript
var list = ["A","B","C"];
const setList = v => list = v;

function MyList ({list, setList, ...props}) {
    const drag = DragSort(list, setList);
    const items = list.map( (item,index) => {
        return van.tags.li({
            class: "list-group-item",
            ...drag.dragProps(index)
            },
            item
        )
    });
    return van.tags.ul({class: "list-group", ...props}, ...items)
}
```

version 2.0
modified for vanjs
version 1.0
inspired by https://dev.to/florantara/creating-a-drag-and-drop-list-with-react-hooks-4c0i

*/


// const log = 1 ? console.log : ()=>{};


export default function DragSort (list, setList) {

    var self = {

        dragProps (index) {
            return {
                draggable:      true,
                ondragstart:    self.onDragStart,
                ondrop:         self.onDrop,
                ondragover:     self.onDragOver,
                ondragleave:    self.onDragLeave,
                "data-position": index,
            }
        },

        isDropArea (index) {
            return self.dragAndDrop && self.dragAndDrop.draggedTo=== Number(index);
        },

        onDragStart (event) {
            let initialPosition = Number(event.currentTarget.dataset.position);
            // log('onDragStart', initialPosition);
            self.setDragAndDrop({
                ...self.dragAndDrop,
                draggedFrom:    initialPosition,
                isDragging:     true,
                originalOrder:  list
            });
            event.dataTransfer.setData("text/html", '');      // for Firefox.
        },
    
        onDragOver (event) {
            event.preventDefault();
            let newList     = self.dragAndDrop.originalOrder;
            let draggedFrom = self.dragAndDrop.draggedFrom; 
            let draggedTo   = Number(event.currentTarget.dataset.position); // index of the droppable area being hovered
            let itemDragged = newList[draggedFrom];
            let remainingItems = newList.filter((item, index) => index !== draggedFrom);
            newList = [
                ...remainingItems.slice(0, draggedTo),
                itemDragged,
                ...remainingItems.slice(draggedTo)
            ];
            if (draggedTo !== self.dragAndDrop.draggedTo) {
                self.setDragAndDrop({
                    ...self.dragAndDrop,
                    updatedOrder: newList,
                    draggedTo:    draggedTo
                })
            }
        },
   
        onDrop (event) {
            setList(self.dragAndDrop.updatedOrder);
            self.setDragAndDrop({
                ...self.dragAndDrop,
                draggedFrom:    null,
                draggedTo:      null,
                isDragging:     false
            });
        },
   
        onDragLeave () {
            self.setDragAndDrop({
                ...self.dragAndDrop,
                draggedTo: null
            });
        },

    };


    const initialDnDState = {
        draggedFrom:    null,
        draggedTo:      null,
        isDragging:     false,
        originalOrder:  [],
        updatedOrder:   []
    };
    

    self.dragAndDrop    = initialDnDState;
    self.setDragAndDrop = value => self.dragAndDrop = value;

    return self;
}    
