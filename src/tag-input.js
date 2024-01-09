/*
    TagInput

    A form multi select control to edit a list of tag items.
    Support visual 'tag sort order' modification. 

*/



import van                          from 'vanjs-core';
import selectOptions                from './select-options';
import { Button, Input }            from './form-controls';
import { Icon, SvgStrIcon }         from './icon-map';
import { DropdownMenu, MenuItem }   from './modal';
import DragSort                     from './drag-sort';

const SUBMIT_KEYS   = ['Enter',' ',','];                        // triggers submit in edit controll
const BS_SIZE       = "";                                       // default bootstrap size
const T_COLOR       = "text-bg-primary";                      // badge color

const hasSign       = value => (typeof value === 'string' && value[0] === '-');
const removeSign    = value => hasSign(value) ? value.substring(1) : value;

const IconDelete = props => Icon('🗙', props);
const IconCheck  = props => Icon('☒', props);
const IconUncheck  = props => Icon('☐', props);
const IconAsc = props => Icon(SvgStrIcon(
    '<svg viewBox="0 0 576 512"><path d="M183.6 42.4C177.5 35.8 169 32 160 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L128 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 320c0 17.7 14.3 32 32 32h50.7l-73.4 73.4c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H429.3l73.4-73.4c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H352c-17.7 0-32 14.3-32 32zM416 32c-12.1 0-23.2 6.8-28.6 17.7l-64 128-16 32c-7.9 15.8-1.5 35 14.3 42.9s35 1.5 42.9-14.3l7.2-14.3h88.4l7.2 14.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9l-16-32-64-128C439.2 38.8 428.1 32 416 32zM395.8 176L416 135.6 436.2 176H395.8z" /></svg>',
    {style: "vertical-align: bottom;", fill: 'currentColor', stroke: 'currenColor', ...props}
));
const IconDsc = props => Icon(SvgStrIcon(
    '<svg viewBox="0 0 576 512"><path d="M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L128 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 320c0-17.7 14.3-32 32-32H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L402.7 352H352c-17.7 0-32-14.3-32-32zM416 32c12.1 0 23.2 6.8 28.6 17.7l64 128 16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3L460.2 224H371.8l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32 64-128C392.8 38.8 403.9 32 416 32zM395.8 176h40.4L416 135.6 395.8 176z" /></svg>',
    {style: "vertical-align: bottom;", fill: 'currentColor', stroke: 'currenColor', ...props}
));

const i18nWords = {
    'remove':               'remove',
    'ascending':            'ascending',
    'descending':           'descending',
    'edplaceholder':        'enter new tag',
};

const {div, span} = van.tags;

/*
    Tag Input Component
*/


