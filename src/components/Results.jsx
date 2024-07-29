// src/components/Results.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import Footer from "./Footer"
import { useParams } from 'react-router-dom';

const Results = () => {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchResults = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw&page=${page}`);
      const data = await response.json();
      setResults(data.data);
      setHasMore(data.pagination.has_next_page);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchResults(page);
  }, [searchTerm, page]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
        <div className='flex-grow'>
        <Navbar />
      <h1 className='ml-10 mt-5 font-bold text-[30px] text-blue-500'>Results for "{searchTerm}"</h1>
      <ul>
    <div className='grid px-10 mt-8 grid-cols-5 gap-y-5 gap-x-20 items-center'>
        {results.map(anime => (
          <div>
          <a key={anime.mal_id} href= {`/onizuka/info/${anime.mal_id}`}>
          <img src={anime.images.webp.image_url} className='rounded-md w-[225px] h-[318px]' />
          <li className='text-white font-medium max-w-[220px]'>{anime.title}</li>
          </a>
          </div>
        ))}
    </div>
    </ul>

      <div className='items-center justify-center flex gap-x-3 '>
        <button className='text-white' onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button className='text-white' onClick={handleNextPage} disabled={!hasMore}>
          Next
        </button>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Results;
