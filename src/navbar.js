
/** @module navbar **/

import van from 'vanjs-core';

const { div, button, hr, span, nav, a, ul, li } = van.tags;
const noHref = 'javascript:void(0);';

/**
 * Create a Bootstrap navigation element
 * <br/>This component simplifies the use of the Bootstrap navigation bar.
 * @returns {object}
 */
export function Navbar({
    class: clas,
    containerClass = 'container-fluid align-items-center',
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

    const appendix = menu.appendix || null;
    delete menu.appendix;
    
    return nav({class: getClass},
        div({class: containerClass },
            menu.brand,
            button({ class: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                span({ class: "navbar-toggler-icon" }),
            ),

            div({ class: "collapse navbar-collapse", id: "navbarSupportedContent" },
                ul({ class: "me-auto navbar-nav" },
                    menu.items.map( item => typeof item === 'function' ? item() : NavItem({...item,t}) ),
                ),
                appendix
            )
        ),
    )
}


export function NavItem({href=noHref,label,icon,items,level=0,Comp,hidden=false,t=t=>t,...props}) {

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
    return a({class: cl, href: noHref, ...props}, label);
}


export function NavMenu ({label, items, t= t=>t, level, ...props}) {

    if(level > 0) // don't work ?
        return li({},
            a({class: "dropdown-item", href:noHref}, label + " »"),
            ul({class: "submenu dropdown-menu"},
                items.map( item => NavItem({level: level + 1, t, ...item}) ),
            ),
        );

    return li({class: "nav-item dropdown", id: "NavDropdown"+level},
        a({class: "nav-link dropdown-toggle", href: noHref, "data-bs-toggle": "dropdown"}, label),
        ul({class: "dropdown-menu"},
            items.map( item => NavItem({level: level + 1, ...item, t, ...props}) ),
        ),
    );
}

