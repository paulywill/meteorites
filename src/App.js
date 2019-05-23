import React, { Component } from 'react';
import axios from 'axios';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import Form from "./components/Form";

import './App.css';
const API_URL = 'https://data.nasa.gov/resource/gh4g-9sfh.json';
const API_LIMIT = 100;
const API_OFFSET = 100;
const itemRender = (current, type, element) => {
  if (type === 'page') {
    return <a href={`#${current}`}>{current}</a>;
  }
  return element;
};


class App extends Component {
  state = {
    meteorite: [],
    total_count : undefined,
    total_pages : undefined,
    name: undefined
  }

    
  getData = (url, key) => {
    axios.get(url)
      .then(response => response.data)
      .then((data) => {
        this.setState({
          [key]: data
        })
      })
  }

  onChangeSearch = async (e) => {
    e.preventDefault(); 
    const name = e.target.elements.name.value.toUpperCase();
    console.log('name: '+ name);
    const url = `${API_URL}?$limit=${API_LIMIT}&$where=upper(name)%20like%20%27%25${name}%25%27`;
    const record_count = `${API_URL}?$select=count(*)&$where=upper(name)%20like%20%27%25${name}%25%27`;
    this.getData(url, 'meteorite');
    this.getData(record_count, 'total_count');
    
  }


  onChangePage(current) {
    console.log('onChangePage:current=', current);
    let offset = undefined
    current === 1 ? offset = 0 : offset = API_OFFSET
    const url = `${API_URL}?$limit=${API_LIMIT}&$offset=${(current - 1) * offset}`;
    this.getData(url, 'meteorite');
  }


  componentDidMount() {
    const url = `${API_URL}?$limit=${API_LIMIT}`;
    const record_count = `${API_URL}?$select=count(*)`;
    this.getData(url, 'meteorite');
    this.getData(record_count, 'total_count');
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Meteorite Explorer</h1>

          <Form onChangeSearch={this.onChangeSearch} />
          <br />
               
          {this.state.total_count &&  
            <Pagination showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`} total={parseInt(this.state.total_count[0].count)} locale={localeInfo} itemRender={itemRender} pageSize={API_LIMIT} onChange={this.onChangePage.bind(this)} />
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
