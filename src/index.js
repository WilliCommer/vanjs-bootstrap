import van from "vanjs-core";
van.val = (s) => (s && typeof s === "object" && "val" in s ? s.val : s); // restore van.val
export {van};
export const version = `1.2.0`;
export const versionInfo = `vanjs-bootstrap 1.2.0 LICENSE MIT (c) 2026 by Willi Commer`;
export * from './form-controls';
export {ComboboxInputP} from './combobox-input-p.js';  // deprecated
export {ComboboxInput} from './combobox-input.js';
export * from './navbar';
export * from './icons.js';
export {default as selectOptions} from './select-options';
