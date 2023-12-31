const cloudinary = require("cloudinary").v2;

cloudinary.config({
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
