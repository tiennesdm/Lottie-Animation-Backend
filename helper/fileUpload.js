// import fs from 'fs'
const fs = require('fs');

const handleFileUpload = (stream, pathName) => {
  return new Promise((resolve, reject) => {
    stream
      .pipe(fs.createWriteStream(pathName))
      .on('finish', resolve)
      .on('error', reject);
  });
};

module.exports = { handleFileUpload };
