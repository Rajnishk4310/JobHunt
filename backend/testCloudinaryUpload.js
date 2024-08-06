import cloudinary from "./utils/cloudinary.js";
import getDataUri from "./utils/datauri.js";
import fs from "fs";

const testCloudinaryUpload = async () => {
    try {
        const filePath = "../frontend/public/notfound.jpg"; // Adjust the path to a real file
        const file = {
            originalname: "image.jpg",
            buffer: fs.readFileSync(filePath),
        };
        const fileUri = getDataUri(file);
        console.log("File URI:", fileUri);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("Cloudinary Response:", cloudResponse);
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
    }
};

export default testCloudinaryUpload;
