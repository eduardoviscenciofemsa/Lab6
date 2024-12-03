import {deleteToken, saveToken} from '../utils/storage';
import api from './ApiService';

type DataResponseT = {
  data: {
    token: string;
  };
};

type ResponseT = {
  ok: boolean;
  msg?: string;
};

type LoginResponseT = ResponseT & DataResponseT;

export const login = async (username: string, password: string) => {
  const {data} = await api.post<LoginResponseT>('/auth/login', {
    username,
    password,
  });

  const {
    ok,
    data: {token},
  } = data;

  if (!ok) {
    throw new Error('Login failed');
  }

  await saveToken(username, token);

  return true;
};

export const logout = async () => {
  try {
    const {data} = await api.get<ResponseT>('/auth/logout');

    const {ok} = data;

    if (!ok) {
      throw new Error('Logout failed');
    }

    await deleteToken();

    return true;
  } catch (err) {
    throw new Error('Logout failed');
  }
};
