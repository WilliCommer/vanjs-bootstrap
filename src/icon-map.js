import van from 'vanjs-core';

export var iconMap = new Map();
var warning = 0;
var warnMap = new Map();


export function getIcon (key) {
    if (typeof key !== 'string') return false;
    var res = iconMap.get(key);
    if (!res && warning > 0 && !warnMap.get(key)) {
        console.warn('Get unknown icon', key);
        // console.trace();
        warnMap.set(key,true);
    }
    return res; 
}

export function setIcon (key, value) {
    if (warning > 1 && iconMap.get(key)) {
        console.warn('Redefine icon', key);
    }
    iconMap.set(key,value);
}

export function setWarning (value) {
    switch (value) {
        case 0: case 1: case 2:
            warning = value;
            break;
        case 'all': warning = 2; break;
        case 'get': warning = 1; break;
        default: warning = 0;
    }
}


/*
    SvgIconBase 

    Is a base component wrapper for SVG icons. 
    The idea behind is to have a SVG image that size is 1em. So it fit to font-size.
    fill should be "currentColor" to use the font-color.
    The icon size (width and height) can be changed by "size" property

    This is based on react-icons (https://github.com/react-icons/react-icons)

    function MyIcon (props) {
        return SvgIconBase({viewBox: "0 0 100 100", ...props},
            rect({x:"11.5", y:"9.4", width:"80", height:"80", rx:"4.4444", ry:"4.4444", fill:"none" stroke-width:"8"})
        )
    }

*/

export function SvgIconBase (props = {}, ...children) {

    const {attr, size, title, ...svgProps} = props;
    const computedSize = size || "1em";
    let className = '';
    if (props.class) className += (className ? className + ' ' : '') + props.class;
    let style = props.color ? `color: ${props.color}; ` : '';
    if(props.style) style += props.style;

    return van.tagsNS("http://www.w3.org/2000/svg").svg({
        stroke: "currentColor",
        fill: "currentColor",
        "stroke-width": "0",
        ...attr,
        ...svgProps,
        class: className,
        style,
        height: computedSize,
        width: computedSize,
        },
        (title ? van.tagsNS("http://www.w3.org/2000/svg").title(title) : null),
        ...children
    )
}    



/*
    GenIcon(data) 

    where data is svg data tree:
    {tag: "svg", attr: {viewBox: "0 0 16 16"}, child: [{tag: ..}, ..]}

    This data format was found by react-icons. 
    The advantage is the generality of this format, which can be easily transformed, here into a VanJs function.
    The first tag is usually "svg". In this function, if the first tag is missing, 
    an SvgIconBase function is generated, otherwise a standard SVG function.

    const moon = GenIcon({
        attr: {viewBox: "0 0 16 16"},
        child:[{tag: 'path', attr: {d: "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"}}
        ]
    });

*/

export function GenIcon(data) {
    
    function Tree2Element(tree) {
        return tree && tree.map(
            (node, i) => van.tagsNS("http://www.w3.org/2000/svg")[node.tag]({...node.attr}, Tree2Element(node.child))
        );
    }
    
    if(data.tag === "svg")
        return (props={}) => van.tagsNS("http://www.w3.org/2000/svg").svg({...data.attr, ...props}, ...Tree2Element(data.child));
    return (props={}) => SvgIconBase({...data.attr, ...props}, ...Tree2Element(data.child));
}



/*
    ImgIcon
    Create a icon by image url. The "size" is injected as style so we can use units like "em".
    For original size use "inherit".
    
    setIcon( 'KEY', ImgIcon({src: "img/key.png"}))
*/

export function ImgIcon ({src, alt, ...rest}) {
    return ({size='1em', style='', ...props} = {}) => van.tags.img({
            src, 
            alt:    alt || src.split('/').pop(),
            style:  style + `width:${size}; height:${size};`,
            ...rest,
            ...props
        })
}



/*
    SvgStrIcon(str, svgargs)
    Create a icon from a SVG string. svgargs will overwrite svg attributes like fill and stroke.

    SvgStrIcon(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>',
        {fill: 'currentColor', stroke: 'currenColor}
    )
*/

export function SvgStrIcon (str, svgargs = {}) {
    return ({size='1em', ...props} = {}) => {
        var dom = document.createElement('div');
        dom.innerHTML = str;
        dom = dom.firstChild;
        props.width = size;
        props.height = size;
        Object.keys(svgargs).forEach( key => dom.setAttribute(key, svgargs[key]));
        Object.keys(props).forEach( key => dom.setAttribute(key, props[key]));
        return dom;
    }
}



/*
    Icon( anything, {size, ...props} )

    // key of icon in iconMap
    anything = 'key'    

    // UTF-8 char
    anything = '🗺️'

    // SVG string
    anything = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>'

    // modified SVG string
    anything = SvgStrIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>',
         {fill: 'currentColor', stroke: 'currentColor'}));

    // Image URL
    anything = ImgIcon({src: "https://avatars.githubusercontent.com/u/25134550", class: "rounded-4"})

    // react-icon object
    anything = GenIcon({tag: "svg",attr: {viewBox:"0 0 30 10"},child: [
        {tag: "circle", attr: {cx:"5", cy:"5", r:"3", stroke:"green"}},
        {tag: "circle", attr: {cx:"15", cy:"5", r:"3", stroke:"green", "stroke-width": "3"}}
    ]})

    // VanJs function
    const {path} = van.tagsNS("http://www.w3.org/2000/svg");
    anything = props => SvgIconBase({viewBox: "0 0 16 16", ...props},
        path({d: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"})
    );

    // Font Awesome class
    anything = "fa-solid fa-beer-mug-empty"


    size = '16px' || '2.5em' || '60%' || 'inherit'

*/


export function Icon (icon, {size, ...props} = {}) {

    // is it in iconMap ?
    var Icon = getIcon(icon);
    if (Icon) {
        if(typeof Icon === 'function')
            return Icon({size, ...props})
        else
          icon = Icon;
    }
    
    // is it a svg ?
    // a artifact from React version
    if (typeof icon === 'function') {                           
        props.size = size;
        return icon({...props});
    }

    // is it fontawesome
    else if (typeof icon === 'string' && icon.startsWith('fa')) {                        
    
        if (size !== undefined) {
            props.style = props.style = {
                ...(props.style || {}),
                fontSize: size
            }
        }
        props.class = props.class ? props.class + ' ' + icon : icon

        return van.tags.i({...props});
    } 

    // is it <svg ..>..</svg>
    else if (typeof icon === 'string' && icon.startsWith('<svg ')) {       
        return SvgStrIcon(icon)({size,...props});
    } 

    // is it a UTF-8 ?
    else if ((typeof icon === 'string')) {   
    
        if (size !== undefined) {
            let s = 'font-size:' + size + ';';
            if(props.style) s += props.style;
            props.style = s;
        }

        // return van.tags.div({...props}, icon);
        return van.tags.span({...props}, icon);
    }

    
    // undefined icon

    size = size === undefined ? '1em' : size;
    let s = `width:${size}; height:${size}; min-width:${size};`;
    if(props.style) s += props.style;
    props.style = s;

    return van.tags.div({...props});
}


// define at least a empty space icon

iconMap.set('SPACE', props => Icon('\u2001', {...props}) );
