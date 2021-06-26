import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/configureStore';

import './index.css';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
// registerServiceWorker();