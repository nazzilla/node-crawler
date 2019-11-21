const fs = require('fs'),
  request = require('request');





const formatFileSize = (bytes, decimalPoint) => {
  if (bytes == 0) return '0 Bytes';
  var k = 1000,
    dm = decimalPoint || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const download = (uri, filename, callback) => {
  console.log(`⌛  Scarico ${uri}`);

  request.head(uri, (err, res, body) => {
    //console.dir(res)
    console.log('file:', res.headers['content-type']);
    console.log('size:', formatFileSize(res.headers['content-length']), ` (${res.headers['content-length']})`);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {


      console.log(`👍 scaricato!`);
      console.log('\r');
      callback();
    });
  });
};

let COUNT = 558;
let IMAGES_JSON;
const DIR_DEST = './../images/thumbnails/';

const startDownloading = () => {

  if (COUNT < IMAGES_JSON.length) {
    const current = IMAGES_JSON[COUNT];

    if (typeof current.thumb !== 'undefined' && current.thumb) {
      const thumb_path = current.thumb.split('/');
      const image_name = thumb_path[thumb_path.length - 1];

      console.log(`${COUNT} di ${IMAGES_JSON.length}`, image_name)
      //console.log(image_name[image_name.length-1]) // 
      setTimeout(() => {


        download(
          current.thumb,
          DIR_DEST + image_name,
          startDownloading
        )
      }, 1000 + Math.floor(Math.random() * 500)  );
      COUNT++;
    } else {

      COUNT++;
      setTimeout(() => {

        startDownloading() ,
        1000
      });
    }


   
  } else {
    console.log('😎  Fine!');
  }
}


const initDownload = () => {

  fs.readFile('./../output/import-complete.json', 'utf8', (err, contents) => {
    console.log('✅ Completato!');

    IMAGES_JSON = JSON.parse(contents);
    IMAGES_JSON = IMAGES_JSON.data
    startDownloading();

  });
}


initDownload()