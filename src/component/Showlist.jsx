import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Showlist.css";

function Showlist() {



  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    axios.get("https://api.tvmaze.com/search/shows?q=all")
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleShowSelect = (show) => {
    setSelectedShow(show);
  };

  const handleShowDeselect = () => {
    setSelectedShow(null);
  };

  return (
    <div className="show-list">
      {!selectedShow ? (
        <ShowGrid shows={shows} onShowSelect={handleShowSelect} />
      ) : (
        <ShowDetails show={selectedShow} onShowDeselect={handleShowDeselect} />
      )}
    </div>
  );
}

function ShowGrid({ shows, onShowSelect }) {
  return (
    <>
      <h1>Show List</h1>
      <ul className="show-grid">
        {shows.map(show => (
          <li key={show.show.id} className="show-grid-item" onClick={() => onShowSelect(show)}>
            <div className="show">
              <div className="show-image">
                {show.show.image ? (
                  <img src={show.show.image.medium} alt={show.show.name} />
                ) : (
                  <div className="no-image">No image available</div>
                )}
              </div>
              <div className="show-details">
                <h2>{show.show.name}</h2>
                {show.show.genres && show.show.genres.length > 0 && (
                  <p><strong>Genres:</strong> {show.show.genres.join(", ")}</p>
                )}
                {show.show.rating && (
                  <p><strong>Rating:</strong> {show.show.rating.average}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function ShowDetails({ show, onShowDeselect }) {
  return (
    <>
      <h1>{show.show.name}</h1>
      <div className="show-details">
        <div className="show-image">
          {show.show.image ? (
            <img src={show.show.image.medium} alt={show.show.name} />
          ) : (
            <div className="no-image">No image available</div>
          )}
        </div>
        <div className="show-summary" dangerouslySetInnerHTML={{ __html: show.show.summary }} />
        <button onClick={onShowDeselect} >Back to list</button>
      </div>
    </>
  );
}

export default Showlist;


  
             