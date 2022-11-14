import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { truncateString } from '../utils/genre';
import { UserAuth } from '../context/AuthContext';
import { db } from '../Firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { IMAGE_BASE_URL } from '../utils/fetchFromAPI';
import { Link } from 'react-router-dom';


const Movie = ({ movie, index }) => {

    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID,
                {
                    savedShows: arrayUnion({
                        id: movie.id,
                        title: movie.title,
                        img: movie.backdrop_path
                    })
                })
        } else {
            alert("Sign in first")
        }
    }


    return (
        <div className=' movieComponent h-[140px] md:h-[200px] lg:h-[250px] min-w-fit relative mx-3 cursor-pointer'>
            <Link to={`/watchMovie/${((truncateString(movie?.title, 70) || truncateString(movie?.name, 70)).replace(/\s/g,'-'))}/${movie?.id}`}>
                <img className='text-white h-full w-full ' src={IMAGE_BASE_URL + movie?.backdrop_path} alt={movie?.title} loading="lazy"/>
                <div className='bg-black absolute top-0 left-0 opacity-0  h-full w-full overflow-hidden hover:opacity-70'>
                    <div className='flex items-center m-3'>
                        <p onClick={saveShow}>
                            {like ? (<FaHeart className=' text-gray-300' />) :
                                (<FaRegHeart className=' text-gray-300' />)}
                        </p>
                        <p className='text-white font-bold ml-4 text-sm md:text-lg'>{truncateString(movie?.title, 70) || truncateString(movie?.name, 70)}</p>
                    </div>
                    <div className='my-4 mx-4'><p className='xs:hidden sm:text-white text-xs '>{truncateString(movie?.overview, 150)}</p></div>
                </div>
            </Link>
        </div>
    )
}

export default Movie