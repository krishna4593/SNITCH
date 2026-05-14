import ImageKit from '@imagekit/nodejs';
import config from '../config/config.js';

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_SECRET_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    
    export async function uploadFile({ buffer, fileName, folder = "snitch" }) {
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })

    return result
}