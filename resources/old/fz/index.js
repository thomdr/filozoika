import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './css/style.css';
import Eigenaren from './components/Eigenaar';
import Dieren from './components/Dier';
// import { Status } from './components/Status';
import Alert from './components/Alert';
import { RouteComponent } from './components/MinorComponents.js';

//+ The main content of the page
class Content extends React.Component {
  state = {
    alertActive: false,
    alertMessage: null,
    alertType: null
  };

  alert = data => {
    this.setState({ alertActive: true, alertMessage: data.message, alertType: data.error });
    setTimeout(() => this.setState({ alertActive: false }), 3000);
  };

  render() {
    const { alertActive, alertMessage, alertType } = this.state;
    const components = [
      { name: 'Vandaag', path: '/', exact: true, Component: null },
      { name: 'Status', path: '/status', exact: false, Component: null },
      { name: 'Verblijf', path: '/verblijf', exact: false, Component: null },
      { name: 'Dieren', path: '/dieren', exact: false, Component: Dieren },
      { name: 'Eigenaren', path: '/eigenaren', exact: false, Component: Eigenaren },
      { name: 'Zoeken', path: '/zoeken', exact: false, Component: null }
    ];
    return (
      <>
        <div className="nav-wrapper">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-around" id="navbarNav">
            <ul className="navbar-nav">
              {components.map(comp => (
                <li className="navbar-item" key={comp.name}>
                  <NavLink activeClassName="active" to={comp.path} exact={comp.exact}>
                    {comp.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {alertActive && (
          <Alert type={alertType} closeAlert={() => this.setState({ alertActive: false })}>
            {alertMessage}
          </Alert>
        )}
        <Switch>
          {/* 
          FIXME: Change this so it doesn't check for null in the future!
          that's the && part btw
        */}
          {components.map(comp => {
            const { name, path, exact, Component } = comp;
            return (
              <Route key={name} path={path} exact={exact}>
                {Component && <Component alert={this.alert} />}
              </Route>
            );
          })}
          <Route>
            <RouteComponent name="Pagina niet gevonden">
              <h1>Error 404</h1>
              <p>De pagina kon niet gevonden worden</p>
            </RouteComponent>
          </Route>
        </Switch>
      </>
    );
  }
}
ReactDOM.render(
  <Router>
    <Content />
  </Router>,
  document.getElementById('root')
);
