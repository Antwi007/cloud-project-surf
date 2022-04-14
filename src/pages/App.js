import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import history from '../history';
import SearchResultsPage from '../pages/search-results-page';
import Index from '../components/Index';
import "../scss/style.default.scss";

const App = () => {

  return (
      <Router history={history}>
         <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/search-results-page" exact component={SearchResultsPage} />
          </Switch>
          </div>
      </Router>
  );
};

export default App;
