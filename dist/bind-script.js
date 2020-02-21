// Two-way data binding library.
// https://github.com/ahabra/data-bind
// Copyright 2020 (C) Abdul Habra

(function() {
        function bind({obj, prop, sel, attr}) {
    validateArgs({obj, prop, sel});
    const oldValue = obj.hasOwnProperty(prop) ? obj[prop] : undefined;

    const descriptor = {
        get: () => getVal(sel, attr),
        set: v => setVal(sel, v, attr),
        configurable: true,
        enumerable: true
    };
    
    Object.defineProperty(obj, prop, descriptor);

    if (oldValue !== undefined) {
        console.info(`Property '${prop}' already exists in object. Will override previous definition but retain old value of ${oldValue}.`);
        obj[prop] = oldValue;
    }
}

const isCheckbox = el => el.type === 'checkbox';
const isRadio = el => el.type === 'radio';
const isSelect = el => el.tagName.toLowerCase() === 'select';
const isInput = el => 'value' in el;
const toSet = v => new Set( Array.isArray(v) ? v : [v]);

function getVal(sel, attr) {
    const elements = findElements(sel);
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
    }
    return el.value;
}

function setVal(sel, val, attr) {
    const elements = findElements(sel);
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
    } else {
        el.innerHTML = val;
    }    
}

function findElements(sel) {
    const elements = document.querySelectorAll(sel);
    if (elements.length === 0) {
        console.warn(`No elements found matching selector ${sel}`);
    }
    return [... elements];
}

function validateArgs({obj, prop, sel}) {
    if (!obj) {
        throw `'obj' argument cannot be null or undefined.`;
    }
    if (typeof prop !== 'string' || prop.length === 0) {
        throw `'prop' argument must be a String defining the name a property.`
    }
    if (typeof sel !== 'string' || sel.length === 0) {
        throw `'sel' argument must be a String defining a selector.`
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