import React from 'react'
import "../index.css"

const Footer = () => {
  return (
    <>
    <footer className='w-full my-auto px-12 py-8 text-white flex md:flex-none md:flex-row flex-col items-center justify-between'>
        <h1 className='font-normal text-zinc-400'>鬼塚  © 2024</h1>
        <ul className='flex mt-5 md:mt-0'>
            <a href="#"><li className='font-normal hover:text-zinc-200 transition text-zinc-400 mr-10'>Documentation</li></a>
            <a href="#"><li className='font-normal hover:text-zinc-200 transition text-zinc-400 mr-10'>Privacy</li></a>
            <a href="#">
            <li className='font-normal hover:text-zinc-200 transition text-zinc-400'>Terms</li>
            </a>
        </ul>
    </footer>
    </>
  )
}

export default Footer