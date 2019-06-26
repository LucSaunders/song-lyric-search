import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h3>
        <code>Lyrica</code>
      </h3>
    </div>
  );
}

export default App;
