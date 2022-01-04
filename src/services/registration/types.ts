import {PulldownOptionTypes} from 'components/molecules/Pulldown';
import {UserData} from 'services/auth/types';
import {VaccineData} from 'services/vaccine/types';

export interface InfoRegisterFormData {
  fullName: string;
  gender: string;
  phone: string;
  identity: string;
  medicalHistory?: string;
  symptomRecent?: string;
  contactRecent?: string;
}

export interface VaccineRegisterFormData {
  vaccineRegister: PulldownOptionTypes;
  vaccineType: PulldownOptionTypes;
  firstVaccineType?: PulldownOptionTypes;
  firstVaccineTime?: string;
}

export interface RegisterInfoParams {
  userId: string;
  typeOfRegister: string;
  vaccineRegisterId: string;
  previousVaccineId?: string;
  previousVaccineDate?: string;
  illnessHistory: string;
  recentSymptom: string;
  contactF0: string;
}

export interface RegisterInfoData {
  _id: string;
  __v: number;
  user: UserData;
  typeOfRegister: string;
  vaccineRegister: VaccineData;
  previousVaccine?: VaccineData;
  previousVaccineDate?: string;
  illnessHistory: string;
  recentSymptom: string;
  contactF0: string;
  status: string;
}
