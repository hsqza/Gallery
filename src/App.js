import React, { Component } from 'react';
import Gallery from './containers/Gallery';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Gallery />
      </div>
    );
  }
}

export default App;
