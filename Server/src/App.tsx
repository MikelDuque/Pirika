import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
/* LAYOUTS */
import Layout from './layouts/RootLayout'
/* PAGES */
import NotFound from './pages/NotFound'
import Intro from './pages/Intro'

export default function App() {
  const routeDefinition = createRoutesFromElements([
    <Route path='/' element={<Layout/>} errorElement={<NotFound/>}>
      <Route index element={<Intro/>}/>
    </Route>
  ]);

  return <RouterProvider router={createBrowserRouter(routeDefinition)}></RouterProvider>
}