import React, { Fragment } from 'react';
import './App.css';

//components
import InputPlaces from './components/InputPlaces';
import ListPlaces from './components/ListPlaces';

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputPlaces/>
        <ListPlaces/>
      </div>
    </Fragment>
  );
}

export default App;
