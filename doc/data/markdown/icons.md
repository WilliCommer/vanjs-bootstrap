# Icons

Icons, the small images used on buttons or in the text, make the UI appealing and clear. One or more libraries such as Font Awesom, Bootstrap or Simple Icons serve as the source. However, it is not uncommon for additional icons to be required that you create yourself, such as your own logo.

The library contains simple functions for displaying and managing icons from different sources.

## Icon

> ##### function Icon( anything, {size, ...props} )

The function icon displays icons on different sources.

- **key of a icon in iconMap**  
    anything = 'key'  

- **UTF-8 char**  
  anything = '🗺️'  

- **SVG string**  
  `anything = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>'`  

- **modified SVG string**  
  `anything = SvgStrIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>',`  
    `{fill: 'currentColor', stroke: 'currentColor'}));`  

- **Image URL**  
  anything = ImgIcon({src: "https://avatars.githubusercontent.com/u/25134550", class: "rounded-4"})  

- **[react-icon](https://react-icons.github.io/react-icons/) object**  

```javascript
  anything = GenIcon({tag: "svg",attr: {viewBox:"0 0 30 10"},child: [  
    {tag: "circle", attr: {cx:"5", cy:"5", r:"3", stroke:"green"}},  
    {tag: "circle", attr: {cx:"15", cy:"5", r:"3", stroke:"green", "stroke-width": "3"}}  
    ]})  
```  

- **VanJs function**  

```javascript
  const {path} = van.tagsNS("http://www.w3.org/2000/svg");  
  anything = props => SvgIconBase({viewBox: "0 0 16 16", ...props},  
    path({d: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"})  
  );  
```

- **Font Awesome class**  
  anything = "fa-solid fa-beer-mug-empty"  


Argument **size** puts width and height and is a CSS value.

`size = '16px' || '2.5em' || '60%' || 'inherit'`

Other '...props' like 'class' or 'style' are passed on.

---

## Icon Map

> ##### export var iconMap = new Map()

Variable **iconMap** is a JavaScript Map to store icon by key. It is recommended to store icons here and display them with `Icon('key')`.
The best approach is to create an icon library.

file 'icons.js'

```javascript
import van from 'vanjs-core';
import {setIcon, ImgIcon, SvgStrIcon, SvgIconBase} from 'vanjs-bootstrap';
import FormLogo from './form-lib.svg?raw';

const {path} = van.tagsNS("http://www.w3.org/2000/svg");

const sun = props => SvgIconBase({viewBox: "0 0 16 16", ...props},
    path({d: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"})
);

const Beer = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 200v240a40.12 40.12 0 01-40 40H136a40.12 40.12 0 01-40-40V224"></path><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M352 224h40a56.16 56.16 0 0156 56v80a56.16 56.16 0 01-56 56h-40"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M224 256v160m64-160v160M160 256v160m160-304a48 48 0 010 96c-13.25 0-29.31-7.31-38-16H160c-8 22-27 32-48 32a48 48 0 010-96 47.91 47.91 0 0126 9"></path><path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M91.86 132.43a40 40 0 1160.46-52S160 91 160 96m-14.17-31.29C163.22 44.89 187.57 32 216 32c52.38 0 94 42.84 94 95.21a95 95 0 01-1.67 17.79"></path></svg>';


setIcon('VANLOGO', ImgIcon({src: "img/vanjs.svg"}));
setIcon('BEER', SvgStrIcon(Beer));
setIcon('BEER_BLUE', SvgStrIcon(Beer, {fill: 'blue', stroke: 'blue'}));
setIcon('FORM', SvgStrIcon(FormLogo, {fill: 'currentColor', stroke: 'currentColor'}));
setIcon('SUN', sun)

```

file 'app.js'

```javascript
import van from 'vanjs-core';
import {Icon} from 'vanjs-bootstrap';
import './icons';  // initialize iconMap

const {div, h1} = van.tags;

export default function App() {
    return () => div(
      h1('VanJs ',Icon('VANLOGO'),' is nice'),
    )
}

```

> ##### function setIcon (key, icon)

Sets an icon to a key. *icon* should be a function to pass arguments of the function Icon.
Icons can also be derived from other icons.

`setIcon( 'LOGO', props => Icon('VANLOGO', props) )`


> ##### function getIcon (key)

Gets an icon by key.


> ##### function setWarning (value)

This is useful for debugging. Value is

- '**get**' logs a warning when a undefined icon should be rendered
- '**all**' logs also if a defined icon is overwritten
- '**off**' disable warnings

### Show Icons Demo

Use this Button to display all icons.

```javascript
import van from 'vanjs-core';
import {Button, Modal, Icon, iconMap} from 'vanjs-bootstrap';

function ShowIconMap() {
    const keys  = [...iconMap.keys()];
    const {div} = van.tags;
    const dlg = Modal({
        header: "Icon Map",
        body: div(
            ...keys.map( key => div({class: "row"},
                div({class: "col"}, key ),
                div({class: "col bg-white text-black"}, Icon(key) ),
                div({class: "col bg-black text-white"}, Icon(key) ),
                div({class: "col col bg-secondary text-black"}, Icon(key) ),
            ))
        ),
        scrollable: true,
    });

    return Button({onclick: ()=>dlg.open()}, "Show Icons");
}
```

## Icon Transformers

> ##### function SvgIconBase (props = {}, ...children) {

Is a base component wrapper for SVG icons build as VanJs function.
The idea behind is to have a SVG image that size is 1em. So it fit to font-size.
"fill" should be "currentColor" to use the font-color.
The icon size (width and height) can be changed by "size" property.

**main props**

- **color** directed to SVG style
- **size** to set SVG width and height
- **class** directed into SVG tag
- **style** directed into SVG tag
- **attr** directed into SVG tag
- **title** inserts a `<title>title</title>` into childrens

```javascript
function MyIcon (props) {
  const {rect} = van.tagsNS("http://www.w3.org/2000/svg");
  return SvgIconBase({viewBox: "0 0 100 100", ...props},
    rect({x:"11.5", y:"9.4", width:"80", height:"80", rx:"4.4444", ry:"4.4444" stroke-width:"8"})
  )
}
```



> ##### function GenIcon(data)

This function returns a Icon function, where data is a svg data tree:

   `{tag: "svg", attr: {viewBox: "0 0 16 16"}, child: [{tag: ..}, ..]}`

This data format was found by react-icons.
The advantage is the generality of this format, which can be easily transformed, here into a VanJs function.
The first tag is usually "svg". In this function, if the first tag is missing, 
an SvgIconBase function is generated, otherwise a standard SVG function.

```javascript
const moon = GenIcon({
  attr: {viewBox: "0 0 16 16"},
  child:[
    {tag: 'path', attr: {d: "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"}}
  ]
});
```

> ##### function ImgIcon ({src, alt, ...rest})

Create a Icon function by image url. The "size" is injected as style so we can use units like "em".
For original size use "inherit".
If "alt" is not specified, the last part of the URL is used for this

`setIcon( 'KEY', ImgIcon({src: "img/key.png"}))``


> ##### function SvgStrIcon (str, svgargs = {}) {

Create a Icon function from a SVG string. svgargs will overwrite svg attributes like fill and stroke.

```javascript
SvgStrIcon(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3"/></svg>',
  {fill: 'currentColor', stroke: 'currenColor}
)
```