function TagInput ({
    value,                      // required. Format "a,b,c" or ["a", "b", "c"]
    commaValue      = true,     // value is array of string or comma separated value 
    options         = [],       // optional array of string to be used in select list
    oninput,                    // required, value change event feedback
    disabled,
    onContextMenu,              // optional function( event, item )
    dragSort        = true,     // allow items drag'n drop
    delIcon         = 'none',   // "Remove Cross" position 'left','right','none'
    orderIcon       = false,    // show minus sign as icon
    allowCreate     = true,     // enable edit for new items
    multi           = true,     // enable multi select 
    bsSize          = BS_SIZE,  // bootstrap size  
    closeOnCheck    = false,    // close option list on check
    tagColor,                   // badges color
    style,                      // extra style
    placeholder,                // show text if no value
    loading,                    // show spinner on "true"
    tabindex        = 0,
    icons,                      // overwrite icons
    t,                          // overwrite translate
    ...props                    // extra props
}) {

    value = van.val(value);
    if (typeof value === 'string') value = value.split(',');
    if (!value || !Array.isArray(value)) value = [];
    value = value.filter(i=>i);                                     // remove ''
    style = (style ?? '') + ' heigt: auto;';

    var dropdownBtn, tagOptions;

    const tagData = {
        items: van.state(value),
        listvalue: van.state(value),
        options: updateOptions(options, value),
        disabled,
        onContextMenu,
        dragSort, delIcon, orderIcon, allowCreate, multi, closeOnCheck, bsSize,
        tagColor: tagColor || T_COLOR,
        placeholder,
        loading,
        tabindex,
        icons: {
            IconDelete, IconCheck, IconUncheck, IconAsc,IconDsc,
            ...(icons || {})
        },    
        t: t || (t => {return i18nWords[t] ?? t}),

        checkItem(item,check) {
            item = removeSign(item);
            if (this.multi) {
                this.saveItems(check ? [...this.items.val, item] : this.items.val.filter(v => removeSign(v) !== item));
            } else {
                this.saveItems(check ? [item] : []);
            }
        },
        saveItems(value) {
            this.items.val = value;
            if(!this.isOpen && oninput) {
                this.listvalue.val = value;
                oninput({ target: { 
                    name:   props.name, 
                    value:  commaValue ? value.join(',') : value, 
                    type:   'tagedit'
                }})
            };
        },
        checkAll(item,check) {
            if (this.multi) {
                this.saveItems(check ? [...this.options.map(o => o.value)] : []);
            } else {
                this.checkItem(item,check);
            }
        },
        onOrderClick(item, desc) {
            let idx     = this.items.val.indexOf(item);
            let is_desc = hasSign(item);
            if (idx !== -1 && desc !== is_desc) {
                let next = [...this.items.val];
                next[idx] = desc ? '-'+item : item.substring(1);
                this.saveItems(next);
            }
        },
        newItem(item) {
            if(item && !this.items.val.some(e => removeSign(e) === item) ) {        // is it new ?
                // this.isOpen = false;
                this.hideDropdown();
                this.checkItem(item, true);
            }
            // if (!this.multi) setDropdownOpen(false);
        },
        showDropdown() {
            if(!this.isOpen) this.toggleDropdown();
        },
        hideDropdown() {
            if(this.isOpen) this.toggleDropdown();
        },
        toggleDropdown() {
            dropdownBtn.click();
        },
    };

    dropdownBtn = Button({dropdown: true, disabled});
    tagOptions  = TagOptions({tagData});


    dropdownBtn.addEventListener('shown.bs.dropdown', event => {
        tagData.isOpen = true;
    })
    dropdownBtn.addEventListener('hidden.bs.dropdown', event => {
        tagData.isOpen = false;
        tagData.saveItems(tagData.items.val);
    })


    return InputGroup({bsSize, ...props, style},
        TagList({tagData}),
        dropdownBtn,
        tagOptions,
    )
    
}


function TagList({tagData}) {

    if (van.val(tagData.loading)) {
        return  ControlFrame({}, 
            div({class: "spinner-border spinner-border-sm " + tagData.tagColor.replace("-bg",""), role:"status"},
                span({class: "visually-hidden"},"Loading...")
        ));
    }

    const drag = (tagData.dragSort && tagData.multi && !tagData.disabled) ? DragSort(tagData.listvalue.val, v => tagData.saveItems(v)) : false;

    var list = tagData.listvalue.val.map( (item, idx) => TagItem({tagData, item, idx, drag}) );

    if (list.length === 0 && tagData.placeholder) {
        if (typeof tagData.placeholder === 'string')
            list = [span({class: "text-muted"}, tagData.placeholder)];
        else
            list = [placeholder];
    }

    return ControlFrame({
        tabindex: tagData.tabindex,
        onclick(event) {
            event.preventDefault();
            event.stopPropagation();
            tagData.toggleDropdown();
        }
    }, ...list);
}



function TagItem({tagData, item, idx, drag}) {

        var label = valueToDisplay(tagData.options, removeSign(item));
        var itemProps = {
            class: "badge " + tagData.tagColor + " me-1 my-1",
            style: "fontSize: 90%;",
        };

        if (drag) {
            itemProps = {
                ...itemProps,
                style: itemProps.style + "cursor: grab;",
                ...drag.dragProps(idx),
            }
        }

        const DelIcon = c => div({
            class:  c,
            role:   'button',
            title:  tagData.t('remove'),
            onclick: ev => {
                ev.preventDefault();
                ev.stopPropagation();
                tagData.checkItem(item,false)
            },
        }, tagData.icons.IconDelete );

        const OrderIcon = desc => div({
            class:  "ms-1",
            role:   'button',
            title:  desc ? tagData.t('descending') : tagData.t('ascending'),
            onclick: ev => {
                ev.preventDefault();
                ev.stopPropagation();
                tagData.onOrderClick(item,!desc)
            },
        }, (desc ? tagData.icons.IconDsc : tagData.icons.IconAsc) );

        var children = [];
        if (tagData.delIcon === "left") {
            children.push(DelIcon("me-1"))
        }
        children.push(label)
        if (tagData.orderIcon) {
            children.push(OrderIcon(hasSign(item)))
        }
        if (tagData.delIcon === "right") {
            children.push(DelIcon("ms-1"))
        }


        return span({...itemProps}, div({class: 'd-flex'}, ...children) );
}





