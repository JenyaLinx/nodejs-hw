import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'node:stream';

export const saveFileToCloudinary = (buffer, userId) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: userId.toString(),
        overwrite: true,
        unique_filename: false,
        folder: 'avatars',
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};