import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    count: 0,
    content: 'World!',
    pictures: null,
    urls: null,
    selectedFile: null
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
      }).catch((err) => {
        console.log('Failed to set name');
        console.log(err);
      })
  };

  //
  // onDrop = (pictures, urls) => {
  //   this.setState({
  //     pictures,
  //     urls
  //   });
  // };

  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  uploadPictures = () => {
    // if (this.state.pictures.length === 0) {
    //   return;
    // }
    //
    // const formData = new FormData();
    // for (let i = 0; i < this.state.pictures.length; ++i) {
    //   formData.append(`${i}`, this.state.pictures[i], this.state.urls[i]);
    // }
    //
    // axios.post(
    //   'https://itsl1t-rest.herokuapp.com/upload/images',
    //   formData, {
    //     headers: {
    //       'Access-Control-Allow-Origin': 'POST'
    //     }
    //   })
    //   .then(result => {
    //   console.log(`upload success, result: ${result}`);
    // })
    //   .catch((err) => {
    //   console.log(`Failed to upload`);
    //   console.log(err);
    // });

    if (!this.state.selectedFile) {
      return;
    }

    axios.post(
      'https://itsl1t-rest.herokuapp.com/upload/images',
      this.state.selectedFile, {
        headers: {
          'Access-Control-Allow-Origin': 'POST'
        }
      })
      .then(result => {
      console.log(`upload success, result: ${result}`);
    })
      .catch((err) => {
      console.log(`Failed to upload`);
      console.log(err);
    });
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
        {/*<div style={{ width: '33%', height: '300px', display: 'inline-block' }}>*/}
          {/*<ImageUploader*/}
            {/*withIcon={true}*/}
            {/*withPreview={true}*/}
            {/*buttonText='Choose image'*/}
            {/*onChange={this.onDrop}*/}
            {/*imgExtension={['.jpg', '.png']}*/}
            {/*maxFileSize={5242880}*/}
          {/*/>*/}
        {/*</div>*/}
        <input type="file" onChange={this.fileChangedHandler} />
        <input type="button" value="Upload Pictures" onClick={this.uploadPictures} />
      </div>
    );
  }
}

export default App;
