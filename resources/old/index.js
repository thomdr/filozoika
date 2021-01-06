import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import '../css/bootstrap-reboot.min.css';
import '../css/bootstrap-grid.min.css';
import '../css/bootstrap.min.css';
import '../css/style.css';
import Eigenaren from './components/eigenaar/Index';
import Dieren from './components/dieren/Index';
import Alert from './components/Alert';
import RouteComponent from './components/minor/RouteComponent.js';

class Content extends React.Component {
    state = {
        alert: {
            isError: null,
            message: null,
            active: false
        }
    };

    /**
     * Display an alert message that disappears after 3 seconds
     * @param {string} message String containing the error message
     * @param {bool} isError Wether the alert should be displayed as an error
     */
    alert = (message, isError) => {
        this.setState({ alert: { active: true, message, isError } });
        setTimeout(() => this.setState({ alert: { active: false } }), 3000);
    };

    /**
     * This is the index!
     */
    render() {
        const { alert } = this.state;
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
                {alert.active && (
                    <Alert isError={alert.isError} closeAlert={() => this.setState({ alert: { active: false } })}>
                        {alert.message}
                    </Alert>
                )}
                <Switch>
                    {/* 
						FIXME: Change this so it doesn't check for null in the future!
						that's the && part btw
					*/}
                    {components.map(c => (
                        <Route key={c.name} path={c.path} exact={c.exact}>
                            {c.Component && <c.Component alert={this.alert} />}
                            {/* {c.Component} */}
                        </Route>
                    ))}
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
    document.getElementById('container')
);
