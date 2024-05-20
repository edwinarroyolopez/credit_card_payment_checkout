import React from 'react';
import './App.css';
import Greeting from './components/Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Greeting />
      </header>
      <p>Aprende React</p>
    </div>
  );
}

export default App;