import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { BrowserRouter } from 'react-router-dom'

const Material = () => (
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  );


const WithRouter = () => (
    <BrowserRouter>
      <Material />
    </BrowserRouter>
  );

ReactDOM.render(<WithRouter />, document.getElementById('root'));
registerServiceWorker();
