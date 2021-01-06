import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputText, Textarea } from '../minor/Inputs';
import resolver from './resolver';

/**
 * Custom form for owners
 * @param {object} defaultValues Default values of the form
 * @param {string} backlink Link to go back to the main page
 * @param {function} alert Alert function
 */
export default function Create({ alert }) {
    const form = useRef(null);
    const { register: r, handleSubmit, errors: e } = useForm({ resolver });

    const onSubmit = data => {
        axios
            .post('/api/eigenaren', data)
            .then(() => {
                alert('Eigenaar aangemaakt', false);
                form.current.reset();
            })
            .catch(() => alert('Error tijdens het aanmaken van een eigenaar', true));
    };

    return (
        <div className="container">
            <Link to={'/eigenaren'} className="btn btn-outline-primary go-back">
                Terug naar overzicht
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className="regular-form" ref={form}>
                <InputText name="id" display="ID" reg={r} error={e.id} disabled />
                <InputText name="name" display="Naam" reg={r} error={e.name} />
                <InputText name="email" display="Email" reg={r} error={e.email} />
                <InputText name="phone_1" display="Telefoon 1" reg={r} error={e.phone_1} />
                <InputText name="phone_2" display="Telefoon 2" reg={r} error={e.phone_2} />
                <InputText name="phone_3" display="Telefoon 3" reg={r} error={e.phone_3} />
                <InputText name="information" display="Informatie" reg={r} error={e.information} />
                <input type="submit" className="btn btn-primary" value="Aanmaken" />
                <input type="reset" className="btn btn-outline-primary" />
            </form>
        </div>
    );
}
