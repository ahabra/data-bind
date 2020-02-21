const fs = require('fs-extra');
const path = require('path');
const Terser = require('terser');

const projPath = path.dirname(__dirname);
const dist = projPath + '/dist/';

const copyRight = `// Two-way data binding library.
// https://github.com/ahabra/data-bind
// Copyright 2020 (C) Abdul Habra

`;

function createBrowserScript(code) {
    let script = code.replace('export default ', '');
    return `(function() {
        ${script}
        window.bind = bind;
    })();`;
}

function uglify(script) {
    return Terser.minify(script).code;
}

const code = fs.readFileSync(projPath + '/src/bind.js', 'utf8');

fs.ensureDirSync('dist');

fs.writeFileSync(dist + 'bind-module.js', copyRight + code);
const script = createBrowserScript(code);
fs.writeFileSync(dist + 'bind-script.js', copyRight + script);
fs.writeFileSync(dist + 'bind-script-min.js', copyRight + uglify(script));

