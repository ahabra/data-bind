// Two-way data binding library.
// https://github.com/ahabra/data-bind
// Copyright 2020 (C) Abdul Habra

(function() {
        /**
 * Bind an object's property to a UI element or an attribute on a IU element
 * @param {onChange} Call back fires only when property is changed thru API, not UI. 
 */
function bind({obj = {}, prop, sel, attr, root = document,
                                 getter, setter, onChange}) {
    validateArgs(prop)
    checkInitialValue(obj, prop)
    const objNotBound = {}

    if (!getter) {
        getter = () => getValue({prop, sel, attr, root, objNotBound})
    }
    if (!setter) {
        setter = (value) => setValue({prop, value, root, sel, attr, objNotBound})
    }
    return bindProp({obj, prop, getter, setter, onChange})
}

function bindProp({obj, prop, getter, setter, onChange}) {
    const descriptor = {
        get: () => getter(),
        set: value => {
            if (onChange) {
                const oldValue = getter(prop)
                if (oldValue !== value) {
                    onChange(oldValue, value)
                }
            }
            setter(value)
        },
        configurable: true,
        enumerable: true
    }
    Object.defineProperty(obj, prop, descriptor);
    return obj;
}


const isCheckbox = el => el.type === 'checkbox';
const isRadio = el => el.type === 'radio';
const isSelect = el => el.nodeName.toLowerCase() === 'select';
const isInputField = el => el.nodeName.toLowerCase() === 'input-field'
const isInput = el => 'value' in el;
const toSet = v => new Set( Array.isArray(v) ? v : [v]);

function checkInitialValue(obj, prop) {
    const oldValue = obj[prop]
    if (oldValue !== undefined) {
        console.info(`Property '${prop}' already exists in object. Will override previous definition but retain old value of ${oldValue}.`)
        obj[prop] = oldValue
    }
    return oldValue
}

function getValue({prop, root, sel, attr, objNotBound}) {
    if (sel) return getDomVal(root, sel, attr)
    return objNotBound[prop]
}

function setValue({prop, value, root, sel, attr, objNotBound}) {
    if (sel) {
        setDomVal(root, sel, value, attr)
        return
    }
    objNotBound[prop] = value
}

function getDomVal(root, sel, attr) {
    const elements = findElements(root, sel);
    if (elements.length === 0) return null;

    let el = elements[0];
    if (attr) return el.getAttribute(attr);
    if (!isInput(el)) return el.innerHTML;

    if (isCheckbox(el)) {
        return elements.filter(e => isCheckbox(e) && e.checked)
            .map(e => e.value === 'on'? e.name : e.value);
    }

    if (isSelect(el)) {
        const opts = [... el.querySelectorAll('option')];
        return opts.filter(op => op.selected).map(op => op.value);
    }

    if (isRadio(el)) {
        el = elements.filter(isRadio).find(e => e.checked);
        if (!el) return undefined
    }

    if (isInputField(el)) {
        return el.getAttribute('value')
    }

    return el.value;
}

function setDomVal(root, sel, val, attr) {
    const elements = findElements(root, sel);
    if (elements.length === 0) return;

    const el = elements[0];
    if (isCheckbox(el)) {
        const v = toSet(val);
        elements.filter(isCheckbox).forEach(e => e.checked = v.has(e.value) || v.has(e.name));
        return;
    }

    if (isSelect(el)) {
        const v = toSet(val);
        el.querySelectorAll('option').forEach(op => op.selected = v.has(op.value));
        return;
    }

    if (isRadio(el)) {
        elements.filter(isRadio).forEach(e => e.checked = e.value === val);
        return;
    }

    elements.forEach(el => setElementValue(el, val, attr));
}

function setElementValue(el, val, attr) {
    if (attr) {
        el.setAttribute(attr, val);
    } else if (isInput(el)) {
        el.value = val;
    } else if (isInputField(el)) {
        el.setAttribute('value', val)
    } else {
        el.innerHTML = val;
    }    
}

function findElements(root, sel) {
    const elements = root.querySelectorAll(sel);
    if (elements.length === 0) {
        console.warn(`No elements found matching selector ${sel}`);
    }
    return [... elements];
}

function validateArgs(prop) {
    if (typeof prop !== 'string' || prop.length === 0) {
        throw `'prop' argument must be a String defining the name a property.`
    }
}


/*
References:
1. DaBi: https://gist.github.com/plugnburn/f9d3acf33bee8f3f7e2d
2. Simulacra.js: https://simulacra.js.org
3. Article: https://www.wintellect.com/data-binding-pure-javascript/
4. bind.js: https://github.com/remy/bind.js
*/

        window.bind = bind;
    })();