import axiosInstance from 'services/instance';
import {RegisterInfoData, RegisterInfoParams} from './types';

export const createRegisterInfoService = async (
  params: RegisterInfoParams,
): Promise<RegisterInfoData> => {
  const response = await axiosInstance.post('registerInfo', params);
  return response.data.data;
};
