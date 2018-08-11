import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    count: 0,
    content: 'World!',
  };

  setName = (event) => {
    console.log(event);
    axios.get(`https://itsl1t-rest.herokuapp.com/greeting?name=${event.target.value}`)
      .then(result => {
        console.log('result is: ', result);
        this.setState({
          count: result.data.id,
          content: result.data.content
        });
      })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type='text' value={this.state.content} onChange={this.setName} />
        <p>{this.state.content}:{this.state.count}</p>
      </div>
    );
  }
}

export default App;
