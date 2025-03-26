import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
/* LAYOUTS */
import Layout from './layouts/RootLayout'
/* PAGES */
import NotFound from './pages/NotFound'
import Intro from './pages/Intro'
import StandardLayout from './layouts/EstandarLayout';
import Home from './pages/Home';
import HeadlessLayout from './layouts/HeadlessLayout';
import Auth from './pages/Auth';

export default function App() {
  const routeDefinition = createRoutesFromElements([
    <Route path='/' element={<Layout/>} errorElement={<NotFound/>}>
      <Route element={<HeadlessLayout/>}>
        <Route index element={<Intro/>}/>
        <Route path='Auth' element={<Auth/>}/>
      </Route>

      <Route element={<StandardLayout/>}>
        <Route path='Home' element={<Home/>}/>
      </Route>
    </Route>
  ]);

  return <RouterProvider router={createBrowserRouter(routeDefinition)}></RouterProvider>
}