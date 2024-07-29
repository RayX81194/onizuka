import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.svg"


const Navbar = () => {
  return (
    <>
    <nav className='w-full px-5 md:px-12 py-5 text-white flex items-center justify-between'>
        <NavLink to="/onizuka/"><img src={logo} alt="logo" className='w-[60px] h-[60px]' /></NavLink>
        <ul className='flex'>
            <NavLink to='/onizuka/topanime'><li className='font-normal  hover:text-zinc-200 text-zinc-400 mr-10'>Top Anime</li></NavLink>
            <NavLink to='/onizuka/topmanga'><li className='font-normal hover:text-zinc-200 text-zinc-400'>Top Manga</li></NavLink>
        </ul>
    </nav>
    </>
  )
}

export default Navbar