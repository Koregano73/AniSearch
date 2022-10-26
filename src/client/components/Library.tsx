import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataEntry } from './../types';

export default function Library() {
  // page state to set max number of entries on page
  const [page, setPage] = useState< number >(0);
  // local API server state to get user's data
  const [responseData, setResponseData] = useState< DataEntry[] | [] >([]);
  // life cycle method to populate page with user library entries
  useEffect(() => {
    // get method to get user's library data and update state
    async function getData() {
      return fetch('/library', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {return res.json();})
      .then((data: DataEntry[]) => {
        return setResponseData(data);
      })
      .catch(err => console.log(err));
    }
    getData()
      .catch(console.error);
  }, []);

  // remove an entry from the library when the press the button remove
  const removeLibrary = async (event:React.FormEvent<EventTarget>) => {
    const target = event.currentTarget as typeof event.currentTarget & {
      id: string,
    }
    const find = responseData.filter((obj: DataEntry) => {
      return obj.title === target.id;
    })
    const resultObj:DataEntry = find[0];
    try {
      const library = await fetch('/library', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultObj),
      })
      if (library.ok) {
        const newLib:DataEntry[] = await library.json() as DataEntry[];
        return setResponseData(newLib);
      }
    }
    catch (err) {
      console.log( err );
    }
  }

  return (
    <div className='outerBox'>
      <Link to="/homepage">
        <div className='button' style={{float:"right"}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </div>
      </Link>
      <header><strong>Library</strong></header>
      {/* <form >
        <label>
          Title:
          <input type="text" placeholder='Series' onChange={event => setSearch(event.target.value)}></input>
        </label>
        <input className='button' type="submit" value="Search"></input>
      </form> */}
      <div className='buttons'>
        <form>
          <div className='button' onClick={() => page > 0 ?setPage(page - 1):setPage(page)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
          </div>
        </form>
        <form>
          <div className='button' onClick={() => page < Math.floor(responseData.length / 10) ? setPage(page + 1):setPage(page)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
          </div>
        </form>
      </div>
      <div>
        {responseData.map((result:DataEntry) => (
          <div className='marketBox'> 
            <div className='button' onClick={void (async (event:React.FormEvent<EventTarget>) => await removeLibrary(event))} id={result.title} style={{float:"left"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
              </svg>
            </div>
            <img className='imageboxes' src = {result.images.jpg.large_image_url}></img>
            <p><strong>{result.title}</strong></p>
            <a href={result.url} target="_blank" rel="noopener noreferrer">Link</a>
            <p className='bodyText'>{result.synopsis}</p>
          </div>
        ))}
      </div>
    </div>
  )
}