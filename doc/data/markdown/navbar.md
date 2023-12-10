# Navbar

This component simplifies the use of the Bootstrap [navigation bar](https://getbootstrap.com/docs/5.3/components/navbar/).

```javascript
function Navbar({class: clas, sticky = true, menu, t = t=>t, ...props})

function NavItem({href='#', label, icon, items, level=0, Comp, hidden=false, t=t=>t, ...props})

function NavLink({label, class: clas, active, disabled, divider, level=0, ...props})

function NavMenu ({label, items, t=t=>t, level, ...props})
```

## Navbar Arguments

- **class**  
  optional class string or van.state for the \<nav\> element  

- **sticky**  
  add 'sticky-top' to class  

- **t**  
  optional translation function for labels and titles  

- **menu**  
  The **menu** is an object with properties [**brand**](https://getbootstrap.com/docs/5.3/components/navbar/#brand), a dom element and **items**, the array of menu items.  
  See example below  

## item props

The object 'item' is passed as an argument to the function NavItem.

- **label**  
  A string, function or van.state  

- **href**  
  Optional url, default is '#'  

- **icon**  
  Not supported  

- **items**  
  A array of items. The item is a submenu when set  

- **Comp**  
  A optional function returning a van dom, preferably an NavLink element  
  All properties are passed to the function as an argument  

- **hidden**  
  item is not visible when true  

- **t**  
  Optional translation function for labels and titles 

- **active**  
  Add 'active' to class when true.. Can be a van.state.  

- **disabled**  
  Add 'disabled' to class. Can be a van.state.  

- **divider**  
  Shows a divider in submenu  

- **...props**  
  Additional properties are passed on  



## Usage Examples

See nav bar above in this app.

#### App Code

```javascript
import van from 'vanjs-core';
import Navbar from 'vanjs-bootstrap';
import ToggleTheme from './app/toggle-theme';
import Page from './app/home';
import {tPath} from './i18n';

const {div} = van.tags;

const appMenu = {

    brand: van.tags.a({ class: "nav-brand me-3", href: "#", onclick: ()=>false },
            van.tags.img({ src: "img/form-lib.svg", alt: "Home", height: "30" }),
    ),
    
    items: [
        {label: 'home', href: '#home'},
        {label: 'Form', items: [
            {label: 'formbuilder', href: '#formbuilder'},
            {label: 'aligndemo', href: '#aligndemo'},
        ]},
        {label: 'about', href: '#about'},
        {label: 'theme', Comp: ToggleTheme},
    ]
}


function AppNav () {
    return Navbar({t: tPath('nav'), menu: appMenu})
}

export default function App() {
    return () => div(
        AppNav,
        div({class: "container"},
            Page
        )
    )
}

```

#### ToggleTheme Code

```javascript
import van from 'vanjs-core';
import {NavLink} from 'vanjs-bootstrap';
import {tPath} from '../i18n';

const {svg, path} = van.tagsNS("http://www.w3.org/2000/svg");

const sun = svg({width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 16 16"},
    path({d: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"})
);
const moon = svg({width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 16 16"},
    path({d: "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"})
);

export default function ToggleTheme () {
    const t = tPath('theme');
    const toggle = (v) => v === 'dark' ? 'light' : 'dark';
    const getTheme = () => document.documentElement.getAttribute('data-bs-theme');
    const setTheme = (v) => document.documentElement.setAttribute('data-bs-theme', v);
    const btnColor = van.state(toggle(getTheme()));
    const toggleClick = () => {
        btnColor.val = toggle(btnColor.val);
        setTheme(toggle(getTheme()));
        return false;
    }
    const Icon = v => v === 'dark' ? sun : moon;

    return NavLink({
        label: Icon(btnColor.val), 
        onclick: toggleClick,
        title: t(`${btnColor.val}-title`),
    });
}
```

