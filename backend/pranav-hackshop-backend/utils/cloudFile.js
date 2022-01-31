const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");

function bufferToStream(buffer) {
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

let streamUpload = (buffer, folderName) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { public_id: `${folderName}/${uuidv4()}` },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    bufferToStream(buffer).pipe(stream);
  });
};

let fileDelete = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.api.delete_resources([public_id], function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { streamUpload, fileDelete };
