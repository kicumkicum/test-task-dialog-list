import React from 'react';
import { Provider } from 'react-redux';

import Main from './components/main';
import configureStore from './redux/create-store';

import './App.css';

const store = configureStore();
store.subscribe(() => console.log('subscribe', store.getState()));

const App = () => {
    return (
      <Provider
        store={store}
      >
        <Main/>
      </Provider>
    );
}

export default App;
