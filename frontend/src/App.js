//import React, {Component} from 'react';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { Search } from './Search'
//import { Test } from './Test'


function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SearchForm" component={Search} />
            {/* <Route exact path ="/Test" component={Test} /> */}
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
