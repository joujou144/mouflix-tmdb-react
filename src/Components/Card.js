import React from 'react'
import './styles.css'

export default function Card(movie) {
  // console.log(movie.data)
  const IMG_URL = 'https://image.tmdb.org/t/p/w500'
  return (
    <>
      <div className='movie'>
        <img src={IMG_URL+movie.data.poster_path} className='poster'></img>
        <div className='movie-info'>
          {/* <h4 className='movie-title'>{movie.data.title}</h4> */}
          <span className='rating'>{movie.data.vote_average}</span>
        </div>

        <div className='overview'>
          {/* <h4>Synopsis</h4> */}
          {movie.data.overview}
        </div>
      </div>    
    </>
  )
}
