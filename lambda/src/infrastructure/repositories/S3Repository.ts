import { s3_client } from "../clients/s3-client";

const BUCKET_NAME = 'teamlense-bucket';

const base64ToBinary = (base64String: string) => {
  const binaryData = Buffer.from(base64String, 'base64');
  return binaryData;
}

export const uploadAvatar = (userId: string, b64String: string) => {
    const base64String = b64String.split(",")[1];
    const binaryImage = base64ToBinary(base64String);

    const params = {
        Bucket: BUCKET_NAME,
        Key: userId + '/avatar.png',
        ContentType: 'image/png',
        Body: binaryImage
    };

    // Upload the file to S3
    s3_client.upload(params, (err: Error, data: any) => {
        if (err) {
            console.log('Error uploading file:', err);
        } else {
            console.log('File uploaded successfully. File location:', data.Location);
        }
    });
}

