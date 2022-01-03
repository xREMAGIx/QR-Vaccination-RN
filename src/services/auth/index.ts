import axiosInstance from 'services/instance';
import {LoginParams, RegisterParams, UserData} from './types';

export const loginService = async (data: LoginParams): Promise<string> => {
  const response = await axiosInstance.post('login', data);
  return response.data.data;
};

export const registerService = async (
  data: RegisterParams,
): Promise<UserData> => {
  const response = await axiosInstance.post('user', data);
  return response.data.data;
};

export const getInfoService = async (): Promise<UserData> => {
  const response = await axiosInstance.get('me');
  return response.data.data;
};

export const logoutService = async (): Promise<UserData> => {
  const response = await axiosInstance.get('logout');
  return response.data.data;
};
