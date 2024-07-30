import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import play from '../assets/play.svg';
import { useParams } from 'react-router-dom';

const Info = () => {
  const { searchid } = useParams();
  const [animeInfo, setAnimeInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${searchid}/full`)
      .then(response => response.json())
      .then(data => {
        setAnimeInfo(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setAnimeInfo({});
        setLoading(false);
      });
  }, [searchid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  if (loading) {
    return <div className='w-full h-screen bg bg-zinc-900'>Loading...</div>;
  }

  const synopsis = animeInfo.synopsis || '';
  const textToShow = isExpanded ? synopsis : synopsis.substring(0, synopsis.length / 2);
  const trailerUrl = animeInfo.trailer?.embed_url || '';

  return (
    <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
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
              <button className='text-white block' onClick={toggleModal}>
                <div className='flex mb-5 px-16 py-2 items-center justify-center gap-x-2 bg-blue-600 transition hover:bg-blue-700 rounded-md'>
                  <img src={play} className='w-[20px] h-[20px]' />
                  <p>Watch Trailer</p>
                </div>
              </button>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Rank</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.rank || "-"}</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Score</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.score || "-"}/10</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Status</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.status || "-"}</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Source</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.source || "-"}</h1>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-[17px] text-zinc-300 font-normal'>Episodes</h1>
                <h1 className='text-[17px] text-white font-medium'>{animeInfo.episodes || "-"}</h1>
              </div>
            </div>
          </div>
          <div>
            <ul className='flex gap-x-5'>
              {animeInfo.genres?.map((genre, index) => (
                <li key={index} className='px-3 py-1 bg-blue-800 bg-opacity-30 text-blue-500 text-[12px] rounded-xl font-bold'>{genre.name}</li>
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
            <ul className='grid grid-cols-5 max-w-[900px] mt-5 gap-y-2 gap-x-5'>
              {animeInfo.streaming?.map(streaming => (
                <a href={streaming.url} key={streaming.name}>
                  <li className='hover:text-blue-600 hover:underline transition text-blue-500 font-normal'>{streaming.name}</li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal for trailer */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center'>
          <div
            ref={modalRef}
            className='relative  p-4 rounded-lg w-[1000px]'
          >
            <button
              className='absolute top-2 right-2 text-2xl font-bold'
              onClick={toggleModal}
            >
              ×
            </button>
            <iframe
              src={trailerUrl}
              title='Trailer'
              width='100%'
              height='500'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
