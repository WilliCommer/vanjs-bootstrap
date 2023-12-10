
import van from 'vanjs-core';

const { div, button, hr, span, nav, a, ul, li } = van.tags;


export function Navbar({
    class: clas,
    sticky = true,
    menu,
    t = t=>t,
    ...props
}) {

    const getClass = () => {
        let res = "navbar navbar-expand-lg bg-body-tertiary";
        if(sticky) res += " sticky-top";
        if(van.val(clas)) res += " " + van.val(clas);
        return res;
    }

    return nav({class: getClass},
        div({class: "container-fluid" },
            menu.brand,
            button({ class: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                span({ class: "navbar-toggler-icon" }),
            ),

            div({ class: "collapse navbar-collapse", id: "navbarSupportedContent" },
                ul({ class: "me-auto navbar-nav" },
                    menu.items.map( item => NavItem({...item,t}) ),
                )
            )
        ),
    )
}


export function NavItem({href='#',label,icon,items,level=0,Comp,hidden=false,t=t=>t,...props}) {

    if(typeof hidden === 'function') hidden = hidden();
    if (hidden) return null;

    (typeof label === 'function') && (label = label());
    label = label ? t(van.val(label)) : '';
    props.title && (props.title = t(van.val(props.title)));
    // if(icon) label = <Icon icon={icon} title={label} />

    if(items) {
        return NavMenu({label,items,level,t,...props});
    }

    const cl = () => {
        let res = "nav-item";
        if(level !== 0) res = "";
        if(van.val(props.class)) res += " " + van.val(props.class);
        return res;
    };

    if (Comp) {
        return li({class: cl}, Comp({href,label,icon,items,level,hidden,t,...props}));
    }

    return li({class: cl}, NavLink({...props, href, label, level}) );
}



export function NavLink({label, class: clas, active, disabled, divider, level=0, ...props}) {

    const cl = () => {
        let res = "nav-link";
        if(level !== 0) res = "dropdown-item";
        if(van.val(active)) res += " active";
        if(van.val(active) && level === 0) res += " text-primary";
        if(van.val(disabled)) res += " disabled";
        if(van.val(clas)) res += " " + van.val(clas);
        return res;
    };

    if(divider) return hr({class: "dropdown-divider"});
    return a({class: cl, href: '#', ...props}, label);
}


export function NavMenu ({label, items, t= t=>t, level, ...props}) {

    if(level > 0) // don't work ?
        return li({},
            a({class: "dropdown-item", href:"#"}, label + " »"),
            // ul({class: "dropdown-menu dropdown-submenu"},
            ul({class: "submenu dropdown-menu"},
                items.map( item => NavItem({level: level + 1, t, ...item}) ),
            ),
        );

    return li({class: "nav-item dropdown", id: "NavDropdown"+level},
        // a({class: "nav-link dropdown-toggle", href: "#", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false"}, label),
        a({class: "nav-link dropdown-toggle", href: "#", "data-bs-toggle": "dropdown"}, label),
        ul({class: "dropdown-menu"},
            items.map( item => NavItem({level: level + 1, ...item, t, ...props}) ),
        ),
    );
}

