import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import style from './sass/style.scss';
import createStore from './stores/index.js';
import reducer from './reducers/index.js';
import App from './components/App.jsx';
import { Router, Route, createMemoryHistory } from 'react-router';
import Collections from './components/pages/Collections.jsx';
import Collection from './components/pages/Collection.jsx';

const history = createMemoryHistory('collections');

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="collection" component={Collection}/>
        <Route path="collections" component={Collections}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
