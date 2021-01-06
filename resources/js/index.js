import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import '../css/bootstrap-reboot.min.css';
import '../css/bootstrap-grid.min.css';
import '../css/bootstrap.min.css';
import '../css/style.css';
import RouteComponent from './components/minor/RouteComponent.js';
import Reserveringen from './components/Reserveringen';
import Gebruikers from './components/Gebruikers';
import Eigenaren from './components/Eigenaren';
import Groentes from './components/Groentes';
import Vandaag from './components/Vandaag';
import Soorten from './components/Soorten';
import Dieren from './components/Dieren';
import Hokken from './components/Hokken';

/**
 * Dismissable alert box
 * @param {bool} type Type of alert
 * @param {string} Children Text of alert
 * @param {function} closeAlert Close the alert box
 */
function Alert({ isError, children, closeAlert }) {
    return (
        <div className={'alert alert-dismissible alert-' + (isError ? 'danger' : 'success')}>
            <p>{children}</p>
            <button type="button" className="close" onClick={closeAlert}>
                <span>&times;</span>
            </button>
        </div>
    );
}

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
     * @param {string} message String containing the error message that will be displayed
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
            { name: 'Vandaag', path: '/', exact: true, Component: Vandaag },
            { name: 'Reserveringen', path: '/reserveringen', exact: false, Component: Reserveringen },
            { name: 'Dieren', path: '/dieren', exact: false, Component: Dieren },
            { name: 'Eigenaren', path: '/eigenaren', exact: false, Component: Eigenaren },
            { name: 'Hokken', path: '/hokken', exact: false, Component: Hokken },
            { name: 'Soorten', path: '/soorten', exact: false, Component: Soorten },
            { name: 'Groentes', path: '/groentes', exact: false, Component: Groentes },
            { name: 'Gebruikers', path: '/gebruikers', exact: false, Component: Gebruikers }
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
                            <li className="navbar-item">
                                <a href="/home">Dashboard</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                {alert.active && (
                    <Alert isError={alert.isError} closeAlert={() => this.setState({ alert: { active: false } })}>
                        {alert.message}
                    </Alert>
                )}
                <Switch>
                    {components.map(c => (
                        <Route key={c.name} path={c.path} exact={c.exact}>
                            {<c.Component alert={this.alert} />}
                        </Route>
                    ))}
                    <Route>
                        <RouteComponent name="Pagina niet gevonden">
                            <div className="container">
                                <h1>Error 404</h1>
                                <p>De pagina kon niet gevonden worden</p>
                            </div>
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
