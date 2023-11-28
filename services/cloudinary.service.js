const cloudinary = require("cloudinary").v2;
/*
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;
console.log(cloud_name);
console.log(api_key);
console.log(api_secret);
*/
cloudinary.config({
  /*
  cloud_name,
  api_key,
  api_secret,
  */
  cloud_name: "dcinqs6jw",
  api_key: 327614764764134,
  api_secret: "gVpTaHqG-3OEjyXlvNhWy4KzpOg",
});

const uploadImage = async (imageBuffer) => {
  const uploadResult = new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(error.message);
        }
        resolve(result.secure_url);
      })
      .end(imageBuffer);
  })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return uploadResult;
};

module.exports = {
  uploadImage,
};
