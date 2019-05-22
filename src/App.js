import React, { Component } from 'react';
import axios from 'axios';
import Pagey from './components/Pagey';
import './App.css';
const API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json';
const API_LIMIT = '100';
const API_OFFSET = '100';

class App extends Component {
  state = {
    meteorite: [],
    total_count : undefined,
    total_pages : undefined,
  }
  componentDidMount() {
    const url = `${API_URL}?$limit=${API_LIMIT}`;
    const record_count = `${API_URL}?$select=count(*)`;
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ meteorite: data })
        console.log(this.state.meteorite)
      })
    axios.get(record_count).then(response => response.data)
      .then((data) => {
        this.setState({ total_count: data }) 
        console.log(this.state.total_count)
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
          <br />
          
          {this.state.total_count && <h3>Total record count: {this.state.total_count[0].count}</h3>}
          
          {this.state.total_count &&  
 
            <Pagey 
            total={parseInt(this.state.total_count[0].count)}/>
          
          } 
          <table>
            <tbody>  
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>NameType</th>
              <th>Rec Class</th>
              <th>Mass (g)</th>
              <th>Fall</th>
              <th>Year</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
            {this.state.meteorite.map(function (item, key) {
              return (
                
                <tr key={key}>
                  <td>{item.name}</td>
                  <td align="right">{item.id}</td>
                  <td>{item.nametype}</td>
                  <td>{item.recclass}</td>
                  <td align="right">{item.mass}</td>
                  <td>{item.fall}</td>
                  <td>{item.year ? item.year.substring(0, 4) : ""}</td>
                  <td align="right">{item.reclat}</td>
                  <td align="right">{item.reclong}</td>
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
