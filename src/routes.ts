import MainNav from 'navigators/MainNav';
import {RegistrationNav} from 'navigators/RegistrationNav';
import Components from 'screens/Components';
import Home from 'screens/Home';
import Scanner from 'screens/Scanner';
import SignIn from 'screens/SignIn';
import SignUp from 'screens/SignUp';

export type Route = {
  name: string;
  page: React.FC;
};

const routes = [
  {
    name: 'Home',
    page: Home,
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
];

export default routes;
