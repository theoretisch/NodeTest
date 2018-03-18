import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';

require('./index.scss');

const apiUrl = 'http://127.0.0.1:3001';

ReactDOM.render(<App apiUrl={apiUrl}/>, document.getElementById('root'));
