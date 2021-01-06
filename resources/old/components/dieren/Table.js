import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import Tool from '../Tool';
import Row from '../minor/Row';
import blueprint from './blueprint.json';

export default class Table extends React.Component {
    state = {
        dieren: null,
        search: {
            query: '',
            option: 'id',
            dir: 'DESC'
        }
    };

    componentDidMount = () => this.getData();

    getData = () => axios.get('/api/dieren').then(response => this.setState({ dieren: response.data }));

    setSearchState = search => this.setState({ search });

    render() {
        let { search, dieren } = this.state;
        let { deleteFunction } = this.props;
        if (dieren) {
            var temp = Tool.sort(dieren, search.query, search.option, search.dir);
        }
        return (
            <>
                <div className="container">
                    <Link to="/dieren/nieuw" className="btn btn-primary">
                        Nieuw
                    </Link>
                    {/* 
						FIXME:
						CHECKBOX voor inactieve dieren
						HOEEEEYEEEEEEEEEE!!!!!!!!!!!!!
					*/}
                    <Search search={this.setSearchState} options={blueprint} />
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
                                    editUrl={'/dieren/bewerk/' + e.id}
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
