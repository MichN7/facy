import {Switch, Route} from 'react-router-dom'

import React, { Component } from 'react';
import LoginMenu from '../componentes/LoginMenu.js';
import Charts from '../componentes/Charts.js';

const MainRouter = () => (
  <Switch>
        <Route exact path="/" component={LoginMenu}/>
        <Route path="/charts" component={Charts}/>
  </Switch>
)

export default MainRouter;