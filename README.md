# vanjs-bootstrap 1.2

<img src="img/form-lib.svg" alt="logo" height="32">&nbsp; <img src="img/vanjs.svg" alt="logo" height="32"> ![vanjs](https://img.shields.io/badge/🍦VanJs-1.6-blue) ![bs](https://img.shields.io/badge/Bootstrap-5-blue?logo=bootstrap&logoColor=white)


> a component library using VanJs and Bootstrap

- [Documentation with demo](doc/index.html)
- [API Jsdoc generated](doc/api/index.html)
- [Online Demo](http://familiecommer.de/vanjs-bootstrap-demo)


## Installation

```batch
npm install vanjs-bootstrap
```

## Usage

### Core

```javascript
import * as vanB from "vanjs-bootstrap"; 
const {van, Button, Icon, FormBuilder} = vanB;
const {div} = van.tags;
const column = div({class: 'col'}, Button({onclick}, Icon('OK')))
```

### Components using bootstrap.js

```javascript
import * as modal from "vanjs-bootstrap/modal"; 
const {Modal, Menu} = modal;
```

### Tools

```javascript
import dragSort from "vanjs-bootstrap/drag-sort"; 
import i18n from "vanjs-bootstrap/i18n";
```


<a name="history" />

## History

- version 1.2.0
 - Modal and Menu removed form core to leave out Bootstrap JavaScript and be prepared for Bootstrap 6.  
  The core components can now be used in backend for SSR.  
  80% less JavaScript 
  - Forms
    - FormBuilder has been completely revised. 
    - Aria support for labels and custom controls. 
    - Possibility to generate Input Groups and use of non form components. 
    - Helpers to manipulate mounted input controls. 
    - New Combobox do not use Popper and have better keyboard support.
    - TagInput removed
  - Icons
    - The module has been completely cleaned.
    - funtions SvgIconBase and GenIcon removed.
    - SVG Attribute manipulation without document functions can be used in backend
    - new function spriteify to pack SVG icons in a 'svg symbol' and reduce svg size to 'use href'
  - NavLink default href changed from '#' to 'javascript:void(0);' 
  - Tools like i18n and DragSort are removed from core but still usable as separate modules.
  - New Documentation with demo examples
  - JSDoc generated API documentation
  
<details>
  <summary>older</summary>

- 1.0.7
  - update to bootstrap 5.3.8
  - update to vanjs-core 1.6.1
  - bugfix Combobox validation
  - MenuItem button type="button" to prevent form submission
  - inject old van.val function  
  
- 1.0.6  
  bugfix Modal class  

- 1.0.5  
  bugfix  
  FormBuilder enhance  

- 1.0.4  
  FormBuilder change  
  add Textarea
  add [TagInput](#taginput)  
  add [DragSort](#dragsort)  
  add tag option for [MenuItem](#menu)  

- 1.0.3  
  Modal header style  
  enhance documentation  

- 1.0.2  
  add [repository](https://github.com/WilliCommer/vanjs-bootstrap)  
  formbuilder add returns self  

- 1.0.1  
  add Icons  

- 1.0.0  
  start  

</details>
