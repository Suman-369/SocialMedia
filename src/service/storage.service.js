require("dotenv").config()

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY ,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadImage(file, fileName){
    try {
        const response = await imagekit.upload({
            file: file,
            fileName: fileName,
            folder: "/posts"
        })
        return response.url;
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw error;
    }
}

module.exports = uploadImage