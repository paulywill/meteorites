import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
const API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json';

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

          <table>
            <tbody>{this.state.meteorite.map(function (item, key) {
              return (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>{item.nametype}</td>
                  <td>{item.recclass}</td>
                  <td>{item.mass}</td>
                  <td>{item.fall}</td>
                  <td>{item.year}</td>
                  <td>{item.reclat}</td>
                  <td>{item.reclong}</td>
                </tr>
              )

            })}</tbody>
          </table>

        </header>
      </div >
    );
  }
}
export default App;
