import React, { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import _ from 'lodash';
import RouteComponent from './minor/RouteComponent';
import { Text } from './minor/Inputs';

/**
 * Gebruikers
 * Component that displays all users and also a form for creating new ones
 *
 * @param {function} alert Alert function
 */
export default function Gebruikers({ alert }) {
    const [_data, _setData] = useState(null);
    const form = useRef(null);
    const { register: reg, handleSubmit, errors } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                name: yup
                    .string()
                    .max(20, 'Moet 20 karakters of minder zijn')
                    .required('Verplicht'),
                email: yup
                    .string()
                    .email()
                    .lowercase()
                    .max(64, 'Moet 64 karakters of minder zijn')
                    .required('Verplicht'),
                password: yup
                    .string()
                    .min(8, 'Moet minimaal 8 karakters zijn')
                    .max(20, 'Moet 20 karakters of minder zijn')
                    .required('Verplicht')
            })
        )
    });

    useEffect(() => getData(), []);

    const getData = () => {
        let isMounted = true;
        const get = async () => await axios('api/gebruikers');
        get().then(results => {
            if (isMounted) _setData(results.data);
        });
        return () => {
            isMounted = false;
        };
    };

    const deleteUser = id =>
        axios
            .delete('api/gebruikers/' + id)
            .then(() => {
                getData();
                alert('Verwijderd', false);
            })
            .catch(() => alert('Error tijdens het verwijderen', true));

    const onSubmit = data => {
        axios
            .post('/api/gebruikers', data)
            .then(response => {
                // Response will be an array with either true or false, if the email is already in use
                if (response.data[0]) {
                    alert('Aangemaakt', false);
                    getData();
                    form.current.reset();
                } else {
                    alert('Email is al in gebruik', true);
                }
            })
            .catch(() => alert('Error tijdens het aanmaken', true));
    };

    return (
        <RouteComponent name="Gebruikers">
            <h1>Gebruikers</h1>
            <div className="container users">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Gebruikersnaam</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.isArray(_data) &&
                            _data.map(user => (
                                <tr key={user.id + '08212459'}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="buttons">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger warning-trigger"
                                            onClick={() =>
                                                window.confirm('Weet je zeker dat je deze actie wil uitvoeren?') && deleteUser(user.id)
                                            }
                                        >
                                            Verwijder
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="regular-form" ref={form}>
                    <div className="backgrounds">
                        <Text blueprint={{ name: 'name', display: 'Gebruikersnaam' }} error={errors['name']} reg={reg} />
                        <Text blueprint={{ name: 'email', display: 'Email' }} error={errors['email']} isEmail reg={reg} />
                        <Text blueprint={{ name: 'password', display: 'Wachtwoord' }} error={errors['password']} reg={reg} />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Aanmaken" />
                </form>
            </div>
        </RouteComponent>
    );
}
