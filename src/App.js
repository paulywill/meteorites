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
    name: undefined,
    current: 1,
    error_status: "",
  }

    
  getData = (url, key) => {
    axios.get(url)
      .then(response => response.data)
      .then((data) => {
        this.setState({
          [key]: data
        })
        this.setState({ error_status: ""});
      })
      
      .catch((error) => {
        this.setState({ error_status: error.response.status });
        this.setState({ meteorite: []});
        this.setState({ total_count: undefined });
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log("error.response.status: " + error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request: " + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log("error.config: " + error.config);
      });
  }

  onChangeSearch = async (e) => {
    e.preventDefault(); 
    const name = e.target.elements.name.value.toUpperCase();
    this.setState({ 
      name: name,
      current: 1
    })
    console.log('name: '+ name);
    const url = `${API_URL}?$limit=${API_LIMIT}&$where=upper(name)%20like%20%27%25${name}%25%27`;
    const record_count = `${API_URL}?$select=count(*)&$where=upper(name)%20like%20%27%25${name}%25%27`;
    this.getData(url, 'meteorite');
    this.getData(record_count, 'total_count');
    
  }


  onChangePage(current) {
    console.log('onChangePage:current=', current);
    let offset = undefined
    this.setState({current: current});
    current === 1 ? offset = 0 : offset = API_OFFSET
    const url = (this.state.name ? 
      `${API_URL}?$limit=${API_LIMIT}&$where=upper(name)%20like%20%27%25${this.state.name}%25%27&$offset=${(current - 1) * offset}` :
      `${API_URL}?$limit=${API_LIMIT}&$offset=${(current - 1) * offset}`
    );
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
             
          {this.state.error_status && 
          <img src={'https://httpstatusdogs.com/img/' + this.state.error_status + '.jpg'} alt={'http status dogs'} /> 
          }

          {this.state.total_count &&  
            <Pagination showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`} current={this.state.current} total={parseInt(this.state.total_count[0].count)} locale={localeInfo} itemRender={itemRender} pageSize={API_LIMIT} onChange={this.onChangePage.bind(this)} showLessItems />
          } 
          
          {this.state.total_count &&  
          <table className="meteorites" >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Id</th>
                <th scope="col">NameType</th>
                <th scope="col">Rec Class</th>
                <th scope="col">Mass (g)</th>
                <th scope="col">Fall</th>
                <th scope="col">Year</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
              </tr>
            </thead>
            <tbody> 
            {this.state.meteorite.map(function (item, key) {
              return (
                
                <tr key={key}>
                  <td data-label="Name">{item.name}</td>
                  <td data-label="Id" align="right">{item.id}</td>
                  <td data-label="Name Type">{item.nametype}</td>
                  <td data-label="Rec Class">{item.recclass}</td>
                  <td data-label="Mass(g)" align="right">{item.mass}</td>
                  <td data-label="Fall">{item.fall}</td>
                  <td data-label="Year">{item.year ? item.year.substring(0, 4) : ""}</td>
                  <td data-label="Lat." align="right">{item.reclat}</td>
                  <td data-label="Long." align="right">{item.reclong}</td>
                </tr>
              )

            })}</tbody>
          </table>
          }
          

        </header>
      </div >
    );
  }
}
export default App;
