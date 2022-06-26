import React from 'react'
import shareVideo from '../assets/share.mp4';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logowhite.png';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const clientId = `${process.env.REACT_APP_GOOGLE_API_TOKEN}`;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start);
  })


  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj))
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl
    }
    // Create a doc and push it to Sanity
    client.createIfNotExists(doc).then(() => {
      console.log("inside navigation");
      navigate('/', {replace: true})
    })
    console.log("response", response);
  }

  return (

    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5 '>
            <img src={logo} alt="logo" width='130px'  className='rounded-xl'/>
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 cursor-pointer rounded-lg outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4' /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"

            />
          </div>
        </div>
      </div>
    </div>


  )
}

export default Login