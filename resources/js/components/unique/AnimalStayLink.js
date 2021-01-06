import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

function Status({ status, expanded, alert, deleteFunction }) {
    const [touched, setTouched] = useState(false);
    const [fed, setFed] = useState(status.fed == 1);
    const [pood, setPood] = useState(status.pood == 1);
    const [peed, setPeed] = useState(status.peed == 1);
    const [information, setInformation] = useState(status.information);
    const [showInformation, setShowInformation] = useState(false); // To edit information

    const submit = () => {
        axios
            .post('api/statussen/' + status.id, { information, pood, peed, fed, _method: 'PUT' })
            .catch(() => alert('Error tijdens het bewerken', true));
        setTouched(false);
        setShowInformation(false);
    };

    return (
        <div className="status">
            <span>{status.time}</span>
            {/* Icons */}
            <i
                className={'icon icon-food' + (fed ? '' : ' inactive')}
                onClick={() => {
                    setTouched(true);
                    setFed(!fed);
                }}
            ></i>
            <i
                className={'icon icon-dung' + (pood ? '' : ' inactive')}
                onClick={() => {
                    setTouched(true);
                    setPood(!pood);
                }}
            ></i>
            <i
                className={'icon icon-drop' + (peed ? '' : ' inactive')}
                onClick={() => {
                    setTouched(true);
                    setPeed(!peed);
                }}
            ></i>
            {// Check
            touched || showInformation ? (
                <i
                    className="icon icon-check"
                    onClick={() => {
                        submit();
                    }}
                ></i>
            ) : null}
            {/* Information */}
            <i
                className={'icon icon-pencil' + (showInformation ? '' : ' inactive')}
                onClick={() => {
                    setTouched(true);
                    setShowInformation(!showInformation);
                }}
            ></i>
            {/* Trash */}
            <i
                className="icon icon-trash"
                onClick={() => window.confirm('Weet je zeker dat je deze actie wil uitvoeren?') && deleteFunction(status.id)}
            ></i>
            {//Information textarea or div
            showInformation ? (
                <div>
                    <textarea
                        className="form-control"
                        onChange={ev => setInformation(ev.target.value)}
                        value={information || ''}
                    ></textarea>
                </div>
            ) : expanded ? (
                <div>{information || ''}</div>
            ) : null}
        </div>
    );
}

export default function AnimalStayLink({ day, link, expanded, alert }) {
    const [statuses, setStatuses] = useState(link.statuses);
    const [fed, setFed] = useState(false);
    const [pood, setPood] = useState(false);
    const [peed, setPeed] = useState(false);
    const [information, setInformation] = useState('');
    const [showInformation, setShowInformation] = useState(false);
    const yes = <span className="text-success">Ja</span>;
    const no = <span className="text-danger">Nee</span>;
    let isMounted = true;

    // I think this works..?
    useEffect(() => () => (isMounted = false), []);

    const deleteStatus = id =>
        axios
            .delete('api/statussen/' + id)
            .then(() => setStatuses(statuses.filter(status => status.id != id)))
            .catch(() => alert('Error tijdens het verwijderen', true));

    // Create a status, insert it back into the statuses array and reset the "form"
    const createStatus = () => {
        const createStatus = async () =>
            await axios
                .post('api/statussen', { id: link.id, fed, peed, pood, information })
                .catch(() => alert('Error tijdens het toevoegen', true));
        createStatus().then(({ data }) => {
            if (isMounted) {
                setStatuses([...statuses, data]);
                setFed(false);
                setPood(false);
                setPeed(false);
                setInformation('');
                setShowInformation(false);
            }
        });
    };

    return (
        <tr>
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
            <td className="statuses">
                {statuses?.map(status => (
                    <Status {...{ status, expanded, alert }} key={status.id + '5623425'} deleteFunction={deleteStatus} />
                ))}
                {// Only allow new statusses if the chosen day is the same as the REAL current day
                new Date(new Date().toISOString().slice(0, 10)).getTime() == new Date(day).getTime() ? (
                    <div className="status create">
                        <span>--:--:--</span>
                        <i className={'icon icon-food' + (fed ? '' : ' inactive')} onClick={() => setFed(!fed)}></i>
                        <i className={'icon icon-dung' + (pood ? '' : ' inactive')} onClick={() => setPood(!pood)}></i>
                        <i className={'icon icon-drop' + (peed ? '' : ' inactive')} onClick={() => setPeed(!peed)}></i>
                        {peed || pood || fed ? <i className="icon icon-check" onClick={() => createStatus()}></i> : null}
                        <i
                            className={'icon icon-pencil' + (showInformation ? '' : ' inactive')}
                            onClick={() => setShowInformation(!showInformation)}
                        ></i>
                        {showInformation ? (
                            <div>
                                <textarea
                                    className="form-control"
                                    onChange={ev => setInformation(ev.target.value)}
                                    value={information || ''}
                                ></textarea>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </td>
        </tr>
    );
}
