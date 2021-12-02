import Components from 'screens/Components';
import Home from 'screens/Home';
import Scanner from 'screens/Scanner';

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
];

export default routes;
