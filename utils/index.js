// convert to markdown
// just include the content from <div class="container">
// write back out to file or folders
// works on recursive folder structures

const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const EXTS = [".html", ""];

program
    .requiredOption('-i, --input <file or folder>', 'input file or dir')
    .requiredOption('-o, --output <folder>', 'output dir')
    .option('-f, --force', 'Overwrite existing output');
program.parse(process.argv);

let inputPath = path.resolve(process.cwd(), program.input);
let outputPath = path.resolve(process.cwd(), program.output);

if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath);
}

if (fs.statSync(inputPath).isDirectory()) {
    processDirectory(inputPath);
}
else {
    processFile(inputPath);
}

console.log("Done");

// use parent to mimic the folder structure in the output directory
function processDirectory(dir, parent='') {

    let base = path.basename(dir);
    let newPath = path.resolve(outputPath, parent, base);
    if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath);
    }
    let items = fs.readdirSync(dir);
    items.map(item => {
        if (fs.statSync(path.resolve(dir, item)).isDirectory()) {
            processDirectory(path.resolve(dir, item), parent != '' ? parent + "/" + base : base);
        }
        else {
            processFile(path.resolve(dir, item), parent != '' ? parent + "/" + base : base);
        }
    })

}
function processFile(file, outputSubdir = '') {

    console.log(`Opening ${file}`);

    if (EXTS.includes(path.extname(file))) {
        let data = fs.readFileSync(path.resolve(inputPath, file)).toString();
        const dom = new JSDOM(data);
        const doc = dom.window.document;
        let title = doc.querySelector("title");
        if (title) {
            title = title.textContent.replace("EPUBTest: ", '');
            title = title.replace(/(\n)+/g, ' ');
            title = title.trim();
            title = `'${title}'`; // put in quotes because one page title starts with "@"
        }
        let footer = doc.querySelector("footer");
        if (footer) {
            footer.remove();
        }   
        let mainContent = doc.querySelector("div[class=container]");
        if (!mainContent) {
            console.log(`Error parsing file ${file}`);
        }
        else {
            let fileContents = `---\ntitle: ${title}\nlayout: base.njk\n---\n${mainContent.outerHTML}`;

            let filename = path.basename(file).replace(".html", "");
            filename += ".njk";
            let writeTo = path.resolve(outputPath, outputSubdir, filename);
            writeOut(writeTo, fileContents, program.force);    
        }
    }
    else {
        let writeTo = path.resolve(outputPath, outputSubdir, path.basename(file));
        console.log(`Copying file as-is ${file} to ${writeTo}`);
        fs.copyFileSync(file, writeTo);
    }
}

function writeOut(outpath, contents, force=false) {
    if (fs.existsSync(outpath) && force || !fs.existsSync(outpath)) {
        fs.writeFileSync(outpath, contents);
        console.log(`Wrote ${outpath}`);
    }
    else {
        console.log(`ERROR: Cannot overwrite existing file of the same name:\n ${outpath}\nUse --force.\n`);
    }
}
