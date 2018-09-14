import React, { Component } from 'react';
import logo from './media/ryerson_logo.png';

class App extends Component {
  render() {
    return (
      <div>
        <div id="compatibility">
            <p><strong>Your browser version is not supported by Ryerson University.</strong></p>
            <p>Please update or adjust Compatibility View settings for an optimal experience.</p>
        </div>
        <div id="container" class="container">
          <header>
            <div id="logo">
              <img src={logo} width="227" height="110" alt="Ryerson University"/>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
