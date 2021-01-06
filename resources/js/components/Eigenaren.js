import React from 'react';
import { Text, Textarea } from './minor/Inputs';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import SubIndex from './minor/SubIndex';
import { Link } from 'react-router-dom';

/**
 * Resolver (Validation) for forms
 */
export const resolver = yupResolver(
    yup.object().shape({
        name: yup
            .string()
            .max(100, 'Moet 100 karakters of minder zijn')
            .required('Verplicht'),
        email: yup
            .string()
            .max(64, 'Moet 64 karakters of minder zijn')
            .email('Ongeldig email adres')
            .required('Verplicht'),
        residence: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        address: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        postal_code: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        phone_1: yup.string().max(15, 'Moet 15 karakters of minder zijn'),
        phone_2: yup.string().max(15, 'Moet 15 karakters of minder zijn'),
        phone_3: yup.string().max(15, 'Moet 15 karakters of minder zijn'),
        information: yup.string().max(10000, 'Moet 10000 karakters of minder zijn')
    })
);

/**
 * Config object
 */
export const config = {
    display: 'Eigenaren',
    url: '/eigenaren',
    api: '/api/eigenaren'
};

/**
 * Blueprint array
 * Based on this blueprint, all components will know how to construct themselves (tables, forms, etc.)
 */
export const blueprint = [
    {
        display: 'Naam',
        name: 'name',
        special: false,
        input: Text,
        important: true,
        search: true
    },
    {
        display: 'Email',
        name: 'email',
        special: false,
        input: Text,
        important: true,
        search: false
    },
    {
        display: 'Woonplaats',
        name: 'residence',
        special: false,
        input: Text,
        important: true,
        search: true
    },
    {
        display: 'Adres',
        name: 'address',
        special: false,
        input: Text,
        important: true,
        search: false
    },
    {
        display: 'Postcode',
        name: 'postal_code',
        special: false,
        input: Text,
        important: true,
        search: false
    },
    {
        display: 'Telefoon 1',
        name: 'phone_1',
        special: false,
        input: Text,
        important: true,
        search: false
    },
    {
        display: 'Telefoon 2',
        name: 'phone_2',
        special: false,
        input: Text,
        important: false,
        search: false
    },
    {
        display: 'Telefoon 3',
        name: 'phone_3',
        special: false,
        input: Text,
        important: false,
        search: false
    },
    {
        display: 'Dieren',
        name: 'animals',
        special: 'collection',
        collectionText: data => (
            <Link to={'/dieren/' + data.id}>
                {data.name} ({data.species_name})
            </Link>
        ),
        input: null,
        important: false,
        search: false
    },
    {
        display: 'Verblijven',
        name: 'stays',
        special: 'collection',
        collectionText: data => (
            <Link to={'/reserveringen/' + data.id}>
                Start: {data.start_date}, eind: {data.end_date}
            </Link>
        ),
        input: null,
        important: false,
        search: false
    },
    {
        display: 'Informatie',
        name: 'information',
        special: false,
        input: Textarea,
        important: false,
        search: false
    }
];

export default function Eigenaren({ alert }) {
    return <SubIndex {...{ resolver, config, blueprint, alert }} />;
}
