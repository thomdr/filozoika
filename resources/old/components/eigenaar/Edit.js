import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputText, Textarea } from '../minor/Inputs';
import resolver from './resolver';

/**
 * Custom form for owners
 * @param {match} match react-router-dom magic, used to get ID from url
 * @param {function} alert Alert function
 */
export default function Edit({ alert, match }) {
    useEffect(() => {
        const getData = async () => {
            const response = await axios('/api/eigenaren/' + match.params.id + '/edit');
            reset(response.data);
        };
        getData();
    }, [reset]);

    const { register: r, handleSubmit, errors: e, reset } = useForm({ resolver });

    const onSubmit = data => {
        axios
            .put('/api/eigenaren/' + match.params.id, data)
            .then(() => alert('Eigenaar bewerkt', false))
            .catch(() => alert('Error tijdens het bewerken van een eigenaar', true));
    };

    return (
        <div className="container">
            <Link to={'/eigenaren'} className="btn btn-outline-primary go-back">
                Terug naar overzicht
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className="regular-form">
                <InputText name="id" display="ID" reg={r} error={e.id} disabled />
                <InputText name="name" display="Naam" reg={r} error={e.name} />
                <InputText name="email" display="Email" reg={r} error={e.email} />
                <InputText name="phone_1" display="Telefoon 1" reg={r} error={e.phone_1} />
                <InputText name="phone_2" display="Telefoon 2" reg={r} error={e.phone_2} />
                <InputText name="phone_3" display="Telefoon 3" reg={r} error={e.phone_3} />
                <Textarea name="information" display="Informatie" reg={r} error={e.information} />
                <input type="submit" className="btn btn-primary" value="Bewerken" />
            </form>
        </div>
    );
}
