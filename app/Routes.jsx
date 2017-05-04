import { render } from 'react-dom';
import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router'; // eslint-disable-line no-unused-vars
import App from './components/App.jsx';

window.appData = {};

const routes = (
  <Router history={hashHistory}>
    <Route path="/">
      <IndexRoute component={App} />
    </Route>
  </Router>
);
render(routes, document.getElementById('main'));
// ReactDOM.render(<App />, document.getElementById('main'));
