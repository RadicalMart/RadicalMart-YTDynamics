import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const [dataFile, workerFile, outputDir, styleVariant = 'white-blue', themeId = '12'] = process.argv.slice(2);

if (!dataFile || !workerFile || !outputDir) {
    console.error('Usage: node compile-yootheme-style.mjs <style-data.json> <worker.js> <output-dir> [variant] [theme-id]');
    process.exit(2);
}

let listener;
let pending;
let sequence = 0;

globalThis.self = {
    addEventListener(type, callback) {
        if (type === 'message') listener = callback;
    },
    postMessage(message) {
        if (!pending || message.id !== pending.id) return;
        const current = pending;
        pending = undefined;
        if (message.error) current.reject(new Error(JSON.stringify(message.error)));
        else current.resolve(message.result);
    },
};
globalThis.location = {href: 'http://localhost:8080/administrator/index.php'};

vm.runInThisContext(fs.readFileSync(workerFile, 'utf8'), {filename: workerFile});

if (!listener) {
    throw new Error('YOOtheme worker did not register a message listener.');
}

function command(cmd, data) {
    if (pending) throw new Error('Worker commands must run sequentially.');
    const id = ++sequence;
    return new Promise((resolve, reject) => {
        pending = {id, resolve, reject};
        listener({data: [id, {cmd, data}]});
    });
}

const style = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
style.filepath = path.posix.dirname(style.filename) + '/';

const rendered = await command('css', {
    style,
    input: '',
    vars: {'@internal-style': `~'${styleVariant}'`},
});

if (!rendered.css || rendered.errors?.length) {
    console.error(JSON.stringify({errors: rendered.errors || ['No CSS generated']}));
    process.exit(1);
}

const compiled = await command('minify', {style, css: rendered.css});
if (!compiled.css || !compiled.rtl) {
    throw new Error('YOOtheme worker did not return both LTR and RTL styles.');
}

fs.mkdirSync(outputDir, {recursive: true});
const stamp = new Date().toISOString();
const header = `/* YOOtheme Pro v5.0.42 compiled on ${stamp} */\n`;
fs.writeFileSync(path.join(outputDir, `theme.${themeId}.css`), header + compiled.css);
fs.writeFileSync(path.join(outputDir, `theme.${themeId}.rtl.css`), header + compiled.rtl);

console.log(JSON.stringify({
    status: 'ok',
    style: `${style.id}:${styleVariant}`,
    cssBytes: compiled.css.length,
    rtlBytes: compiled.rtl.length,
}));
