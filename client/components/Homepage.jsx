import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';

export default function Homepage() {
  const [responseData, setResponseData] = useState(null);
  const [searchtxt, setSearch] = useState('');
  const [genretxt, setGenre] = useState('');
  const [page, setPage] = useState(0);
  useEffect(() => {
    getData('Attack on Titan', 'anime');
  }, []);
  
  async function getData(parameter, parameter2) {
    const options = {
      method: 'GET',
      url: 'https://jikan1.p.rapidapi.com/search/' + parameter2,
      params: {q: parameter },
      headers: {
        'X-RapidAPI-Key': 'd0d4ac40d7mshd88a38c634d2e5dp1b70d1jsnfa0cf4719701',
        'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
      }
    };
    return axios.request(options).then(function (response) {
      setResponseData(response.data.results);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const searchAPI = (event) => {
    event.preventDefault();
    getData(searchtxt, genretxt);
  }

  if (!responseData) return <div>No Record Found</div>;
  return (
    <div className='outerBox'>
      <header><strong>Search</strong></header>
      <form onSubmit={searchAPI}>
        <label>
          Title:
          <input type="text" placeholder='Series' onChange={event => setSearch(event.target.value)}></input>
        </label>
        <label>
          Genre:
          <input type="text" placeholder='Anime/Manga' onChange={event => setGenre(event.target.value)}></input>
        </label>
        <input type="submit" value="Search"></input>
      </form>
      <div className='buttons'>
          <div className='button' onClick={event => setPage(page--)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
          </div>
        <Link to="/library">
          <div className='button' onClick={event => setPage(page++)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg>
          </div>
        </Link>
          <div className='button'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
          </div>
      </div>
      <div>
        {responseData.map((result, index) => (
          // eslint-disable-next-line react/jsx-key
          <div className='marketBox'>
            <img src = {result.image_url}></img>
            <p><strong>{result.title}</strong></p>
            <a href={result.url} target="_blank" rel="noopener noreferrer">Link</a>
            <p>{result.synopsis}</p>
          </div>
        ))}
          
      </div>
    </div>
  )
}

