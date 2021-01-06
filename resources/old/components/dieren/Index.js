import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import RouteComponent from '../minor/RouteComponent';
import Entry from '../minor/Entry';
import Create from './Create';
import Edit from './Edit';
import Table from './Table';
import blueprint from './blueprint.json';

/**
 * Final component for Animals
 * @param {alert} alert Function to display alert
 */
export default function Dieren({ alert }) {
    const { path, url } = useRouteMatch();

    const deleteAnimal = id => {
        axios
            .delete('/api/dieren/' + id)
            .then(() => alert('Dier verwijderd', false))
            .catch(() => alert('Error tijdens het verwijderen van een dier', true));
    };

    return (
        <RouteComponent name="Dieren">
            <h1>Dieren</h1>
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
                            editUrl={'/dieren/bewerk/'}
                            url="/api/dieren/"
                            blueprint={blueprint}
                            deleteFunction={deleteAnimal}
                        />
                    )}
                />
                <Route path={path}>
                    <Table alert={alert} deleteFunction={deleteAnimal} />
                </Route>
            </Switch>
        </RouteComponent>
    );
}
