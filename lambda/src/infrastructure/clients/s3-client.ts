import { S3 } from "aws-sdk";

export const s3_client = new S3({
    endpoint: "http://localhost:4566",
    region: "eu-central-1",
    credentials: { accessKeyId: 'local-s3', secretAccessKey: 'local-s3' },
    s3ForcePathStyle: true
})