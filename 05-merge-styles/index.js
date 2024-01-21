const path = require('path');
const fs = require('fs');
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => { 
    if (error) 
      console.log(error); 
    else {
      files.forEach(file => {
        if (file.isFile() && file.name.includes("css")) {
            let readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            readStream.pipe(writeStream);
        }
      }) 
    } 
  })