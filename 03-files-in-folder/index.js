const path = require('path');
const fs = require('fs');
const fsPromises = require("fs").promises; 

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => { 
    if (error) 
      console.log(error); 
    else {
      files.forEach(file => {
        if (file.isFile())
        (async () => { 
          try { 
            const stats = await fsPromises.stat( 
              (path.join(__dirname, 'secret-folder', file.name))); 
              console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size}b`); 
            }  
          catch (error) { 
            console.log(error); 
          } 
        })();
      }) 
    } 
  })
  
