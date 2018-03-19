import React from 'react';
import { render } from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer } from 'react-router-redux';

import reducers from './reducers';

import App from './App/App';

const history = createHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

const mountApp = document.getElementById('root');

render (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    mountApp
)
