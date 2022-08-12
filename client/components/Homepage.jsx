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
    getData('One Piece', 'anime');
  }, []);
  
  async function getData(parameter, parameter2) {
    const options = {
      method: 'GET',
      url: 'https://jikan1.p.rapidapi.com/search/' + parameter2,
      params: {q: parameter },
      headers: {
        'X-RapidAPI-Key': 'Your API key here',
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
  const addLibrary = async (event) => {
    // const arr = data.split(',');
    console.log('this is event target id', event.currentTarget.id);
    const find = responseData.filter(obj => {
      return obj.title === event.currentTarget.id;
    })
    console.log(find[0]);
    const resultObj = find[0];
    try {
      const library = await fetch('/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultObj),
      })
      console.log('this is find', library);
      if (library.ok) {
        return library.json();
      }
      throw new Error('Something went wrong: status 500');
    }
    catch (err) {
      console.log('this is error', err);
    }
  }

  if (!responseData) return <div>No Record Found</div>;
  return (
    <div className='outerBox'>
      <Link to="/library">
        <div className='button' style={{float:"right"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-collection" viewBox="0 0 16 16">
            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
          </svg>
        </div>
      </Link>
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
        <input className="button" type="submit" value="Search"></input>
      </form>
      <div className='buttons'>
        <div className='button' onClick={event => page > 0 ?setPage(page - 1):setPage(page)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </div>
        <div className='button' onClick={event => page < Math.floor(responseData.length / 10) ? setPage(page + 1):setPage(page)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
        </div>
      </div>
      <div>
        {responseData.slice(0 + page * 10, 10 + page * 10).map((result) => (
          // eslint-disable-next-line react/jsx-key
          <div className='marketBox'> 
            <div className='button' onClick={event => addLibrary(event)} id={result.title} style={{float:"left"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
              </svg>
            </div>
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

