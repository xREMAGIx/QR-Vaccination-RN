import {UserData} from 'services/auth/types';

type RootStackParamsList = {
  ScannerParam: {
    case: string;
  };
  InfoRegisterParam: {
    user?: UserData;
  };
  VaccineRegisterParam: {
    medicalHistory?: string;
    symptomRecent?: string;
    contactRecent?: string;
  };
  CompleteRegisterParam: {
    id?: string;
  };
};
