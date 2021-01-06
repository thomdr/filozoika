import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RouteComponent from './RouteComponent';
import Entry from './Entry';
import Create from './Create';
import Edit from './Edit';
import Table from './Table';

/**
 * SubIndex
 * Component that acts as a, well, index page for a specific subject
 * It controlls routing to 4 pages
 *
 * @param {alert} alert Function to display alert
 * @param {object} config Object containing config data
 * @param {array} blueprint Array containing information about inputs/table data to construct
 * @param {React} edit React to replace the edit page
 * @param {React} create React to replace the create page
 * @param {resolver} resolver Resolver validation schema
 */
export default function SubIndex({ alert, config, blueprint, resolver, create = null, edit = null }) {
    const deleteData = id =>
        axios
            .delete(config.api + '/' + id)
            .then(() => alert('Verwijderd', false))
            .catch(() => alert('Error tijdens het verwijderen', true));

    return (
        <RouteComponent name={config.display}>
            <h1>{config.display}</h1>
            <Switch>
                {/* Creating new data */}
                <Route path={config.url + '/nieuw'}>
                    {create ? create : <Create alert={alert} blueprint={blueprint} config={config} resolver={resolver} />}
                </Route>
                {/* Editing existing data */}
                <Route
                    path={config.url + '/bewerk/:id(\\d+)'}
                    render={({ match }) =>
                        edit ? edit : <Edit alert={alert} match={match} blueprint={blueprint} config={config} resolver={resolver} />
                    }
                />
                {/* Viewing single data */}
                <Route
                    path={config.url + '/:id(\\d+)'}
                    render={({ match }) => <Entry match={match} config={config} blueprint={blueprint} deleteFunction={deleteData} />}
                />
                {/* Viewing all data */}
                <Route path={config.url}>
                    <Table alert={alert} deleteFunction={deleteData} config={config} blueprint={blueprint} />
                </Route>
            </Switch>
        </RouteComponent>
    );
}
