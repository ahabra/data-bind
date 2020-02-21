const fs = require('fs-extra');
const path = require('path');
const Terser = require('terser');

const projPath = path.dirname(__dirname);
const dist = projPath + '/dist/';

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

fs.writeFileSync(dist + 'bind-module.js', code);
const script = createBrowserScript(code);
fs.writeFileSync(dist + 'bind-script.js', script);
fs.writeFileSync(dist + 'bind-script-min.js', uglify(script));

