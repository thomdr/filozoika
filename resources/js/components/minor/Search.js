import React, { useState, useCallback } from 'react';
import _ from 'lodash';

/**
 * Search
 * Component for searching through the Table component
 *
 * @param {function} search Function called when hitting the search button
 * @param {array} blueprint Array containing information about inputs to construct
 */
export default function Search({ search, blueprint }) {
    // useState for any checkboxes
    const booleans = {};
    blueprint.map(print => print.special === 'bool' && (booleans[print.name] = false));
    const [bools, setBools] = useState(booleans);
    const [query, setQuery] = useState('');
    const [dir, setDir] = useState('DESC');
    const [option, setOption] = useState(blueprint.find(print => print.search).name);

    const debounce = useCallback(
        _.debounce((query, option, dir) => search({ query, option, dir, bools }), 200),
        []
    );

    const onChange = ev => {
        setQuery(ev.target.value);
        debounce(ev.target.value, option, dir);
    };

    return (
        <div>
            <form
                className="form-inline search-form"
                onSubmit={ev => {
                    ev.preventDefault();
                    search({ query, option, dir, bools });
                }}
            >
                <div>
                    <input className="form-control" type="text" placeholder="Zoekterm" name="query" onChange={onChange} value={query} />
                    <select
                        className="form-control"
                        name="option"
                        onChange={ev => {
                            let option = ev.target.value;
                            setOption(option);
                            search({ query, option, dir, bools });
                        }}
                    >
                        {blueprint.map(print =>
                            print.search ? (
                                <option value={print.name} key={print.display + '1601287215163'}>
                                    {print.display}
                                </option>
                            ) : null
                        )}
                    </select>
                    <select
                        className="form-control"
                        name="dir"
                        onChange={ev => {
                            let dir = ev.target.value;
                            setDir(dir);
                            search({ query, option, dir, bools });
                        }}
                    >
                        <option value="DESC">Z-A, 9-0, Desc</option>
                        <option value="ASC">A-Z, 0-9, Asc</option>
                    </select>
                    <button className="btn btn-primary" type="submit">
                        Zoeken
                    </button>
                </div>
                <div>
                    {blueprint.map(print =>
                        print.special == 'bool' ? (
                            <div className="checkbox" key={print.name + '1601287200670'}>
                                <input
                                    id={print.name}
                                    type="checkbox"
                                    name={print.name}
                                    onChange={() => {
                                        let b = bools;
                                        b[print.name] = !b[print.name];
                                        setBools(b);
                                        search({ query, option, dir, bools });
                                    }}
                                />
                                <label htmlFor={print.name}>{print.display}</label>
                            </div>
                        ) : null
                    )}
                </div>
            </form>
        </div>
    );
}
