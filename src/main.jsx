import React from 'react'
import ReactDOM from 'react-dom/client'
import AnimeSearch from './components/AnimeSearch'
import MangaSearch from './components/MangaSearch'
import TopAnime from './components/TopAnime'
import TopManga from './components/TopManga'
import Anime from "./components/Anime";
import Manga from "./components/Manga";
import Error from "./components/Error";
import Results from './components/Results';
import ResultsManga from './components/ResultsManga';
import './index.css'
import { AnimatePresence } from 'framer-motion'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path:"/onizuka/",
    element: <AnimeSearch/>,
    errorElement:<Error />
},
  {
    path:"/onizuka/mangasearch",
    element: <MangaSearch/>,
    errorElement:<Error />
},
{ 
  path:"/onizuka/topanime",
  element: <TopAnime/>,
  errorElement:<Error />
  
},
{
  path:"/onizuka/topmanga",
  element: <TopManga />,
  errorElement:<Error />
},
{
  path: "/onizuka/results/:searchid",
  element: <Results />,
  errorElement: <Error />
},
{
  path: "/onizuka/resultsmanga/:searchid",
  element: <ResultsManga />,
  errorElement: <Error />
},
{
  path: "/onizuka/anime/:searchid",
  element: <Anime />,
  errorElement: <Error />
},
{
  path: "/onizuka/manga/:searchid",
  element: <Manga />,
  errorElement: <Error />
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimatePresence>
    <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>,
)
