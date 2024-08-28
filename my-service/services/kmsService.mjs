import AWS from 'aws-sdk';

const kms = new AWS.KMS();

export async function encrypt(plaintext) {
  const params = {
    KeyId: '32989d68-73dc-4eee-8b69-22d8f92ff67d',
    Plaintext: plaintext,
  };
  const data = await kms.encrypt(params).promise();
  return data.CiphertextBlob.toString('base64');
}
