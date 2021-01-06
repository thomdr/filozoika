import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Function for displaying different types of \<td> elements
 * @param {object} entry Object containing data to display
 * @param {object} blueprint Object contianing info of how to dipslay data
 * @return {React} React \<td> element
 */
export default function TableData(entry, blueprint) {
    switch (blueprint.special) {
        case false:
            return <td>{entry[blueprint.name]}</td>;
        case 'bool':
            return (
                <td>
                    {entry[blueprint.name] == '1' ? <span className="text-success">Ja</span> : <span className="text-danger">Nee</span>}
                </td>
            );
        case 'html':
            return <td dangerouslySetInnerHTML={{ __html: entry[blueprint.name] }}></td>;
        case 'image':
            if (entry[blueprint.name] == '') return <td>Geen foto</td>;
            return (
                <td>
                    <img src={entry[blueprint.name] /*eslint-disable-line*/} />
                </td>
            );
        case 'linkToEigenaar':
            return (
                <td>
                    <Link to={'../eigenaren/' + entry.eigenaar_id}>{entry.e_naam}</Link>
                </td>
            );
        default:
            return <td>Improper special property!</td>;
    }
}
