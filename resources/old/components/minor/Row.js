import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import TableData from './TableData';

/**
 * Row for table containing a bunch of data
 * @param {object} entry Object containing data for row
 * @param {string} editUrl Url to go to the edit page
 * @param {function} deleteFunction Function called for delete button
 * @param {array} blueprint Array with object containing info of column data
 */
export default function Row({ entry, editUrl, deleteFunction, blueprint }) {
    const { path } = useRouteMatch();
    return (
        <tr>
            <td>
                <Link to={path + '/' + entry.id}>
                    <button className="btn btn-outline-info">Bekijk</button>
                </Link>
            </td>
            {blueprint.map((print, i) => {
                if (print.important) return <React.Fragment key={print.name + i}>{TableData(entry, print)}</React.Fragment>;
            })}
            <td className="buttons">
                <Link to={editUrl} className="btn btn-outline-primary">
                    Bewerk
                </Link>
                <button
                    type="button"
                    className="btn btn-outline-danger warning-trigger"
                    onClick={() => window.confirm('Weet je zeker dat je deze actie wil uitvoeren?') && deleteFunction(entry?.id)}
                >
                    Verwijder
                </button>
            </td>
        </tr>
    );
}
