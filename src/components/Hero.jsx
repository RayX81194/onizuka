// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import search from "../assets/search.svg";

const Hero = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [animeSearch, setAnimeSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/top/anime?filter=airing')
      .then(response => response.json())
      .then(data => {
        const topSevenAnime = data.data.slice(0, 6);
        setTopAnime(topSevenAnime);
        console.log(topSevenAnime);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    navigate(`/onizuka/results/${animeSearch}`);
  }

  return (
    <div className='text-white flex flex-col text-center items-center justify-center py-10'>
      <h1 className='text-blue-600 text-[3rem] xl:text-[4rem] font-bold '>
        鬼塚
      </h1>
      <p className='text-zinc-500 font-medium mb-7 text-[1.2rem] max-w-[300px] md:max-w-[400px] xl:max-w-full md:text-[1.4rem]'>Find Anime anywhere, anytime, anyplace</p>
      <form onSubmit={handleSearch}>
        <div className='bg-zinc-800 w-[23rem] h-[3.5rem] md:w-[39rem] px-5  justify-between flex rounded-xl'>
          <input
            className='bg-zinc-800 w-[25rem] md:w-[34rem] md:h-[3.5rem]'
            type="text"
            placeholder='eg. Death Note, Re:Zero'
            value={animeSearch}
            onChange={e => setAnimeSearch(e.target.value)}
          />
          <button type="submit"><img src={search} className='w-[22px] h-[22px]' alt="search" /></button>
        </div>
      </form>
      <div className='text-start my-3 '>
        <h2 className='font-normal text-zinc-400'>Trending Searches</h2>
      </div>
      <div className='grid md:grid-cols-2 gap-x-3'>
        {topAnime.map(anime => (
          <a key={anime.mal_id} href={`/onizuka/anime/${anime.mal_id}`}>
            <div className='bg-zinc-800 hover:bg-zinc-600 transition duration-75 gap-x-2 rounded-3xl mt-3 flex py-1 px-3'>
              <img src={search} alt="search" className='w-[15px] h-[20px]' />
              <p className='font-normal text-zinc-4gi00 text-[0.8rem]'>{anime.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hero;
