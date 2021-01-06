import React from 'react';
import { Link } from 'react-router-dom';
import TableData from './TableData';

export default class SingleEntry extends React.Component {
    state = {
        entry: null,
        error: null
    };

    componentDidMount() {
        axios.get(this.props.url + this.props.match.params.id).then(response => {
            if (response.data == '') this.setState({ entry: null, error: <h2>Informatie kon niet gevonden worden</h2> });
            else this.setState({ entry: response.data });
        });
    }

    /**
     * Table to display data of a single database entry
     */
    render() {
        const { entry, error } = this.state;
        const { blueprint, backUrl, editUrl, deleteFunction } = this.props;
        return (
            <div className="container">
                <Link to={backUrl} className="btn btn-outline-primary go-back">
                    Terug naar overzicht
                </Link>
                {error}
                <table className="display-table">
                    {entry && (
                        <tbody>
                            {blueprint.map((print, i) => (
                                <tr key={print.display + i}>
                                    <th>{print.display}</th>
                                    {TableData(entry, print)}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                <form className="regular-form">
                    <Link to={editUrl + entry?.id} className="btn btn-outline-primary">
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
