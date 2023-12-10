# Modal

Work with Bootstrap [Modal](https://getbootstrap.com/docs/5.3/components/modal).

## ModalFrame

> ##### `export function ModalFrame (options)`

The function ModalFrame creates a complete modal dom struture like:

```html
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

You only need to specify the van functions for header, body and footer:

```javascript
div(
    // Button trigger modal
    Button({"data-bs-toggle": "modal", "data-bs-target": "#exampleModal"}, "Launch demo modal"),

    // Modal
    ModalFrame({
        id:      "exampleModal",
        header:  "Modal title",
        body:    "Modal body text goes here.",
        footer:  div(
            Button({"data-bs-dismiss": "modal"}, 'Close'),
            Button({color: "primary"}, 'Save changes'),
        )
    })
);
```

## ModalFrame Options

- **header**  
  **body**  
  **footer**  
  A van dom function or null.  

- **id**  
  An optional dialog id.  

- **close**  
  A boolean value for the close cross in header. Default is true.  

- **centered**  
  A boolean value for centered dialog position. Default is true.  

- **scrollable**  
  A boolean value for scrollable dialog. Default is false.  

- **color**  
  A Bootstrap color name.  
  `color: "warning"`

- **position**  
  A optional position object like `{left: 100, top: 50}`  

- **width**  
  A optional diallog width like "20em" or "fit-content"  

- **class**  
  An additional class  

<br/>

## Modal Controller

You can achieve more flexibility by using the Modal function.

> ##### `export function Modal (args, options)`

Where **args** are the options used for ModalFrame and **options** are controller options.
The function returns an object with properties and functions.

### Modal Controller Object

- **dom**  
  The ModalFrame dom  

- **isOpen**  
  A boolean value  

- **modalResult**  
  A value that corresponds to the argument of the close function.  

- **open (left,top)**  
  Function to open the dialog at a given (optional) position  

- **async asyncOpen (left,top)**  
  Function to open the dialog asynchron and returns modalResult when closed.  

- **close (result)**  
  Function to close the dialog with optional modalResult.  

- **dispose ()**  
  Funtion to remove the dialog from dom.  
  
- **show ()**  
  Show the dialog.  

- **hide (dispose)**  
  Hide the dialog.  

You can also use the bootstrap [events](https://getbootstrap.com/docs/5.3/components/modal/#events)

##### `dom.addEventListener('shown.bs.modal', onShown)`

### Modal Controller Options

- **backdrop**  
  boolean, default true.  
  Includes a modal-backdrop element.  
  Alternatively, specify static for a backdrop which doesn’t close the modal when clicked.  
  
- **focus**  
  boolean, default true  
  Puts the focus on the modal when initialized.  

- **keyboard**  
  boolean, default true  
  Closes the modal when escape key is pressed.  
  
- **dispose**  
  boolean, default true  
  Dispose dialog on hide.  

<br/>

### Confirm Example

```javascript
const ConfirmDlg = Modal({
    close: false,               // don't show any header
    color: "text-bg-danger",
    centered: false,
    body: h5("Are you sure ?"),
    footer: div({class: ""},
        Button({onclick: ()=>ConfirmDlg.close(true), bsSize: "sm", class: "me-2"}, 'Yes'),
        Button({onclick: ()=>ConfirmDlg.close(false), bsSize: "sm"}, 'No'),
    )
});

const DemoConfirm = () => {
    const result = van.state("");
    return div({class: "row"},
        div({class: "col-3"},
            Button({
                onclick: async () => {
                    result.val = await ConfirmDlg.asyncOpen();
                }
            }, "Confirm")
        ),
        div({class: "col-3"}, () => `Result: ${result.val}`),
    )
}
```


### Form Example

```javascript

const LoginDlg = ({name, pw}) => {
    var fb = FormBuilder();
    fb.add({label: 'Name', name: 'name', value: name, id: 'login-dlg-name'});
    fb.add({label: 'Password', name: 'pw', value: pw, type: 'password'});

    var dlg = Modal({
        header: 'Login',
        body: fb.dom,
        footer: div({class: "btn-group btn-group-sm"},
            Button({onclick: ()=>dlg.close(fb.values)}, 'Ok'),
            Button({onclick: ()=>dlg.close(false)}, 'Cancel'),
        )
    });

    // close on Enter pressed
    fb.dom.addEventListener('keypress', event => {
        if (event.key === 'Enter') dlg.close(fb.values);
    });

    // focus first input after open
    dlg.onShown = () => {
        document.getElementById('i_login-dlg-name').focus()
    };

    return dlg;
};

const DemoForm = () => {
    const result = van.state({name: 'Jack', pw: 'secret'});
    return div({class: "row"},
        div({class: "col-3"},
            Button({onclick: async () => {
                let res = await LoginDlg(result.val).asyncOpen();
                if (res) result.val = res;
            }
            }, "Login")
        ),
        div({class: "col-3"}, () => `Result: ${JSON.stringify(result.val)}`),
    )
}

```
