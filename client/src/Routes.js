import React, { useState } from 'react';
import { BrowserRouter as Switch, Route, Router } from 'react-router-dom';
 
/**
 * Import all page components here
 */
import Main from './Main';
import Rref from './Rref';
import Notes from './Notes';
import Matrix from './Matrix';
 
const Routes = () => {
  console.log('started');
 
  return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/'>
          <Main />
      </Route>

      <Route exact path='/rref'>
          <Rref />
      </Route>

      <Route exact path='/matrix'>
          <Matrix />
      </Route>

      <Route exact path='/notes'>
        <Notes />
      </Route>
      
    </Switch>
  );
}
 
export default Routes;