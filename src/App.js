import React, { Component } from 'react';

//配置hashRouter 使用独立的router文件
import { createHashHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
//引入配置的routes
import Routes from './routes';

import './App.scss';

const history = createHashHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        {renderRoutes(Routes)}
      </Router>
    );
  }
}

export default App;