import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputText, Textarea, InputCheckbox } from '../minor/Inputs';
import resolver from './resolver';

/**
 * Custom form for animals
 * @param {object} defaultValues Default values of the form
 * @param {string} backlink Link to go back to the main page
 * @param {function} alert Alert function
 */
export default function Create({ alert }) {
    const form = useRef(null);
    const { register: r, handleSubmit, errors: e } = useForm({ resolver });

    const onSubmit = data => {
        axios
            .post('/api/dieren', data)
            .then(() => {
                alert('Dier aangemaakt', false);
                form.current.reset();
            })
            .catch(() => alert('Error tijdens het aanmaken van een dier', true));
    };

    return (
        <div className="container">
            <Link to={'/dieren'} className="btn btn-outline-primary go-back">
                Terug naar overzicht
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className="regular-form" ref={form}>
                <InputText name="id" display="ID" reg={r} error={e.id} disabled />
                <InputText name="name" display="Naam" reg={r} error={e.name} />
                <InputText name="species" display="Soort" reg={r} error={e.species} />
                <InputText name="gender" display="Geslacht" reg={r} error={e.name} />
                <InputText name="date_of_birth" display="Geboorte datum" reg={r} error={e.date_of_birth} />
                <InputText name="vet" display="Dierenarts" reg={r} error={e.vet} />
                <InputCheckbox name="own_food" display="Eigen voer" reg={r} error={e.own_food} />
                <InputText name="food_amount" display="Voedings hoeveelheid" reg={r} error={e.food_amount} />
                <InputText name="owner_id" display="Eigenaar" reg={r} error={e.owner_id} />
                <InputText name="pasport" display="Paspoort" reg={r} error={e.pasport} />
                <InputText name="photo" display="Foto" reg={r} error={e.photo} />
                <InputCheckbox name="active" display="Actief" reg={r} error={e.active} />
                <Textarea name="information" display="Informatie" reg={r} error={e.information} />
                <input type="submit" className="btn btn-primary" value="Aanmaken" />
            </form>
        </div>
    );
}
