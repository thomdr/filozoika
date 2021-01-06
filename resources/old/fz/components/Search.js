import React, { useState } from 'react';
/*
  + Search bar made for searching & sorting result sets
  = Props:
    * search={function}
    ? Function that is executed when the search button is pressed
    * options={[{
    *   name: 'Name for humans',
    *   uName: 'column_name'
    * }]}
    ? Array of objects, which will appear as search options, objects require name and uName properties
*/
export default function Search({ search, options }) {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState(options[0].uName);
  const [dir, setDir] = useState('DESC');
  return (
    <div>
      <form
        className="form-inline search-form"
        onSubmit={ev => {
          ev.preventDefault();
          search({ query, option, dir });
        }}
      >
        <input
          className="form-control"
          type="text"
          placeholder="Zoekterm"
          name="query"
          onChange={ev => setQuery(ev.target.value)}
          value={query}
        />
        <select className="form-control" name="option" onChange={ev => setOption(ev.target.value)}>
          {options.map(item => (
            <option value={item.uName} key={item.name}>
              {item.name}
            </option>
          ))}
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
