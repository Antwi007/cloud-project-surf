import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import { Helmet } from "react-helmet";
import history from '../history';
import SearchResultsPage from '../pages/search-results-page';
import Index from '../components/Index';
import profile from './profile'
import SurfPageDetail from './surf-page-detail';
const App = () => {

  return (
      <Router history={history}>
         <Helmet>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:ital,wght@0,300;0,400;0,700;1,400&display=swap" />
          <link rel="icon" href="/favicon.png" />
          <link href='https://use.fontawesome.com/releases/v5.8.1/css/all.css' rel="stylesheet" />
        </Helmet>
          <Header />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/search-results-page" exact component={SearchResultsPage} />
            <Route path="/profile" exact component={profile} />
            <Route path="/surf-page-detail" exact component={SurfPageDetail}/>
          </Switch>
      </Router>
  );
};

export default App;
