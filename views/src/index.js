import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './store/reducers/rootReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { PersistGate } from 'redux-persist/integration/react'

import App from './App';
import './css/index.css';
import * as serviceWorker from './serviceWorker';



const persistConfig = {
  key: 'root',
  storage
}

const persistedReucer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReucer, applyMiddleware(thunk))
let persistor = persistStore(store)
ReactDOM.render(<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <App />
  </PersistGate>
  </Provider>, document.getElementById('root'));

// sem redux-persist:
// const store = createStore(rootReducer)
// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

console.log('store state');
console.log(store.getState())

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
