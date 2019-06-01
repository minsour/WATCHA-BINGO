import * as React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'mobx-react';
import Main from './pages/main';
import Single from './pages/single';
import Multi from './pages/multi';
import { RootStore } from './stores';

const rootStore = new RootStore()

class App extends React.Component {
  render() {
    return (
      <Provider {...rootStore}>
        <Router>
          <div>
            <Switch>
                <Route exact={true} path='/' component={Main} />
                <Route path='/single' component={Single} />
                <Route path='/multi' component={Multi} />
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
