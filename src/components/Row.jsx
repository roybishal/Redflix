import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Movie from './Movie';
// eslint-disable-next-line
import { fetchFromAPI, IMAGE_BASE_URL } from '../utils/fetchFromAPI';
// eslint-disable-next-line
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';



const Row = ({ title, url, rowId }) => {

  const [movies, setMovies] = useState([]);

  // fetched data for popular movies ============================================
  useEffect( ()=>{
    const data = fetchFromAPI(url).then((data)=>{setMovies(data?.results?.slice(0,6))});
  }, [title]);
  

  // dummy data for popular movies ==============================================
  // useEffect(() => {
  //   const data = popularMovies;
  //   setMovies(data?.results)
  // }, [title])
  // ============================================================================


  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft -= 500;
  }
  const slideRight = () => {
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft += 500;
  }
  


  return (
    <div className='row-component m-5'>
      <h3 className='text-red-700 text-center font-bold text-xl py-2'>{title}</h3>
      <div className=' w-full flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-25 hover:opacity-75 cursor-pointer z-10 hidden group-hover:block' size={40}
        />
        <div className='flex overflow-x-scroll scrollbar-hide' id={"slider" + rowId}>
          {movies.map((movie, index) => (
            (movie?.backdrop_path) && <Movie movie={movie} key={index} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </div>
  )
}

export default Row