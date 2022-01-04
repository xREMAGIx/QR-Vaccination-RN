import MainNav from 'navigators/MainNav';
import {RegisterInfoNav} from 'navigators/RegisterInfoNav';
import {RegistrationNav} from 'navigators/RegistrationNav';
import Components from 'screens/Components';
import Registrations from 'screens/Registrations';
import Scanner from 'screens/Scanner';
import SignIn from 'screens/SignIn';
import SignUp from 'screens/SignUp';

export type Route = {
  name: string;
  page: React.FC;
};

const routes = [
  {
    name: 'Registrations',
    page: Registrations,
  },
  {
    name: 'Scanner',
    page: Scanner,
  },
  {
    name: 'Components',
    page: Components,
  },
  {
    name: 'SignIn',
    page: SignIn,
  },
  {
    name: 'SignUp',
    page: SignUp,
  },
  {
    name: 'MainNav',
    page: MainNav,
  },
  {
    name: 'RegistrationNav',
    page: RegistrationNav,
  },
  {
    name: 'RegisterInfoNav',
    page: RegisterInfoNav,
  },
];

export default routes;
