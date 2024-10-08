import React from 'react'
import Hero from "./Hero"
import Footer from "./Footer"
import "../index.css"
import Navbar from './Navbar'

const AnimeSearch = () => {
  return (
      <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
        <div className='flex-grow'>
        <Navbar />
        <Hero />
        </div>
        <Footer/>
      </div>

  )
}

export default AnimeSearch