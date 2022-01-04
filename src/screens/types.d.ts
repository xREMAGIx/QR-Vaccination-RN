import {UserData} from 'services/auth/types';

type RootStackParamsList = {
  ScannerParam: {
    case: string;
  };

  InfoRegisterParam: {
    user?: UserData;
  };
};
