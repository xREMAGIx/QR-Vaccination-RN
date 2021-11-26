import Home from 'screens/Home';

export type Route = {
  name: string;
  page: React.FC;
};

const routes = [
  {
    name: 'Home',
    page: Home,
  },
];

export default routes;
