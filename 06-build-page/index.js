const path = require('path');
const fs = require('fs');
const templateReadStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
const headerReadStream = fs.createReadStream(path.join(__dirname, 'components', 'header.html'), 'utf-8');
const articlesReadStream = fs.createReadStream(path.join(__dirname, 'components', 'articles.html'), 'utf-8');
const footerReadStream = fs.createReadStream(path.join(__dirname, 'components', 'footer.html'), 'utf-8');
let aboutReadStream;

let template = '';
let header = '';
let articles = '';
let footer = '';
let about = '';

fs.stat(path.join(__dirname, 'components', 'about.html'), function(error, stat) {
    if (error == null) {
      aboutReadStream = fs.createReadStream(path.join(__dirname, 'components', 'about.html'), 'utf-8');
      aboutReadStream.on('data', (chunk) => about = chunk.toString());
    }
  });

templateReadStream.on('data', (chunk) => template += chunk);
headerReadStream.on('data', (chunk) => header = chunk.toString());
articlesReadStream.on('data', (chunk) => articles = chunk.toString());
footerReadStream.on('data', (chunk) => footer = chunk.toString());


makeDir();
const templateWriteStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

templateReadStream.on('end', () => templateWriteStream.write(template.replace('{{header}}', header).replace('{{articles}}', articles).replace('{{footer}}', footer).replace('{{about}}', about)));

const stylesWriteStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => { 
    if (error) 
      console.log(error); 
    else {
      files.forEach(file => {
        if (file.isFile() && file.name.includes("css")) {
            let stylesReadStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            stylesReadStream.pipe(stylesWriteStream);
        }
      }) 
    } 
  })

async function makeDir() {
    try {
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (error) => {
    if (error) console.log(error);
});
    } catch (error) {
        console.log(error);
    }
}

makeAssets();
makeFonts();
makeImg();
makeSVG();

fs.readdir(path.join(__dirname, 'assets', 'fonts'), (error, files) => {
    if (error) 
      console.log(error); 
    else {
        for (file of files) {
            fs.copyFile(path.join(__dirname, 'assets', 'fonts', file), path.join(__dirname, 'project-dist', 'assets', 'fonts', file), (error) => {
                if (error) {
                    console.log(error);
                }
            })
        }
    }
});

fs.readdir(path.join(__dirname, 'assets', 'img'), (error, files) => {
    if (error) 
      console.log(error); 
    else {
        for (file of files) {
            fs.copyFile(path.join(__dirname, 'assets', 'img', file), path.join(__dirname, 'project-dist', 'assets', 'img', file), (error) => {
                if (error) {
                    console.log(error);
                }
            })
        }
    }
});

fs.readdir(path.join(__dirname, 'assets', 'svg'), (error, files) => {
    if (error) 
      console.log(error); 
    else {
        for (file of files) {
            fs.copyFile(path.join(__dirname, 'assets', 'svg', file), path.join(__dirname, 'project-dist', 'assets', 'svg', file), (error) => {
                if (error) {
                    console.log(error);
                }
            })
        }
    }
});

async function makeAssets() {
    try {
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (error) => {
    if (error) console.log(error);
});
    } catch (error) {
        console.log(error);
    }
}

async function makeFonts() {
    try {
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), {recursive: true}, (error) => {
    if (error) console.log(error);
});
    } catch (error) {
        console.log(error);
    }
}

async function makeImg() {
    try {
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), {recursive: true}, (error) => {
    if (error) console.log(error);
});
    } catch (error) {
        console.log(error);
    }
}

async function makeSVG() {
    try {
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), {recursive: true}, (error) => {
    if (error) console.log(error);
});
    } catch (error) {
        console.log(error);
    }
}