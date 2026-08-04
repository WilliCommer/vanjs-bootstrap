# <img src="img/form-lib.svg" alt="logo" height="60">&nbsp; <img src="img/vanjs.svg" alt="logo" height="60"> VanJs Bootstrap Components

![vanjs](https://img.shields.io/badge/🍦VanJs-1.6-blue)
![bs](https://img.shields.io/badge/Bootstrap-5-blue?logo=bootstrap&logoColor=white)

----

> a component library using VanJs and Bootstrap

For a long time I built my UIs with React and Bootstrap. Then I met VanJs and am amazed at how easy it is. So that I don't have to mess with CSS, I'm introducing some Bootstrap components here.

[Check out the demo](http://familiecommer.de/vanjs-bootstrap-demo)


## Installation

```batch
npm install vanjs-bootstrap
```

will also install bootstrap and vanjs-core

### Create A App

I recommend Vite as a development environment.

main.js

```javascrript
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap'
import van from 'vanjs-core';
import App from './app.js';
const app = document.querySelector("#app");
van.add(app, App());
```

app.js is something like this

```javascript
import van      from 'vanjs-core';
import {Navbar} from 'vanjs-bootstrap';
import Page     from './page';

const appMenu = {
    items: [
        {label: 'Home', href: '#home'},
        ...
    ]
}

export default function App() {
    return () => div(
        Navbar({menu: appMenu}),
        div({class: "container"}, 
            div({class: "row justify-content-md-center"},
                div({class: "col-10 p-4 m-2 border rounded-2"}, 
                Page()
            )
        ),
    )
}
```

