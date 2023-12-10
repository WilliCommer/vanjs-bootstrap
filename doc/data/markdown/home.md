# <img src="img/form-lib.svg" alt="logo" height="60">&nbsp; <img src="img/vanjs.svg" alt="logo" height="60"> VanJs Bootstrap Components

![vanjs](https://img.shields.io/badge/🍦VanJs-1.2-blue)
![bs](https://img.shields.io/badge/Bootstrap-5-blue?logo=bootstrap&logoColor=white)

----

> a component library using VanJs and Bootstrap

For a long time I built my UIs with React and Bootstrap. Then I met VanJs and am amazed at how easy it is. So that I don't have to mess with CSS, I'm introducing some Bootstrap components here.


## Installation

To use this library you also need VanJs and Bootstrap.

```batch
npm install vanjs-core bootstrap vanjs-bootstrap
```

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


