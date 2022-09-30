import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';

const awsConfig = {
  region: process.env.NEXT_PUBLIC_AWS_DEFAULT_REGION || 'us-west-2',
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: 'us-west-2' }),
    identityPoolId:
      process.env.NEXT_PUBLIC_IDENTITY_POOL_ID ||
      'us-west-2:8263742e-301a-493b-8b2c-5f90bb0da1a5',
  }),
};

const s3Client = new S3Client(awsConfig);

export async function uploadImageToS3({
  name,
  file,
}: {
  name: string;
  file: any;
}) {
  const key = `profile_images/${name}`;

  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: 'engi-website-staging',
    ContentDisposition: 'inline',
    ContentType: 'image/png',
    Key: key,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return response;
  } catch (error) {
    throw error;
  }
}
