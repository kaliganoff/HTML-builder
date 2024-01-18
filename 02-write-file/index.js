const path = require('path');
const fs = require('fs');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const { stdin, stdout } = process;
stdout.write('Hi! Please, enter text:\n')
stdin.on("data", (data) => {
    if (data.toString().includes('exit')) {
        stdout.write('O, fare thee well!');
        process.exit();
    };
    writeStream.write(data);
});
process.on('SIGINT', () => {
    stdout.write('O, fare thee well!');
    process.exit();
})