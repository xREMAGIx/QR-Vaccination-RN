import axiosInstance from 'services/instance';
import {VaccinationPlaceData} from './types';

export const getVaccinationPlaceService = async (
  id: string,
): Promise<VaccinationPlaceData> => {
  const response = await axiosInstance.get(`vaccinationPlace/${id}`);
  return response.data.data;
};
