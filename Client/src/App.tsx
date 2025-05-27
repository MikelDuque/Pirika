import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { RootLayout, StandardLayout, HeadlessLayout } from './layouts'
import { Intro, Home, Auth, NotFound, Search, User, Collection } from "./pages";
import { AuthPath, CollectionPath, HomePath, Index, ProfilePath, SearchPath } from './utils/paths';
import { LoggedPrivateRoute, SkipRoutes } from './layouts/RestrictedRoutes';

export default function App() {
  const routeDefinition = createRoutesFromElements([
    <Route path={Index} element={<RootLayout/>} errorElement={<NotFound/>}>
      <Route element={<SkipRoutes/>}>
        <Route element={<HeadlessLayout/>}>
          <Route index element={<Intro/>}/>
          <Route path={AuthPath} element={<Auth/>}/>
        </Route>
      </Route>

      <Route element={<LoggedPrivateRoute/>}>
        <Route element={<StandardLayout/>}>
          <Route path={HomePath} element={<Home/>}/>
          <Route path={SearchPath} element={<Search/>}/>
          <Route path={`${ProfilePath}:id`} element={<User/>}/>
          <Route path={`${CollectionPath}:id`} element={<Collection/>}/>
        </Route>
      </Route>
    </Route>
  ]);

  return <RouterProvider router={createBrowserRouter(routeDefinition)}/>
}