function TagOptions ({tagData}) {

    const list = tagData.options.map( item => OptionItem({
        tagData, item
    }) );

    if (tagData.allowCreate) {              // add edit control
        list.unshift(MenuItem({divider: 1}));
        list.unshift(MenuItem({
            text:       true,
            tag:        'div',
            toggle:     false,
            label:      TagInputText({
                bsSize:     tagData.bsSize,
                tabIndex:   "0",
                placeholder: tagData.t('edplaceholder'),
                onChange:   (txt) => tagData.newItem(txt),
                // onClose:    () => toggleDropdown(),
            }),
        }));
    }


    return DropdownMenu(...list)

}



function OptionItem ({tagData, item}) {

    const noclose = tagData.multi && !tagData.closeOnCheck ? event => {event.preventDefault(); event.stopPropagation();} :  ()=>{}; 
    const checked = () => !!tagData.items.val.find( e => removeSign(e) === item.value );

    if (item.value === '') {
        return MenuItem({class: "py-0", divider:1})    // ciao divider ..
    }

    return MenuItem({
        label:  div(
            {class: "d-flex align-items-center"},
            () => checked() ? tagData.icons.IconCheck({class:"me-1"}) : tagData.icons.IconUncheck({class:"me-1"}),
            item.children
        ),
        class: "py-0", 
        onclick:    (event) => {
            noclose(event);
            if (event.ctrlKey)
                tagData.checkAll(item.value, !checked())
            else
                tagData.checkItem(item.value, !checked());
        },
        onkeydown: (event) => {
            if (event.which === 32) {
                noclose(event);
                if (event.ctrlKey)
                    tagData.checkAll(item.value, !checked())
                else
                    tagData.checkItem(item.value, !checked());
            }
        },
    })
}



function TagInputText ({onChange, ...props}) {

    var value = '';

    const Control = Input({
        type:           'text',
        value:          value,
        bsSize:         props.bsSize,
        placeholder:    props.placeholder,
        oninput(event)  {value = event.target.value},
        onblur()        {onChange(value)},
        onkeypress(event) {
            if (SUBMIT_KEYS.includes(event.key) ) {
                event.preventDefault();
                event.stopPropagation();
                onChange(value);
                value = '';
            }
        },
    })

    return Control;
}


function ControlFrame({class: clas, bsSize, ...props}={}, ...children) {               // a form control look like frame
    return div({
            class: () => {
                let res = 'form-control';
                if(van.val(bsSize)) res += ' form-control-' + van.val(bsSize);
                if(van.val(clas)) res += ' ' + van.val(clas);
                return res;
            },
            ...props,
        },
        ...children
    )
}

function InputGroup({class: clas, bsSize, ...props}={}, ...children) {               // a form control look like frame
    return div({
            class: () => {
                let res = 'input-group';
                if(van.val(bsSize)) res += ' input-group-' + van.val(bsSize);
                if(van.val(clas)) res += ' ' + van.val(clas);
                return res;
            },
            ...props,
        },
        ...children
    )
}


function valueToDisplay (options, value) {
    var oItem = options.find( o => o.value === value );             // lookup in options to get associated display value
    if (oItem) value = oItem.children;
    return value;
}


function updateOptions (options, value) {
    options = selectOptions(options);                               // split value / display
    value.forEach( v => {
        v = removeSign(v);
        if (!options.find(o => o.value === v))                      // add value if not in options 
            options.unshift({value: v, children: v, key: v});
    });
    return options;
}



export default TagInput;
