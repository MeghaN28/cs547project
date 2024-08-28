import { getUser, saveUser } from '../services/dynamoService.mjs';
import { encrypt } from '../services/kmsService.mjs';

const _getUser = async (event) => {
  const email = event.pathParameters.email;
  const user = await getUser(email);
  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};
export { _getUser as getUser };

export async function createUser(event) {
  const { email, username } = JSON.parse(event.body);
  const encryptedEmail = await encrypt(email);
  await saveUser(encryptedEmail, username);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'User created' }),
  };
}
