import React from 'react'
import { useEffect } from "react";
import { useState } from 'react'
import { fetchFromAPI, IMAGE_BASE_URL } from "../utils/fetchFromAPI";

const Main = () => {

  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random()*movies.length)]

  // fetched data for popular movies ============================================
  useEffect(()=>{
    const data = fetchFromAPI(`trending/movie/day`).then( (data) => {setMovies(data.results)});
  }, [])
  

  // dummy data for popular movies ==============================================
  // useEffect( () => {
  //   const data = popularMovies;
  //   setMovies(data?.results)
  // }, [])
  

  const truncateString = (str, limit) => {
    if(str?.length>limit){
      return str.slice(0,limit) + '...';
    }
    else {
      return str;
    }
  };

  return (
    <div className='w-full h-[550px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'/>
        <img className='w-full h-[550px]' src={IMAGE_BASE_URL+movie?.backdrop_path} alt={movie?.title+" backdrop"} loading='lazy' />
        <div className='absolute w-full top-40 p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold '>{movie?.title}</h1>
          <div className='my-4'>
            <button className='border bg-gray-300 text-black border-gray-300 rounded py-2 px-5'>Play</button>
            <button className='border text-white border-gray-300 rounded py-2 px-5 ml-4'>Watch Later</button>
          </div>
          <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
          <p className='w-full md:w-[50%] ld:w-[20%] text-gray-300'>
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main;