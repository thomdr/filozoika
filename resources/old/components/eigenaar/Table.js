import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import Tool from '../Tool';
import Row from '../minor/Row';
import blueprint from './blueprint.json';

export default class Table extends React.Component {
    state = {
        eigenaren: null,
        search: {
            query: '',
            option: 'id',
            dir: 'DESC'
        }
    };

    componentDidMount = () => this.getData();

    getData = () => axios.get('/api/eigenaren').then(response => this.setState({ eigenaren: response.data }));

    setSearchState = search => this.setState({ search });

    render() {
        let { search, eigenaren } = this.state;
        let { deleteFunction } = this.props;
        if (eigenaren) {
            var temp = Tool.sort(eigenaren, search.query, search.option, search.dir);
        }
        return (
            <>
                <div className="container">
                    <Link to="/eigenaren/nieuw" className="btn btn-primary">
                        Nieuw
                    </Link>
                    <Search
                        search={this.setSearchState}
                        options={[
                            { display: 'Naam', name: 'name' },
                            { display: 'ID', name: 'id' }
                        ]}
                    />
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th></th>
                            {blueprint.map(print => (print.important ? <th key={print.name}>{print.display}</th> : null))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {temp &&
                            temp.map(e => (
                                <Row
                                    key={e.id}
                                    entry={e}
                                    editUrl={'/eigenaren/bewerk/' + e.id}
                                    deleteFunction={id => {
                                        Promise.resolve(deleteFunction(id)).then(() => this.getData());
                                    }}
                                    blueprint={blueprint}
                                />
                            ))}
                    </tbody>
                </table>
            </>
        );
    }
}
