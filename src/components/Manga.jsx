import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

const InfoManga = () => {
  const { searchid } = useParams();
  const [mangaInfo, setMangaInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga/${searchid}/full`)
      .then(response => response.json())
      .then(data => {
        setMangaInfo(data.data);
        console.log(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMangaInfo({});
        setLoading(false)
      });
  }, [searchid]);

  if (loading) {
    return <div className='w-full h-screen bg bg-zinc-900'>Loading...</div>;
  }


  const synopsis = mangaInfo.synopsis || '';
  const textToShow = isExpanded ? synopsis : synopsis.substring(0, synopsis.length / 2);

  return (
    <div className='bg bg-zinc-900  flex flex-col min-h-screen'>
    <div className='flex-grow'>
      <Navbar />
      <div className='flex my-20 gap-x-10'>
        <div className='ml-40'>
        <div className='image-container'>
            <img
              src={mangaInfo.images?.jpg?.image_url || ''}
              alt={mangaInfo.title || 'Anime Image'}
            />
          </div>
            <div className='mt-5'>
            <div className='flex items-center justify-between'>
              <h1 className='text-[17px] text-zinc-300 font-normal'>Rank</h1>
              <h1 className='text-[17px] text-white font-medium'>{mangaInfo.rank}</h1>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className='text-[17px] text-zinc-300 font-normal'>Score</h1>
              <h1 className='text-[17px] text-white font-medium'>{mangaInfo.score}/10</h1>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className='text-[17px] text-zinc-300 font-normal'>Status</h1>
              <h1 className='text-[17px] text-white font-medium'>{mangaInfo.status}</h1>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className='text-[17px] text-zinc-300 font-normal'>Chapters</h1>
              <h1 className='text-[17px] text-white font-medium'>{mangaInfo.chapters}</h1>
            </div>
            </div>
        </div>
        <div>
      <ul className='flex gap-x-5'>
        {mangaInfo.genres?.map((manga, index) => (
          <li key={index} className=' px-3 py-1 bg-blue-800 bg-opacity-30 text-blue-500 text-[12px] rounded-xl font-bold'>{manga.name}</li>
        ))}
      </ul>
      <h1 className='text-white max-w-[700px] mt-2 font-medium text-[40px]'>{mangaInfo.title}</h1>
      <h2 className='text-white font-normal max-w-[700px] text-[20px]'>{mangaInfo.title_english} · {mangaInfo.title_japanese}</h2>
      <h2 className='text-zinc-300 font-normal text-[20px]'>{mangaInfo.authors?.[0]?.name}</h2>
      <div className='mr-40'>
      <p className='text-zinc-300 mt-5 text-[16px] font-normal'>
        {textToShow}{!isExpanded && '...'}
      </p>
      <button className='text-white mt-2 font-bold' onClick={toggleReadMore}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
      </div>
        </div>
      </div>


    </div>
    <Footer />
  </div>
  );
};

export default InfoManga;
