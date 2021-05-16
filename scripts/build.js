const fs = require('fs-extra');
const path = require('path');
const {minify} = require('terser');

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

async function getCode() {
    const source = fs.readFileSync(projPath + '/src/data-bind.js', 'utf8');
    const script = createBrowserScript(source);
    const ugly = await minify(script);
    return {source, script, ugly: ugly.code};
}

function writeCodeToDist(code) {
    fs.ensureDirSync('dist');
    fs.writeFileSync(dist + 'data-bind-module.js', copyRight + code.source);
    fs.writeFileSync(dist + 'data-bind-script.js', copyRight + code.script);
    fs.writeFileSync(dist + 'data-bind-script-min.js', copyRight + code.ugly);
}

async function generateAllCode() {
    const code = await getCode();
    writeCodeToDist(code);
}

generateAllCode()
