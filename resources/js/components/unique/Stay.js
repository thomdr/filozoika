import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimalStayLink from './AnimalStayLink';
import _ from 'lodash';

export default function Stay({ stay, day, alert }) {
    const [expanded, setExpanded] = useState(false);
    const futureDaysRemaining = Math.ceil(Math.abs(new Date(day) - new Date(stay.start_date)) / 86400000); // Days remaining if stay has yet to start
    const daysRemaining = Math.ceil(Math.abs(new Date(day) - new Date(stay.end_date)) / 86400000); // Days remaining until the stay ends

    return (
        <div className={'stay' + (expanded ? ' expand' : '')}>
            <div className="dates">
                <p>
                    <span>Start</span>
                    {stay.start_date}
                </p>
                <p>
                    <span>Eind</span>
                    {stay.end_date}
                </p>
                <p>
                    {/* Show status based on date */}
                    {stay.type === 'starts' ? (
                        <>
                            <span>Start</span>
                            Vandaag
                        </>
                    ) : stay.type === 'ends' ? (
                        <>
                            <span>Eindigt</span>
                            Vandaag
                        </>
                    ) : stay.type === 'future' ? (
                        <>
                            <span>Start over</span>
                            {futureDaysRemaining} {futureDaysRemaining == 1 ? 'dag' : 'dagen'}
                        </>
                    ) : (
                        <>
                            <span>Eindigt over</span>
                            {daysRemaining} {daysRemaining == 1 ? 'dag' : 'dagen'}
                        </>
                    )}
                </p>
                <Link to={'/reserveringen/' + stay.id} className="btn btn-outline-info">
                    Bekijk
                </Link>
                <Link to={'/reserveringen/bewerk/' + stay.id} className="btn btn-outline-primary">
                    Bewerk
                </Link>
                <button className="btn btn-outline-info" onClick={() => setExpanded(!expanded)}>
                    Vergroot
                </button>
            </div>
            <table className="data-table">
                <thead>
                    <tr className={stay.type}>
                        <th>Naam</th>
                        <th>Soort</th>
                        <th>Hok</th>
                        <th>Nagels</th>
                        <th>Medicatie</th>
                        <th>Statussen</th>
                    </tr>
                </thead>
                <tbody>
                    {stay.links.map(link => (
                        <AnimalStayLink {...{ link, expanded, alert, day }} key={link.id + '1604871445'} />
                    ))}
                    {expanded && (
                        <tr className="information">
                            <th colSpan="1">Informatie</th>
                            <td colSpan="5">{stay.information}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
