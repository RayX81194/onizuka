import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams, Link } from 'react-router-dom';

const InfoManga = () => {
  const { searchid } = useParams();
  const [mangaInfo, setMangaInfo] = useState({});
  const [characterlist, setCharacterList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  
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
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMangaInfo({});
        setLoading(false)
      });
  }, [searchid]);


  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga/${searchid}/recommendations`)
      .then(response => response.json())
      .then(data => {
        const recommlist = data.data.slice(0, 6);
        setRecommendations(recommlist);
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
      });
  }, [searchid]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga/${searchid}/characters`)
      .then(response => response.json())
      .then(data => {
        const characterlistinfo = data.data.slice(0, 9);
        setCharacterList(characterlistinfo);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setCharacterList([]);
        setLoading(false);
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
              <h1 className='text-[17px] text-white font-medium'>{mangaInfo.chapters || "-"}</h1>
            </div>
            </div>
        </div>
        <div>
      <ul className='flex gap-x-5'>
        {mangaInfo.genres?.map((manga, index) => (
          <li key={index} className=' px-3 py-1 bg-blue-800 bg-opacity-30 text-blue-500 text-[12px] rounded-xl font-bold'>{manga.name}</li>
        ))}
      </ul>
      <h1 className='text-white max-w-[700px] mt-2 font-medium text-[40px]'>{mangaInfo.title} ({mangaInfo.type})</h1>
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
      <h1 className='text-zinc-100 mt-7 font-normal text-2xl'>Characters:</h1>
            <ul className='grid grid-cols-3 max-w-[900px] mt-5 gap-y-2 gap-x-5'>
              {characterlist.map(character => (
                <li key={character.character.mal_id} className='text-white'>
                  <div className='flex items-center gap-x-3'>
                    <img src={character.character.images.webp.image_url} alt={character.character.name} className='w-[55px] h-[80px]' />
                    <div className='flex flex-col'>
                    <span className='font-medium  text-blue-500 max-w-[200px] text-[20px]'>{character.character.name}</span>
                    <span className='font-normal text-zinc-200 text-[13px]'>{character.role}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
      <h1 className='text-zinc-100 mt-7 font-normal text-2xl'>Recommendations:</h1>
      <ul className='grid grid-cols-3 max-w-[900px] mt-5 gap-y-10 gap-x-5'>
      {recommendations.map(manga => (
          <div key={manga.entry.mal_id} className='relative w-[225px] h-[318px] group'>
          <Link to={`/onizuka/manga/${manga.entry.mal_id}`}>
          <img
                    src={manga.entry.images.webp.image_url}
                    alt={manga.entry.title}
                    className='md:w-full w-[160px] h-[250px] md:h-full object-cover rounded-md'
             />
             <div className='absolute text-start items-center justify-center sm:items-start sm:justify-end transition-transform duration-300 inset-0 flex flex-col p-2 rounded-md'>
                    <div className=' text-zinc-100 flex flex-col bg-black bg-opacity-70 p-2 rounded-md'>
                      <span className='text-[1.1rem] font-medium'>{manga.entry.title}</span>
                    </div>
                  </div>
          </Link>
            </div>
        ))}
      </ul>
        </div>
      </div>


    </div>
    <Footer />
  </div>
  );
};

export default InfoManga;
