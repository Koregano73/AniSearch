import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Homepage() {
  const [responseData, setResponseData] = useState(null);
  const [searchtxt, setSearch] = useState('');
  const [genretxt, setGenre] = useState('');
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
      // console.log('this is response.data', response.data, 'this is response data results', response.data.results);
      setResponseData(response.data.results);
      // alert('check check', response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const searchAPI = (event) => {
    event.preventDefault();
    getData(searchtxt.toLocaleLowerCase, genretxt.toLocaleLowerCase);
  }
  
  // console.log('this is responseData keys', responseData);
  if (!responseData) return <div>No Record Found</div>;
  return (
    <div>
      <header>Please work please 3</header>
      {/* <p>{responseData}</p> */}
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
      <div>
        {responseData.map((result) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <img src = {result.image_url}></img>
            <p>{result.title}</p>
            <a href={result.url}>Link</a>
            <p>{result.synopsis}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

