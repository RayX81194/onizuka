import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
import Anime from './components/Anime'
import Manga from './components/Manga'
import Info from "./components/Info";
import Error from "./components/Error";
import Results from './components/Results';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/onizuka",
    element: <Home/>,
    errorElement:<Error />
},
{
  path:"/onizuka/anime",
  element: <Anime/>,
  errorElement:<Error />
  
},
{
  path:"/onizuka/manga",
  element: <Manga />,
  errorElement:<Error />
},
{
  path: "/onizuka/results/:searchTerm",
  element: <Results />,
  errorElement: <Error />
},
{
  path: "/onizuka/info/:searchid",
  element: <Info />,
  errorElement: <Error />
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
