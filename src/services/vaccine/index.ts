import axiosInstance from 'services/instance';
import {VaccineData} from './types';

export const getVaccinesService = async (): Promise<VaccineData[]> => {
  const response = await axiosInstance.get('vaccine');
  return response.data.data;
};
