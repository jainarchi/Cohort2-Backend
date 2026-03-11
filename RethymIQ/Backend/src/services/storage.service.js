const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});



async function uploadFile({ buffer, filename , folder = "" }) {

  const file = await client.files.upload({
    file: await toFile(Buffer.from(buffer), "file"),
    fileName: filename,
    folder
  });


  return file;

}



module.exports = uploadFile
