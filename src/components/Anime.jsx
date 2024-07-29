import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

const Info = () => {
  const { searchid } = useParams();
  const [animeInfo, setAnimeInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${searchid}/full`)
      .then(response => response.json())
      .then(data => {
        setAnimeInfo(data.data);
        console.log(data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setAnimeInfo({});
        setLoading(false);
      });
  }, [searchid]);

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  const synopsis = animeInfo.synopsis || '';
  const textToShow = isExpanded ? synopsis : synopsis.substring(0, synopsis.length / 2);

  return (
    <div className='bg bg-zinc-900  flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Navbar />
        <div className='flex my-20 gap-x-10'>
          <div className='ml-40'>
          <div className='image-container'>
              <img
                src={animeInfo.images?.jpg?.image_url || ''}
                alt={animeInfo.title || 'Anime Image'}
              />
            </div>
              <div className='mt-5'>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Rank</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.rank}</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Score</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.score}/10</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Status</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.status}</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Source</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.source}</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Episodes</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.episodes}</h1>
              </div>
              </div>
          </div>
          <div>
          <a className='text-white bg-zinc-700 rounded-md px-3 py-2' href={animeInfo.trailer.embed_url}>Watch Trailer</a>
        <ul className='flex mt-7 gap-x-5'>
          {animeInfo.genres?.map((anime, index) => (
            <li key={index} className=' px-3 py-1 bg-blue-800 bg-opacity-30 text-blue-500 text-[12px] rounded-xl font-bold'>{anime.name}</li>
          ))}
        </ul>
        <h1 className='text-white max-w-[700px] mt-2 font-medium text-[40px]'>{animeInfo.title}</h1>
        <h2 className='text-white font-normal max-w-[700px] text-[20px]'>{animeInfo.title_english} · {animeInfo.title_japanese}</h2>
        <h2 className='text-zinc-300 font-normal text-[20px]'>{animeInfo.studios?.[0]?.name} · {animeInfo.season} {animeInfo.year}</h2>
        <div className='mr-40'>
        <p className='text-zinc-300 mt-5 text-[16px] font-normal'>
          {textToShow}{!isExpanded && '...'}
        </p>
        <button className='text-white mt-2 font-bold' onClick={toggleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
        </div>
        <h1 className='text-white mt-5 font-normal text-2xl'>Streaming on:</h1>
          <ul className='grid grid-cols-5  max-w-[900px] mt-5 gap-y-2  gap-x-5'>
            {animeInfo.streaming.map(anime => (
              <a href={anime.url} >
              <li className='underline text-zinc-300 font-normal'>{anime.name}</li> 
              </a>
            ))}
          </ul>
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
};

export default Info;
