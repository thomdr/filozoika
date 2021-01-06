import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Search from './Search';
import TableData from './TableData';

/**
 * Table
 * Component that displays all data of a subject, and allows the user to create, edit, delete or view them
 *
 * @param {function} alert Alert function
 * @prop {object} config Object containing config data
 * @prop {array} blueprint Array containing information about inputs/table data to construct
 * @prop {function} deleteFunction Delete function called when, y'know
 */
export default class Table extends React.Component {
    isMounted = false;

    state = {
        data: null,
        search: {
            query: '',
            option: 'id',
            dir: 'DESC',
            bools: {}
        }
    };

    componentDidMount = () => {
        this.isMounted = true;
        this.getData();
    };

    getData = () => axios.get(this.props.config.api).then(({ data }) => this.isMounted && this.setState({ data }));

    setSearchState = search => this.setState({ search });

    componentWillUnmount = () => (this.isMounted = false);

    /**
     * Function to sort the data based on search query
     * Results have to match the search 'query' in the 'option' column, are sorted by 'direction'
     * and also needs to match any search boxes specified by 'bools'
     *
     * @param {array} arrayToSort Array to sort
     * @param {string} query Search query
     * @param {string} option Search option
     * @param {string} direction Search direction
     * @param {object} bools Object containing boolean properties
     * @return {array} Array with sorted values
     */
    sort(array, query, option, direction, bools) {
        // Temporary array to be sorted, which filters out results not in the search input field
        var temp = array.filter(e => (_.isInteger(e[option]) || e[option]?.toLowerCase().includes(query.toLowerCase()) ? true : false));
        // Sort out if any option is selected
        if (!_.isEmpty(bools)) {
            for (let i = 0; i < temp.length; i++) {
                for (const key in bools) {
                    if (bools.hasOwnProperty(key) && bools[key]) {
                        var temp = temp.filter(e => e[key]);
                    }
                }
            }
        }
        // Sort array based on search option
        temp.sort((a, b) => {
            // Check if number is an integer
            if (_.isInteger(a[option])) {
                // Sorting for numbers
                return direction === 'ASC' ? Math.sign(a[option] - b[option]) : Math.sign(b[option] - a[option]);
            } else {
                // Sorting for strings
                const al = a[option].toLowerCase();
                const bl = b[option].toLowerCase();
                if (direction === 'ASC') return al > bl ? 1 : bl > al ? -1 : 0;
                else return bl > al ? 1 : al > bl ? -1 : 0;
            }
        });
        return temp;
    }

    render() {
        let { search, data } = this.state;
        let { deleteFunction, config, blueprint } = this.props;
        if (data) var temp = this.sort(data, search.query, search.option, search.dir, search.bools);
        return (
            <>
                <div className="container">
                    <Link to={config.url + '/nieuw'} className="btn btn-primary">
                        Nieuw
                    </Link>
                    <Search search={this.setSearchState} blueprint={blueprint} />
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th></th>
                            {blueprint.map(print => (print.important ? <th key={'1601287193331' + print.name}>{print.display}</th> : null))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.isArray(temp) &&
                            temp.map(entry => {
                                // Skip entries with id 0 (unique entries that should not be shown)
                                if (entry.id == 0) return null;
                                return (
                                    <tr key={entry.id + '1601287169531'}>
                                        <td>
                                            <Link to={config.url + '/' + entry.id}>
                                                <button className="btn btn-outline-info">Bekijk</button>
                                            </Link>
                                        </td>
                                        {blueprint.map(print => {
                                            if (print.important)
                                                return (
                                                    <React.Fragment key={'1601287187475' + print.name}>
                                                        {TableData(entry, print)}
                                                    </React.Fragment>
                                                );
                                        })}
                                        <td className="buttons">
                                            <Link to={config.url + '/bewerk/' + entry.id} className="btn btn-outline-primary">
                                                Bewerk
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger warning-trigger"
                                                onClick={() =>
                                                    window.confirm('Weet je zeker dat je deze actie wil uitvoeren?') &&
                                                    (deleteFunction(entry?.id) || this.getData())
                                                }
                                            >
                                                Verwijder
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </>
        );
    }
}
