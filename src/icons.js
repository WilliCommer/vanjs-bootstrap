import van from 'vanjs-core';
import {extractAttributes, updateAttributes} from './html-string-attr.js';

/** @module icons **/


/**
 * Maps icon names to icon values used by {@link Icon}.
 * @type {Map<string, Function|string|HTMLElement>}
 * @private
 */
export var iconMap = new Map();

// define at least a empty space icon

iconMap.set('SPACE', props => Icon('\u2001', {...props}) );


/**
 * fetch a icon by name from {@link iconMap}.
 * @param {string} key - icon name the key in iconMap
 * @returns {*}
 */
export function getIcon (key) {
    if (typeof key !== 'string') return false;
    const res = iconMap.get(key);
    return res; 
}


/**
 * Registers an icon under a key in {@link iconMap}.
 * @param {string} key 
 * @param {*} value 
 */
export function setIcon (key, value) {
    iconMap.set(key,value);
}


/**
 * Convert svg string to SVGElement. Use attributes.size to set width and height.
 * @param {string} str - svg string
 * @param {object} attributes - optional attributes (key / value)
 * @returns {SVGElement}
 * @private
 * @example
 * const myString = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red" /></svg>';
 * const svgElement = stringToSvg(myString);
 * document.body.appendChild(svgElement);
 * 
 */

export function stringToSvgElement (str, attributes) {
    if(typeof str !== 'string') return null;
    if(typeof attributes === 'object')
        str = setSvgAttributes( str, attributes );
    const div = document.createElement('div');
    if(typeof window !== 'undefined') {
        // works in browser
        div.innerHTML = str;
        return div.firstChild;
    } else {
        // works in prerender DOM mockup
        div.outerHTML = str;
        return div;
    }
}

/**
 * 
 * @param {string} svgString - `<svg ..`
 * @param {object} attributes - `{size: "42", ..`
 * @returns {string}
 */
export function setSvgAttributes (svgString, attributes) {
    if( svgString && attributes ) {
        // handle pseudo attribute "size"
        if( attributes.size ) {  
            attributes.width = attributes.size;
            attributes.height = attributes.size;
        }
        const elementAttr = extractAttributes(svgString);
        Object.entries(attributes).forEach(([key, value]) => {
            if( key !== 'size' && value !== undefined) {
                elementAttr[key] = value;
            };
        });
        svgString = updateAttributes(svgString, elementAttr)
    }
    return svgString;
}




/**
 * Icon( anything, {size, ...props} )
 * 
 * Create a HTMLElement to display a small (1em by default) image.
 * The value of 'size' is a 'style' value and applies to 'width' and 'height', for example '16px', '2.5em', '60%' or 'inherit'.
 * 
 * First argument is
 * - a key to an image registered with {@link setIcon} like 'MOON'
 * - a UTF-8 char like '🌙'
 * - a SVG string
 * - a object with property 'src' to a image url and optional props 'alt', 'size', class...
 * - a HTMLElement
 * - a function like props=>Icon('MOON', props)
 * - a Font Awesome class like 'fa-solid fa-house'
 * 
 * @param {*} icon - see examples
 * @param {Object} props - optional properties
 * 
 * @see setIcon 
 * 
 * @example key of icon in iconMap
 * Icon( 'key' )
 * 
 * @example UTF-8 char
 * Icon( '🗺️' )
 * 
 * @example SVG string
 * Icon( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>' )
 * 
 * @example SVG string with extra attributes
 * Icon( 
 *   '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>',
 *   {class: 'ms-3 border', size: '2.2em', onclick:()=>console.log('smile')}
 * )
 * 
 * @example Image URL
 * Icon( {src: "https://avatars.githubusercontent.com/u/25134550"), {class: "rounded-4"} )
 *
 * @example VanJs function
 * const {circle, path, svg} = van.tags
 * const Smiley = (props) => svg({width: "16px", viewBox: "0 0 50 50", ...props},
 *  circle({cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow"}),
 *  circle({cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
 *  circle({cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
 *  path({"d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent"}),
 * )
 *
 * setIcon('Smiley', Smiley)
 * Icon('Smiley', {width: '2.5em'})
 * 
 * @example Font Awesome class
 * Icon( "fa-solid fa-beer-mug-empty" )
 * 
*/

