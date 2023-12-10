/*
    I18n
    form-lib translate
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



