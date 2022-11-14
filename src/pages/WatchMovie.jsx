import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { fetchFromAPI, IMAGE_BASE_URL } from '../utils/fetchFromAPI';
import { truncateString } from '../utils/genre';

const WatchMovie = () => {

  const [movie, setMovie] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`movie/${id}`).then((data) => {setMovie(data)})
  }, [id]);

  useEffect(()=>{
    fetchFromAPI(`/movie/${id}/similar`).then((data) => { setSimilarMovies(data.results.slice(0,10)) })
  }, [id])

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft -= 300;
  }
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft += 300;
  }


  return (
    <div className='w-full flex-col'>
      <div className='h-max w-full my-5 px-2 justify-center flex'>
        <video className='w-full' controls >
          <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4" />
          <source src="http://clips.vorwaerts-gmbh.de/VfE.webm" type="video/webm" />
          <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv" type="video/ogg" />
        </video>
      </div>

      <div className='w-full top-40 p-4 md:p-8'>
        <h1 className='text-red-600 text-2xl font-bold sm:text-5xl'>{movie?.title}</h1>
        <p className='text-gray-400 py-1 text-sm'>Released: {movie?.release_date}</p>
        <h2 className='text-red-600 text-xl py-5'>Plot</h2>
        <p className='w-full text-gray-300'>
          {movie?.overview}
        </p>
        <h2 className='text-red-600 text-xl py-5'>Genres</h2>
        <div>
          {movie?.genres?.map((item, index) => (
            <Link to="/" key={index}>
              <button className='text-gray-300 px-5 py-1 mr-2 my-1 bg-gray-900 rounded-md'  >{item["name"]}</button>
            </Link>
          ))}
        </div>
        <h2 className='text-red-600 text-xl py-5'>Similar Movies</h2>



        <div className=' w-full flex items-center group'>
          <MdChevronLeft
            onClick={slideLeft}
            className='bg-white left-0 rounded-full absolute opacity-25 hover:opacity-75 cursor-pointer z-10 hidden group-hover:block' size={40}
          />
          <div className='flex overflow-x-scroll scrollbar-hide' id={"slider"}>
            {similarMovies?.map((movie, index) => (
              <Link to={`/watchMovie/${((truncateString(movie?.title, 70) || truncateString(movie?.name, 70)).replace(/\s/g,'-'))}/${movie?.id}`} key={index}>
                <div className='w-[75px] sm:w-[150px] mx-5'>
                  <img className='w-full' src={`${IMAGE_BASE_URL}${movie?.poster_path}`} alt="" loading='lazy' />
                  <p className='text-gray-300 flex-wrap text-sm md:text-lg'>{truncateString(movie?.title, 25)}</p>
                </div>
              </Link>
            ))}
          </div>
          <MdChevronRight
            onClick={slideRight}
            className='bg-white right-0 rounded-full absolute opacity-50 hidden hover:opacity-100 cursor-pointer z-10  group-hover:block'
            size={40}
          />
        </div>


      </div>
    </div>
  )
}

export default WatchMovie