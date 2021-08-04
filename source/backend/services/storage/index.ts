import * as AWS from 'aws-sdk';
import * as config from 'config';

import { IConfig } from 'config/types.config';

const Config: IConfig = config;

export const DEV_BUCKET = 'dev';
export const PROD_BUCKET = 'prod';

const { STORAGE_URL: url, STORAGE_ACCESS_KEY: accessKey, STORAGE_SECRET_KEY: secretKey } = process.env;

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  endpoint: url,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export const createBucket = async (bucketName: string) =>
  s3
    .createBucket({
      Bucket: bucketName,
      GrantFullControl: 'x-amz-grant-full-control',
      GrantRead: '*',
      // public
    })
    .promise();

export const upsertObject = async (name: string, data: string, type: string) => {
  const bucketName = Config.production ? PROD_BUCKET : DEV_BUCKET;
  await s3
    .putObject({
      Body: data,
      Bucket: bucketName,
      Key: name,
      ContentType: type,
    })
    .promise();
  return `${url}/${bucketName}/${name}`;
};

export const upsertImageObject = async (name: string, data: string, imageType: string = 'png') =>
  upsertObject(`images/${name}`, data, `image/${imageType}`);

export default s3;
