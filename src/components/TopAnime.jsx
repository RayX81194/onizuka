import React from 'react'
import Navbar from './Navbar'
import Footer from "./Footer"
import { useState, useEffect } from 'react'

const Anime = () => {

    const [topAnime,settopAnime] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch('https://api.jikan.moe/v4/top/anime')
        .then(response => response.json())
        .then(data => {
          settopAnime(data.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }
  
  return (
    <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
    <div className='flex-grow'>
    <Navbar />
    <h1 className='ml-10 mt-5 font-bold text-[30px] text-blue-500'>Top Anime</h1>
    <ul>
    <div className='grid px-10 mt-8 grid-cols-5 gap-y-5 gap-x-20 items-center'>
        {topAnime.map(anime => (
          <div>
          <a key={anime.mal_id} href= {`/onizuka/anime/${anime.mal_id}`}>
          <img src={anime.images.webp.image_url} className='rounded-md w-[225px] h-[318px]' />
          <li className='text-white font-medium max-w-[220px]'>{anime.title}</li>
          </a>
          </div>
        ))}
    </div>
    </ul>



    </div>
    <Footer/>
  </div>
  )
}

export default Anime