import React from 'react';
import {Switch,Link,HashRouter, Route} from 'react-router-dom'
import Login from './component/login/login'
import Regist from './component/login/regist'
import HomeIndex from './component/home/honeIndex.js'


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/regist" component={Regist}></Route>
        <Route path="/login"  component={Login}></Route>
        <Route path="/home" component={HomeIndex}></Route>
      </Switch>
      

    </HashRouter>
  );
}

export default App;
