import React from 'react'
import Navbar from './Navbar'
import Hero from "./Hero"
import Footer from "./Footer"
import "../index.css"

const Home = () => {
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

export default Home