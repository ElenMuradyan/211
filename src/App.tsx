import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import LoadingWrapper from './components/sheard/LoadingWrapper';
import { ROUTE_PATHS } from './util/constants/routhes';
import MainLayout from './layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserProfileInfo } from './state-management/slices/userProfile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CabinetLayout from './layouts/CabinetLayout';
import { RootState } from './typescript/interface/rootState';
import { AppDispatch } from './state-management/store';

import './App.css';
import Mainpage from './pages/MainPage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfileInfo: { isAuth } } = useSelector((store: RootState) => store.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfileInfo());
  },[fetchUserProfileInfo]);

  return (
    <LoadingWrapper>
      <RouterProvider
      router={
        createBrowserRouter(
          createRoutesFromElements(
            <Route path={ROUTE_PATHS.HOME} element={<MainLayout/>}>
                <Route index element={isAuth ? <Navigate to={ROUTE_PATHS.CABINET} /> : <Login />}/>
                <Route path={ROUTE_PATHS.LOGIN} element={isAuth ? <Navigate to={ROUTE_PATHS.CABINET} /> : <Login />}/>
                <Route path={ROUTE_PATHS.REGISTER} element={isAuth ? <Navigate to={ROUTE_PATHS.CABINET} /> : <Register />}/>    

                      {/*Cabinet */}

                <Route path={ROUTE_PATHS.CABINET} element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_PATHS.LOGIN} />}>
                <Route index element={<Mainpage/>}/>
                </Route>
            </Route>
          )
        )
      }
      />
    </LoadingWrapper>
  );
}

export default App;