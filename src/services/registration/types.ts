import {PulldownOptionTypes} from 'components/molecules/Pulldown';

export interface InfoRegisterFormData {
  name: string;
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
