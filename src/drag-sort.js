/** @module vanjs-bootstrap/drag-sort **/

/*
    function DragSort
    version 2.0
    modified for vanjs
    version 1.0
    inspired by https://dev.to/florantara/creating-a-drag-and-drop-list-with-react-hooks-4c0i
*/

// const log = 1 ? console.log : ()=>{};


/**
 * DragSort is a helper to sort a list per drag and drop.
 * <br>Function DragSort returns an object with all required function. The function dragProps of the object can inject all html attributes like draggable, onDragStart and so on.
 *
 * 
 * @example Usage example
 * 
 * import van from 'vanjs-core';
 * import DragSort from 'vanjs-bootstrap/drag-sort';
 * 
 * var list = ["A","B","C"];
 * const setList = v => list = v;
 * function MyList ({list, setList, ...props}) {
 *     const drag = DragSort(list, setList);
 *     const items = list.map( (item,index) => {
 *         return van.tags.li({
 *             class: "list-group-item",
 *             ...drag.dragProps(index)
 *             },
 *             item
 *         )
 *     });
 *     return van.tags.ul({class: "list-group", ...props}, ...items)
 * }
 * @version version 2.0 modified for vanjs
 * @module drag-sort
 * @param {Array<*>} list - array to be sorted
 * @param {function} setList - callback function to store reordered list
 * <br>&nbsp;&nbsp; function setList(OrderedResult)
 * @property {function} dragProps(index) - return the html attributes for element `index`
 * @returns {Object}
 */


function DragSort (list, setList) {

    var self = {

        dragProps (index) {
            return {
                draggable:      true,
                ondragstart:    self.ondragstart,
                ondragend:      self.ondragend,
                ondrop:         self.ondrop,
                ondragover:     self.ondragover,
                ondragleave:    self.ondragleave,
                "data-position": index,
            }
        },

        isDropArea (index) {
            return self.dragAndDrop && self.dragAndDrop.draggedTo=== Number(index);
        },

        ondragstart (event) {
            let initialPosition = Number(event.currentTarget.dataset.position);
            // log('onDragStart', initialPosition);
            event.target.classList.add("dragging");
            self.setDragAndDrop({
                ...self.dragAndDrop,
                draggedFrom:    initialPosition,
                isDragging:     true,
                originalOrder:  list
            });
            event.dataTransfer.setData("text/html", '');      // for Firefox.
        },

        ondragend (event) {
            event.target.classList.remove("dragging");
            self.setDragAndDrop({
                ...self.dragAndDrop,
                draggedFrom:    null,
                draggedTo:      null,
                isDragging:     false
            });
        },
    
        ondragover (event) {
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
   
        ondrop (event) {
            setList(self.dragAndDrop.updatedOrder);
            self.setDragAndDrop({
                ...self.dragAndDrop,
                draggedFrom:    null,
                draggedTo:      null,
                isDragging:     false
            });
        },
   
        ondragleave () {
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

export default DragSort;
