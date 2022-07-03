import React, { useEffect, useState, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { client } from '../client';
import logo from '../assets/logowhite.png';
import { userQuery } from '../util/data';

// AiFillCloseCircle

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    console.log("Query", query);
    client.fetch(query)
      .then(data => {
        console.log(data);
        setUser(data[0])
      })
  }, [])

  // Keep the page moves to top on load
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])




  return (
    <div className='flex bg-grey-50 flex-col md:flex-row h-screen transaction-height duration-75 ease out '>

      {/* Desktop View */}
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>

      {/* Small Screen View */}
      <div className='flex md:hidden flex-row'>

        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSidebar(true)}
          />

          <Link to='/'>
            <img src={logo} alt="logo" className='w-16' />
            {/* Logo */}
          </Link>

          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='w-14 rounded-full' />
          </Link>
        </div>
        {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />

          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
      )}

      </div>

      
      {/*  Main Content*/}
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins />} />
        </Routes>
      </div>

    </div>
  )
}

export default Home