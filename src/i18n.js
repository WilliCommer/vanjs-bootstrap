/**
 * function I18n()
 *
 * Create a translation manager for localized strings.
 * The returned object keeps a dictionary by language, resolves nested keys,
 * and can add or merge new translations.
 *
 * 
 * @module vanjs-bootstrap/i18n
 * 
 * @example
 * import i18n from 'vanjs-bootstrap/i18n; // import extra module
 * const I18n = i18n(); // create instance
 * I18n.addWords({ hello: 'Hello' }, 'en');
 * I18n.addWords({ hello: 'Hola' }, 'es');
 * I18n.addWords({ hello: '你好' }, 'zh');
 * I18n.addWords({ hello: 'Hallo' }, 'de');
 * 
 * I18n.setLanguage('de');
 * console.log(I18n.t('hello')); // -> Hallo
 *
 * @property {object} dict - translation dictionary by language code
 * @property {string} language - current language code
 * @property {string} languageDefault - fallback language used when language is not available
 * @property {function} setLanguage(value) - set the active language, lower-cased if necessary
 * @property {function} getLanguage() - return the active language code
 * @property {function} t(key) - return a translated string or the last path segment as fallback
 * @property {function} tPath(path) - create a namespaced translator for keys under a common path
 * @property {function} addWords(words, lang, chapter) - merge translations into the dictionary
 * @returns {object}
 */

export default function I18n()  {

    const i18n = {
        dict:               {},
        language:           'en',
        languageDefault:    'en',
        setLanguage (value) {
            i18n.language = String(value).toLowerCase();
            if (!i18n.dict[i18n.language])
                i18n.language = i18n.languageDefault;
        },
        getLanguage () {return i18n.language},
        t (key) {
            if (typeof key === 'function') key = key();
            if (!key) return '';
            var res = getProp(i18n.dict[i18n.language], key);
            if (!res) 
                res = key.split('.').pop();
            return res;
        },
        tPath (path) {
            if (!path.endsWith('.')) path = path + '.';
            return function (key) {
                return i18n.t(path + key);
            };
        },
        addWords (words, lang, chapter) {
            if (chapter) words = {[chapter]: words};
            if (lang) words = {[lang]: words};
            mergeObjects( i18n.dict, words );
        }
    };

    return i18n;
};


function mergeObjects(obj1, obj2) {
    for (var p in obj2) {
        try {
            if ( obj2[p].constructor===Object )
                obj1[p] = mergeObjects(obj1[p], obj2[p]);
            else
                obj1[p] = obj2[p];
        } catch(e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}


function getProp (obj, path) {
    try {
        path = path.split('.');
        for (let i=0; i < path.length; i++) {
            if (!obj) return obj;
            obj = obj[path[i]];
        };
    } catch (err) {
        return false;
    }
    return obj;
};

