import React, { Component } from 'react';

class Dashboard extends Component {

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




                    <p>https://data.nasa.gov/resource/gh4g-9sfh.json</p>
                </header>
            </div>
        );
    }
    
}

export default Dashboard;