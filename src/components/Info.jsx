import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

const Info = () => {

    const { searchid } = useParams();
    const [animeInfo,setanimeInfo] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(`https://api.jikan.moe/v4/anime/${searchid}/full`)
      .then(response =>response.json())
      .then(data => {
        setanimeInfo(data.data);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setanimeInfo(false);
        setLoading(false)
      });
    }, [])

    if (loading) {
        return <div className='text-white'>Loading...</div>;
      }
    
  return (
    <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
    <div className='flex-grow'>
    <Navbar />
    <h1>{animeInfo.title}</h1>
    </div>
    <Footer/>
  </div>
  )
}

export default Info