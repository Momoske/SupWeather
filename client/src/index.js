import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import { DataLayer } from './Context/DataLayer';
import { initialState, reducer } from './Context/reducer';

import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);