import React, { useState, useEffect } from 'react'
import './styles.css'
import Card from './Card'

// Declare variables
const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'api_key=30e4bd0e312d91a8eb6d6d24269921cb'
let API_URL = BASE_URL+'/discover/movie?primary_release_year=2022&sort_by=vote_average.desc&'+API_KEY
let genreArr = ["Trending", "Thriller", "Family", "Drama", "Comedy"]


// Request movies by genre
const requests = {
 
  fetchThrillerMovies: `${BASE_URL}/discover/movie?with_genres=53&${API_KEY}`,
  fetchKidsFamilyMovies: `${BASE_URL}/discover/movie?with_genres=10751&${API_KEY}`,
  fetchDramaMovies:  `${BASE_URL}/discover/movie?with_genres=18&${API_KEY}`,  
  fetchComedy: `${BASE_URL}/discover/movie?with_genres=35&${API_KEY}`,
}


export default function Main() {

  const [movieData, setMovieData] = useState([])
  const [url, setUrl] = useState(API_URL)
  const [search, setSearch] = useState()
  

  async function getMovies() {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.results)
    setMovieData(data.results)
  }

  useEffect(() => {
    getMovies()
  }, [url])

  function getGenre (genre) {
    if(genre == "Trending") {
      API_URL = BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY
    }
    if(genre == "Thriller") {
      API_URL = requests.fetchThrillerMovies
    }
    if(genre == "Family") {
      API_URL = requests.fetchKidsFamilyMovies
    }
    if(genre == "Drama") {
      API_URL = requests.fetchDramaMovies
    }
    if(genre == "Comedy") {
      API_URL = requests.fetchComedy
    }

    setUrl(API_URL)
  }

  function searchMovie(ev) {
    if(ev.key == "Enter") {
      API_URL = BASE_URL+'/search/movie?'+API_KEY+'&query='+search
      setUrl(API_URL)
      setSearch(' ')
    }
  }

  const [showLinks, setShowLinks] = useState(false)

  return (
    <>
      <nav>
        <div className='menu'>
          <div className='brand'>MouFlix</div>
          <ul id={showLinks ? "active" : ""}>
            {
              genreArr.map((value) => {
                return (
                  <li><a href='#' name={value} onClick={(e) => {getGenre(e.target.name)}}>{value}</a></li>
                )
              })
            }                   
          </ul>
          <button className="hamburger" onClick={() => setShowLinks(!showLinks)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        
        </div>
        <form>
          <div className='searchbar'>
            <input type="text" className='search-input' placeholder='Movie title' onChange={(e) => {setSearch(e.target.value)}} value={search}
            onKeyPress={searchMovie}></input>
            <button><i className='uil uil-search search-icon'></i></button>
          </div>
        </form>
      </nav>

      <section className='container'>
        {
          (movieData.length==0) ? <p className='not-found'>Something went wrong. Movie not found.</p> : movieData.map((res, pos) => {
            return (
              <Card data={res} key={pos} />
            )
          })
        }
        
      </section>
      <footer>
        <p>&#169; MouFlix 2022 All rights reserved</p>
      </footer>  
    </>
  )
}

