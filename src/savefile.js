const fs = require('fs')
const Utils = require('./utilities');

let fd
let TEMPNAME
const OUTPUT_DIR = './output/'



const createFile = (path) => {
    fs.stat(path, function (err, stat) {
        console.group()
        if (err == null) {
            console.log(`Overwrite ${path} (file exist)`);
            fs.closeSync(fs.openSync(path, 'w'))
        } else if (err.code === 'ENOENT') {
            fs.closeSync(fs.openSync(path, 'a'))
        } else {
            console.error('Some other error: ', err.code);
        }
        console.groupEnd()
    });
}



exports.cache = (data) => {
    fd = fs.openSync(TEMPNAME + '.temp', 'a');
    fs.appendFileSync(fd, `${(typeof data === 'object' ? JSON.stringify(data) : data)},\n`, 'utf8');
    fs.closeSync(fd);
}



exports.add = (data) => {
    fd = fs.openSync(TEMPNAME + '.temp', 'a');
    fs.appendFileSync(fd, `${(typeof data === 'object' ? JSON.stringify(data) : data)},\n`, 'utf8');
    fs.closeSync(fd);
}



exports.saveJson = () => {
    const temp = fs.readFileSync(TEMPNAME + '.temp', 'utf8')
    fs.writeFileSync(TEMPNAME + '.json', `[${temp.slice(0, -2)}]`, 'utf8')
    console.log('saved', TEMPNAME + '.json')
}


exports.newProject = function (name) {
    files = {
        name: Utils.getDomain(name) + '_' + Utils.getFilename(name).replace('.', '-'),
        time: Date.now(),
        sitemap: name
    }
    TEMPNAME = OUTPUT_DIR + files.name + '_' + files.time
    createFile(TEMPNAME + '.temp');
}
