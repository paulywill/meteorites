import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
const API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=500000';

class App extends Component {
  state = {
    meteorite: []
  }
  componentDidMount() {
    const url = `${API_URL}`;
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ meteorite: data })
        console.log(this.state.meteorite)
      })
  }
  
  
  
  
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Meteorite Explorer</h1>

          <form>
            <label>
              Search: <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>

        </header>
      </div >
    );
  }
}
export default App;
