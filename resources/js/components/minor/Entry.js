import React from 'react';
import { Link } from 'react-router-dom';
import TableData from './TableData';

/**
 * Custom table to display data of single entry
 * @prop {match} match react-router-dom magic, used to get ID from url
 * @prop {object} config Object containing config data
 * @prop {array} blueprint Array containing information about inputs to construct
 * @prop {function} deleteFunction Delete function called when, y'know
 */
export default class SingleEntry extends React.Component {
    isMounted = false;

    state = {
        entry: null,
        error: null
    };

    componentDidMount() {
        this.isMounted = true;
        axios.get(this.props.config.api + '/' + this.props.match.params.id).then(response => {
            if (this.isMounted) {
                if (response.data == '') {
                    this.setState({ entry: null, error: <h2>Informatie kon niet gevonden worden</h2> });
                } else {
                    this.setState({ entry: response.data });
                }
            }
        });
    }

    componentWillUnmount = () => (this.isMounted = false);

    render() {
        const { entry, error } = this.state;
        const { blueprint, config, deleteFunction } = this.props;

        return (
            <div className="container">
                {error}
                <table className="display-table">
                    {entry && (
                        <tbody>
                            {blueprint.map(print => (
                                <tr key={print.display + '1601287296671'}>
                                    <th>{print.display}</th>
                                    {TableData(entry, print)}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                <form className="regular-form">
                    <Link to={config.url + '/bewerk/' + entry?.id} className="btn btn-outline-primary">
                        Bewerk
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger warning-trigger"
                        onClick={() => window.confirm('Weet je zeker dat je deze actie wil uitvoeren?') && deleteFunction(entry?.id)}
                    >
                        Verwijder
                    </button>
                </form>
            </div>
        );
    }
}
