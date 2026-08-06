import van from "vanjs-core";

// restore old logic of van.val
van.val = (s) => (s && typeof s === "object" && "val" in s ? s.val : s);

export var version = `vanjs-bootstrap 1.0.8 LICENSE MIT (c) 2026 by Willi Commer`;

export {typeMap,FormGroup,FormController,FormBuilder} from './form-controls';
export {Input,FormLabel,SelectInput,RadioSelectInput,FormCheckInput,SwitchInput,CheckboxInput,RadioInput,ComboboxInput}  from './form-controls';
export {Button}  from './form-controls';
export {ModalFrame,Modal,CloseButton,PopupMenuFrame,DropdownMenu,MenuItem,PopupMenu,ContextMenu} from './modal';
export {Navbar,NavItem,NavLink,NavMenu} from './navbar';
export {default as selectOptions} from './select-options';
export {default as I18n} from './i18n';
export {iconMap, getIcon, setIcon, setWarning, SvgIconBase, GenIcon, ImgIcon, SvgStrIcon, Icon} from './icon-map';
export {default as TagInput} from './tag-input';
export {default as DragSort} from './drag-sort';
