import axiosInstance from 'services/instance';
import {RegisterInfoData, RegisterInfoParams} from './types';

export const getRegisterInfosService = async (
  userId: string,
): Promise<RegisterInfoData[]> => {
  const response = await axiosInstance.get(`registerInfo-user/${userId}`);
  return response.data.data;
};

export const getRegisterInfoService = async (
  id: string,
): Promise<RegisterInfoData> => {
  const response = await axiosInstance.get(`registerInfo/${id}`);
  return response.data.data;
};

export const createRegisterInfoService = async (
  params: RegisterInfoParams,
): Promise<RegisterInfoData> => {
  const response = await axiosInstance.post('registerInfo', params);
  return response.data.data;
};
