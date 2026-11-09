/** @module html-string-attr **/

/**
 * pull attributes from top level HTML element string
 * 
 * @param {string} htmlString - HTML element as string
 * @returns {object} - attributes as object {attrName: attrValue ... }
 */
export function extractAttributes(htmlString) {
    const match = htmlString.match(/^<([a-z0-9-]+)([^>]*)-?>/is);
    if (!match) return {};

    const attribsString = match[2];
    const attributes = {};

    const attrRegex = /([a-z0-9-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gis;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attribsString)) !== null) {
        const key = attrMatch[1];
        const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";
        attributes[key] = value;
    }

    return attributes;
}


 
/**
 * replace top level attibutes of a HTML element string and return the result as string
 * 
 * @param {string} htmlString - HTML string to modify
 * @param {object} newAttribs - Attributes as object
 * @returns {string}
 */
 export function updateAttributes(htmlString, newAttribs) {
    const attribString = Object.entries(newAttribs)
        .map(([key, val]) => `${key}="${val}"`)
        .join(' ');
    return htmlString.replace(/^<([a-z0-9-]+)[^>]*>/is, (match, tagName) => {
        const separator = attribString ? ' ' : '';
        const isSelfClosing = match.trim().endsWith('/>') ? ' /' : '';
        return `<${tagName}${separator}${attribString}${isSelfClosing}>`;
    });
}


