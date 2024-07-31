import React from 'react'
import HeroRed from "./HeroRed"
import Footer from "./Footer"
import "../index.css"
import Navbar from './Navbar'

const MangaSearch = () => {
  return (
      <div className='bg bg-zinc-900 flex flex-col min-h-screen'>
        <div className='flex-grow'>
        <Navbar />
        <HeroRed />
        </div>
        <Footer/>
      </div>

  )
}

export default MangaSearch