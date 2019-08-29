//import React, {Component} from 'react';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar/NavigationBar';
import { Search } from './Search'
import { Test } from './Test'


function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SearchForm" component={Search} />
            <Route exact path ="/Test" component={Test} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>

    //
    //    <div className="App">
    //      <header className="App-header">
    //        <img src={logo} className="App-logo" alt="logo" />
    //        <p>
    //          Edit <code>src/App.js</code> and save to reload.
    //        </p>
    //        <a
    //          className="App-link"
    //          href="https://reactjs.org"
    //          target="_blank"
    //          rel="noopener noreferrer"
    //        >
    //          Learn React
    //        </a>
    //      </header>
    //    </div>
  );
}

export default App;
