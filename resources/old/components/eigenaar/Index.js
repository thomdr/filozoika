import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import RouteComponent from '../minor/RouteComponent';
import Entry from '../minor/Entry';
import Create from './Create';
import Edit from './Edit';
import Table from './Table';

/**
 * Final component for Owners
 * @param {alert} alert Function to display alert
 */
export default function Eigenaren({ alert }) {
    const { path, url } = useRouteMatch();
    const rows = [
        { display: 'ID', name: 'id', special: false },
        { display: 'Naam', name: 'name', special: false },
        { display: 'Email', name: 'email', special: false },
        { display: 'Telefoon 1', name: 'phone_1', special: false },
        { display: 'Telefoon 2', name: 'phone_2', special: false },
        { display: 'Telefoon 3', name: 'phone_3', special: false },
        { display: 'Informatie', name: 'information', special: false }
    ];

    const deleteOwner = id => {
        axios
            .delete('/api/eigenaren/' + id)
            .then(() => alert('Eigenaar verwijderd', false))
            .catch(() => alert('Error tijdens het verwijderen van een eigenaar', true));
    };

    return (
        <RouteComponent name="Eigenaren">
            <h1>Eigenaren</h1>
            <Switch>
                <Route path={`${path}/nieuw`}>
                    <Create alert={alert} />
                </Route>
                <Route path={`${path}/bewerk/:id(\\d+)`} render={({ match }) => <Edit alert={alert} match={match} />}></Route>
                <Route
                    path={`${path}/:id(\\d+)`}
                    render={({ match }) => (
                        <Entry
                            alert={alert}
                            match={match}
                            backUrl={url}
                            editUrl={'/eigenaren/bewerk/'}
                            url="/api/eigenaren/"
                            rows={rows}
                            deleteFunction={deleteOwner}
                        />
                    )}
                />
                <Route path={path}>
                    <Table alert={alert} deleteFunction={deleteOwner} />
                </Route>
            </Switch>
        </RouteComponent>
    );
}
