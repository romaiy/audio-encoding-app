import React from 'react';
import './App.css';
import Control from './components/Control';
import './css/style.css';

function App() {
  return (
    <div className="wrapper">
      <div className='App'>
        <div className='App__content container'>
        <Control/>
        <Control/>
        </div>
      </div>
    </div>
  );
}

export default App;
