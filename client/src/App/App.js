import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './App.css';

import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

import { Route } from 'react-router'

import Header from './components/Header/Header';
import Kanban from '../Kanban/Kanban';
import Footer from './components/Footer/Footer';

const App = () => {
    return (
        <div>
            <Helmet
                title="Kanban"
                meta={[
                    { charset: 'utf-8' },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1',
                    }
                ]}
            />
            <Header />
            <Route path="/" component={Kanban} />
            <Footer />
        </div>
    )
}

export default App;