import * as Keychain from 'react-native-keychain';

export const saveToken = async (username: string, token: string) => {
  try {
    await Keychain.setGenericPassword(username, token);
  } catch (error) {
    throw new Error('Failed to save token');
  }
};

export const getToken = async (username: string) => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials && credentials.username === username) {
      return credentials.password;
    }
  } catch (error) {
    throw new Error('Failed to get token');
  }
};

export const deleteToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    throw new Error('Failed to delete token');
  }
};
