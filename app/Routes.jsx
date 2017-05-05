import { render } from 'react-dom';
// import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router'; // eslint-disable-line no-unused-vars
import App from './components/App.jsx'; // eslint-disable-line no-unused-vars

// window.appData = {};
//
// const routes = (
//   <Router history={hashHistory}>
//     <Route path="/">
//       <IndexRoute component={App} />
//     </Route>
//   </Router>
// );
// render(routes, document.getElementById('main'));
render(<App />, document.getElementById('main'));
