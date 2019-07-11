import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context';

const Search = () => {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState('');
  const [trackTitle, setTrackTitle] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(response => {
        let track_list = response.data.message.body.track_list;
        setState({ track_list: track_list, heading: 'Search Results' });
      })
      .catch(error => console.log(error));
  }, [setState, trackTitle]);

  const findTrack = e => {
    e.preventDefault();
    setTrackTitle(userInput);
  };

  const onChange = e => {
    setUserInput(e.target.value);
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h3 className="display-4 text-center">Search for a Song</h3>
      <p className="lead text-center">Get the lyrics to almost any song</p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter song title..."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
          Find Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;
