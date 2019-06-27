import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(response => {
        let lyrics = response.data.message.body.lyrics;
        setLyrics({ lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(response => {
        let track = response.data.message.body.track;
        setTrack({ track });
      })
      .catch(error => console.log(error));
  }, [props.match.params.id]);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    // return <Spinner />;
    return <h4>Loading...</h4>;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-primary btn-sm mb-4">
          Back
        </Link>
        <div className="card">
          <h4 className="card-header" style={{ color: '#66afde' }}>
            {track.track.track_name}{' '}
            <span style={{ color: 'white' }}>
              {' '}
              by {track.track.artist_name}
            </span>
          </h4>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{' '}
            {track.track.primary_genres.music_genre_list.length === 0
              ? 'NO GENRE AVAILABLE'
              : track.track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{' '}
            {track.track.explicit === 0 ? 'No' : 'Yes'}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{' '}
            <Moment format="MM/DD/YYYY">
              {track.track.first_release_date}
            </Moment>
          </li>
        </ul>
      </>
    );
  }
};

export default Lyrics;
