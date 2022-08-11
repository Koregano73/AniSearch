import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Homepage() {
  const [responseData, setResponseData] = useState(null);
  const [searchtxt, setSearch] = useState('');

  // useEffect(() => {
  //   options.params = {q: 'Attack on Titan'};
  //   fetchData();
  // }, []);

  const options = {
    method: 'GET',
    url: 'https://jikan1.p.rapidapi.com/search/anime',
    params: {q: searchtxt },
    headers: {
      'X-RapidAPI-Key': 'd0d4ac40d7mshd88a38c634d2e5dp1b70d1jsnfa0cf4719701',
      'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
    }
  };
  
  const fetchData = axios.request(options).then(function (response) {
    console.log(response.data);
    setResponseData(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
  const list = [fetchData.results];
  console.log('this is list',list,'this is fetchData', fetchData,'this is responseData', responseData);
  const searchAPI = (event) => {
    e.preventDefault();
    console.log('this is the options', options.params);
    fetchData();
  }
  return (
    <div>
      <header>Please work please 3</header>
      <p>{list}</p>
      <form onSubmit={searchAPI}>
        <label>
          Anime/Manga/Manhwa:
          <input type="text" placeholder='Series' onChange={event => setSearch(event.target.value)}></input>
        </label>
        <input type="submit" value="Search"></input>
      </form>
    </div>
  )
}

