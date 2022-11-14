import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../Firebase';
import { truncateString } from '../utils/genre';
import {AiOutlineClose }from 'react-icons/ai';


const SavedShows = () => {

    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`)
    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID)
            await updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <div className='saved-show-component m-5'>
            <h3 className='text-gray-300 font-bold text-lg py-2'>My saved Shows</h3>
            <div className=' w-full flex items-center group'>
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-25 hover:opacity-75 cursor-pointer z-10 hidden group-hover:block' size={40}
                />
                <div className='flex overflow-x-scroll scrollbar-hide' id={"slider"}>
                    {movies.map((movie, index) => (
                        <div key={index} className=' movieComponent h-[140px] md:h-[200px] lg:h-[250px] min-w-fit relative mx-3 cursor-pointer'>
                            <img className='text-white h-full w-full ' src={movie?.img} alt={movie?.title} />
                            <div className='bg-black absolute top-0 left-0 opacity-0  h-full w-full overflow-hidden hover:opacity-70'>
                                <div className='flex items-center space-between m-3'>
                                    <p className='text-white text-3xl font-bold ml-4'>{movie.title}</p>
                                    <p onClick={()=>deleteShow(movie.id)} className='absolute top-4 right-4 text-gray-200'><AiOutlineClose size={25}/></p>
                                </div>
                            </div>
                        </div>
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

export default SavedShows