import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

/**
 * Search bar component
 * @param {function} search Function called when hitting the search button
 * @param {array} options Array of options in select field
 */
export default function Search({ search, options }) {
    const [query, setQuery] = useState('');
    const [option, setOption] = useState(options[0].name);
    const [dir, setDir] = useState('DESC');

    const debounce = useCallback(
        _.debounce((query, option, dir) => search({ query, option, dir }), 500),
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
                    search({ query, option, dir });
                }}
            >
                <input className="form-control" type="text" placeholder="Zoekterm" name="query" onChange={onChange} value={query} />
                <select className="form-control" name="option" onChange={ev => setOption(ev.target.value)}>
                    {options.map(option =>
                        option.search ? (
                            <option value={option.name} key={option.display}>
                                {option.display}
                            </option>
                        ) : null
                    )}
                </select>
                <select className="form-control" name="dir" onChange={ev => setDir(ev.target.value)}>
                    <option value="DESC">Hoog naar laag</option>
                    <option value="ASC">Laag naar hoog</option>
                </select>
                <button className="btn btn-primary" type="submit">
                    Zoeken
                </button>
            </form>
        </div>
    );
}