export function Icon (icon, {size, ...props} = {}) {

    // is it in iconMap ?
    if (typeof icon === 'string') {                        
        const storedIcon = getIcon(icon);
        if (storedIcon) 
            icon = storedIcon;
    }

    // is it SVGElement
    // if (icon instanceof SVGElement) {
    //     setSvgAttributes( icon, {size,...props} );
    //     return icon;
    // }
    
    // is it a function ? maybe VanJs
    if (typeof icon === 'function') {                           
        if (size !== undefined) { props.size = size; }
        size = size || props.size || "1em";
        delete props.size
        props.width = size
        props.height = size
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

    // is it "<svg ..>..</svg>"
    if (typeof icon === 'string' && icon.toLowerCase().startsWith('<svg ')) {       
        size = size === undefined ? '1em' : size;
        return stringToSvgElement( icon, {size,...props});
    } 

    // is it a UTF-8 text ?
    if ((typeof icon === 'string')) {   
        let style = '';
        if(size !== undefined) style = `font-size:${size};`;
        if(props.style) style += props.style;
        if (style) props.style = style;
        return van.tags.span(props, icon);
    }

    // is it a image url
    if(icon.src) {
        if(size === undefined) size = '1em'
        props.style = (props.style || icon.style || '') + `width:${size}; height:${size};`
        props.alt = icon.alt || props.alt || icon.src.split('/').pop().split('.').shift()
        props = {
            ...icon,
            ...props
        }
        return van.tags.img(props);
    }
    
    // undefined icon
    size = size === undefined ? '1em' : size;
    let s = `width:${size}; height:${size}; min-width:${size};`;
    if(props.style) s += props.style;
    props.style = s;

    return van.tags.div({...props});
}


/**
 * The function returns a sprite containing all the SVGs defined in the iconMap and converts the registered SVGs into references. This sprite can then be appended to the document.body element.
 * 
 * @param {object} options - optional
 * @param {string} options.idPrefix - idPrefix + key builds the use reference. Default = 'icon-'  
 * @param {string} options.svgClass - extra class added to the reference. Default = '' 
 * @param {string} options.spriteId - optianal id for the generated sprite
 * @param {boolean} options.prettify - formated output. Default = false 
 * @param {boolean} options.toDOM - append sprite to document.body, Default false
 * @param {Map} options.map - Map with svg strings. Default is iconMap
 * @returns {string} - sprite string
 */
export function spriteify( options ) {

    // merge options with defaults
    const { 
        idPrefix = 'icon-', 
        svgClass, 
        spriteId,
        toDOM = false,
        prettify = false,
        map = iconMap,
    } = (options || {})

    function svgToSymbol( rawSvg, id ) {
        // Replace the opening <svg with <symbol id="YourID"
        let cleanSvg = rawSvg.replace(/<svg/i, `<symbol id="${id}"`);
        // Replace the closing </svg> with </symbol>
        cleanSvg = cleanSvg.replace(/<\/svg>/i, '</symbol>');
        // Specifically remove xmlns, width, and height, along with their values, from the start tag
        const args = extractAttributes( cleanSvg );
        delete args.xmlns;
        delete args.width;
        delete args.height;
        cleanSvg = updateAttributes( cleanSvg, args );
          return cleanSvg;
    }


    const list = [];
    for (const key of map.keys()) {
        const icon = map.get(key)
        if ( typeof icon === 'string' && icon.slice(0,5).toLowerCase() === '<svg ') {
            const id = idPrefix + key
            list.push( svgToSymbol( icon, id ) );
            const newIconStr = `<svg ${svgClass ? 'class="'+svgClass+'"' : ''}><use href="#${id}"></use></svg>`;
            map.set( key, newIconStr )
        }
    };

    if(!list.length) return '';
    
    let result = `<svg ${spriteId ? 'id="'+spriteId+'"' : ''} style="display: none;" xmlns="http://w3.org">`;
    if( prettify ) result += '\n  ';
    result += list.join( prettify ? '\n  ' : '' );
    if( prettify ) result += '\n';
    result += '</svg>';

    if(toDOM) document.body.appendChild(Icon(result));

    return result;
}

