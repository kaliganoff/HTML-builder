const path = require('path');
const fs = require('fs');

async function delDir() {
    try {
    fs.access(path.join(__dirname, 'files-copy'), (error) => {
    if (error) {
        console.log(error);
    if (error.code === 'ENOENT') {
        makeDir();
        fs.readdir(path.join(__dirname, 'files'), (error, files) => {
            if (error) 
              console.log(error); 
            else {
                for (file of files) {
                    fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (error) => {
                        if (error) {
                            console.log(error);
                        }
                    })
                }
            }
        })
    }
    } else {
        fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, (error) => {
            if (error) console.log(error);
            makeDir();
            fs.readdir(path.join(__dirname, 'files'), (error, files) => {
                if (error) 
                  console.log(error); 
                else {
                    for (file of files) {
                        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (error) => {
                            if (error) {
                                console.log(error);
                            }
                        })
                    }
                }
            })
        })
    }
})
} catch (error) {
    console.log(error);
}
}

delDir();

async function makeDir() {
    try {
fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (error) => {
    if (error) console.log(error);
});
    } catch (error) {
        console.log(error);
    }
}


