import React, { Component } from 'react';

//配置hashRouter 使用独立的router文件
import { createHashHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
//引入媒体查询  判断是手机点开的还是 电脑点开的
import MediaQuery from 'react-responsive';
//引入配置的routes
import {Routes,MobileRoutes} from './routes';

const history = createHashHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* 手机端 */}
        <MediaQuery query='(max-device-width:1224px)'>
          <Router history={history}>
              {renderRoutes(MobileRoutes)}
          </Router>
        </MediaQuery>
      {/* 电脑端，只有一个错误提示 */}
        <MediaQuery query='(min-device-width:1224px)'>
          <Router history={history}>
            {renderRoutes(Routes)}
          </Router>
        </MediaQuery>
      </div>
    );
  }
}

export default App;