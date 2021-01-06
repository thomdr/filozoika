import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import _config from '../../config.json';

const yes = <span className="text-success">Ja</span>;
const no = <span className="text-danger">Nee</span>;

/**
 * TableData
 * Function for displaying different types of \<td> elements
 *
 * @param {object} entry Object containing data to display
 * @param {object} blueprint Object contianing info of how to dipslay data
 * @return {React} React \<td> element
 */
export default function TableData(entry, blueprint) {
    switch (blueprint.special) {
        /**
         * Regular table data cell
         */
        case false:
            return <td>{entry[blueprint.name]}</td>;

        /**
         * Renders a 1 or 0 as colored text
         */
        case 'bool':
            return <td>{entry[blueprint.name] == 1 ? yes : no}</td>;

        /**
         * Renders text as HTML
         */
        case 'html':
            return <td dangerouslySetInnerHTML={{ __html: entry[blueprint.name] }}></td>;

        /**
         * Renders an image
         */
        case 'image':
            if (entry[blueprint.name] == '' || entry[blueprint.name] === null) return <td>Geen foto</td>;
            return (
                <td>
                    <img src={_config.url + entry[blueprint.name]} />
                </td>
            );

        /**
         * Renders a link
         * @property {string} link Link, duh
         * @property {string} referenceName Name of property to be displayed as text
         */
        case 'link':
            return (
                <td>
                    <Link to={blueprint.link + entry[blueprint.name]}>{entry[blueprint.referenceName]}</Link>
                </td>
            );

        /**
         * Renders a list of items
         * @property {string} listName Property name of the array that needs to be displayed
         */
        case 'list':
            return (
                <td>
                    {entry[blueprint.listName].map((item, i) => (
                        <span key={item + '1601299524821'}>{item + (entry[blueprint.listName].length === i + 1 ? '' : ', ')}</span>
                    ))}
                </td>
            );

        /**
         * Renders additional stay data
         */
        case 'stayLinks':
            return (
                <td>
                    <table className="stay-links data-table">
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Soort</th>
                                <th>Hok</th>
                                <th>Medicatie</th>
                                <th>Nagels</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entry.links.map(link => (
                                <tr key={link.id + '1601299524821'}>
                                    <td>
                                        <Link to={'/dieren/' + link.animal_id}>{link.animal_name}</Link>
                                    </td>
                                    <td>{link.species_name}</td>
                                    <td>
                                        <Link to={'/hokken/' + link.cage_id}>
                                            {link.number} - {link.cage_name}
                                        </Link>
                                    </td>
                                    <td>{link.medication == 1 ? yes : no}</td>
                                    <td>{link.nails == 1 ? yes : no}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </td>
            );
        /**
         * Renders a collection of links
         * @property {function} collectionText Function used to return text
         */
        case 'collection':
            return (
                <td>
                    {entry[blueprint.name].map((data, i) => (
                        <React.Fragment key={data.id + '7009934'}>
                            {blueprint.collectionText(data)} {entry[blueprint.name].length === i + 1 ? null : <br />}
                        </React.Fragment>
                    ))}
                </td>
            );

        default:
            return <td>Improper special property!</td>;
    }
}
