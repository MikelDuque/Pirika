import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import {RootLayout, StandardLayout, HeadlessLayout} from './layouts'
import {Intro, Home, Auth, NotFound} from "./pages";
import { AuthPath, HomePath, RootPath } from './utils/paths';
import { LoggedPrivateRoute } from './layouts/RestrictedRoutes';

export default function App() {
  const routeDefinition = createRoutesFromElements([
    <Route path={RootPath} element={<RootLayout/>} errorElement={<NotFound/>}>
      <Route element={<HeadlessLayout/>}>
        <Route index element={<Intro/>}/>
        <Route path={AuthPath} element={<Auth/>}/>
      </Route>

      <Route element={<LoggedPrivateRoute/>}>
        <Route element={<StandardLayout/>}>
          <Route path={HomePath} element={<Home/>}/>
        </Route>
      </Route>
    </Route>
  ]);

  return <RouterProvider router={createBrowserRouter(routeDefinition)}></RouterProvider>
}