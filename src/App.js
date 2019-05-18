import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meteorite Explorer</h1>

        <form>
          <label>
            Search:
          <input type="text" name="searchTerm" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p>https://data.nasa.gov/resource/gh4g-9sfh.json</p>
      </header>
    </div>
  );
}

export default App;
