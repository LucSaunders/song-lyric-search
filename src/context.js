import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Context = React.createContext();

export function ContextController({ children }) {
  let intialState = {
    track_list: [],
    heading: ''
  };

  const [state, setState] = useState(intialState);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(response => {
        setState({
          track_list: response.data.message.body.track_list,
          heading: 'Top 10 Tracks'
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}
