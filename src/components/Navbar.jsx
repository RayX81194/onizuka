import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.svg";
import arrdown from "../assets/arrdown.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon} from '@heroicons/react/16/solid'


const Navbar = () => {
  const [pickAnime, setPickAnime] = useState(null); // Updated state type
  const [pickManga, setPickManga] = useState(null); // Updated state type

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/random/anime')
      .then(response => response.json())
      .then(data => {
        setPickAnime(data.data); // Accessing `data.data` directly if the structure matches
      })
      .catch(error => {
        console.error("Error occurred:", error); // Improved error logging
      });
  }, []);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/random/manga')
      .then(response => response.json())
      .then(data => {
        setPickManga(data.data); // Accessing `data.data` directly if the structure matches
      })
      .catch(error => {
        console.error("Error occurred:", error); // Improved error logging
      });
  }, []);

  return (
    <nav className='w-full px-5 md:px-12 py-5 text-white flex items-center justify-between'>
      <NavLink to="/onizuka/">
        <img src={logo} alt="logo" className='w-[60px] h-[60px]' />
      </NavLink>
      <div className='flex gap-x-10'>
        <div>        
          <Menu>
        <MenuButton className="inline-flex hover:text-zinc-200 transition items-center py-3 rounded-md font-normal text-zinc-400">
         Anime
         <ChevronDownIcon className="size-5 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-zinc-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/onizuka">
              <span>Anime Search</span>
            </NavLink>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/onizuka/topanime">
              <span>Top Anime</span>
            </NavLink>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <ul>
            {pickAnime && pickAnime.mal_id ? (
          <NavLink to={`/onizuka/anime/${pickAnime.mal_id}`}>
            <p className='font-normal text-white'>Pick a Anime</p>
          </NavLink>
        ) : (
          <li className='font-normal text-white'>Pick a Anime</li>
        )}
            </ul>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu> 
        </div>
        <div>
            
        <Menu>
        <MenuButton className="inline-flex hover:text-zinc-200 transition items-center py-3 rounded-md font-normal text-zinc-400">
          Manga
          <ChevronDownIcon className="size-5 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-zinc-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
         <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/onizuka/mangasearch">
              <span>Manga Search</span>
            </NavLink>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group  font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <NavLink to="/onizuka/topmanga">
              <span>Top Manga</span>
            </NavLink>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group font-normal flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <ul>
            {pickManga && pickManga.mal_id ? (
          <NavLink to={`/onizuka/manga/${pickManga.mal_id}`}>
            <p className='font-normal text-white'>Pick a Manga</p>
          </NavLink>
        ) : (
          <li className='font-normal text-white'>Pick a Manga</li>
        )}
            </ul>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
