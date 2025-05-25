import { Route } from 'react-router-dom';
import Home from '../pages/home';
import { ApplicationRoutes } from './routes-constant';
import MyCollectionPage from '../pages/collections';
import TransactionHistory from '../pages/transaction-history';


export const CustomRoutes = () => {
  return [
    <Route>
      <Route element={<Home />} path={ApplicationRoutes.HOME}></Route>
      <Route element={<MyCollectionPage />} path={ApplicationRoutes.COLLECTIONS}></Route>
      <Route element={<TransactionHistory />} path={ApplicationRoutes.TRANSACTIONS}></Route>
    </Route>,
  ];
};
