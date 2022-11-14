import React from 'react'
import Main from '../components/Main';
import Row from '../components/Row';
// import { genresToId, popularGenreArray } from '../utils/genre';

const Home = () => {
  return (
    <>
      <Main />
      <Row title={"Trending Movies"} url={`trending/movie/week`} rowId={'trendingMovies'} />
      <Row title={"Trending TV Series"} url={`trending/tv/week`} rowId={'trendingSeries'} />
      {/* {popularGenreArray.map((item, index) => (
        <Row title={item["name"]} url={`discover/movie?with_genres=${genresToId[item["name"]]}`} rowId={item["id"]} key={index} />
      ))} */}
    </>
  )
}

export default Home