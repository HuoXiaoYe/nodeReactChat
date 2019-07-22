import React from 'react';
import {Switch,Link,HashRouter, Route} from 'react-router-dom'
import Login from './component/login/login'
import Regist from './component/login/regist'


function App() {
  return (
    <HashRouter>
      <Switch>
        {/* <Route path="/" to="/login"></Route> */}
        <Route path="/regist" component={Regist}></Route>
        <Route path="/login"  component={Login}></Route>
      </Switch>
      

    </HashRouter>
  );
}

export default App;
