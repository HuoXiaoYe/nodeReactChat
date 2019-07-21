import React from 'react';
import {Link,HashRouter, Route} from 'react-router-dom'
import Login from './component/login/login'

function App() {
  return (
    <HashRouter>
      <Route path="/" component={Login}></Route>

    </HashRouter>
  );
}

export default App;
