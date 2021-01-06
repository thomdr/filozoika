import React from 'react';
import { Text, Textarea, Checkbox, Radio, File, Datalist, InputDate, Checkboxes } from './minor/Inputs';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import SubIndex from './minor/SubIndex';
import _config from '../config.json';
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
        gender: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        date_of_birth: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        vet: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        food_amount: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        information: yup.string().max(10000, 'Moet 10000 karakters of minder zijn')
    })
);

/**
 * Config object
 */
export const config = {
    display: 'Dieren',
    url: '/dieren',
    api: '/api/dieren'
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
        display: 'Soort',
        name: 'species_id',
        special: 'link',
        link: '../soorten/',
        input: Datalist,
        datalistLink: _config.url + 'api/soorten',
        referenceName: 'species_name',
        important: true,
        search: false
    },
    {
        display: 'Geslacht',
        name: 'gender',
        special: false,
        input: Radio,
        radioValues: ['Man', 'Vrouw'],
        important: true,
        search: true
    },
    {
        display: 'Geboorte datum',
        name: 'date_of_birth',
        special: false,
        input: InputDate,
        important: true,
        search: false
    },
    {
        display: 'Dierenarts',
        name: 'vet',
        special: false,
        input: Text,
        important: false,
        search: false
    },
    {
        display: 'Actief',
        name: 'active',
        special: 'bool',
        input: Checkbox,
        important: true,
        search: false
    },
    {
        display: 'Eigen voer',
        name: 'own_food',
        special: 'bool',
        input: Checkbox,
        important: true,
        search: false
    },
    {
        display: 'Voedings hoeveelheid',
        name: 'food_amount',
        special: false,
        input: Text,
        important: true,
        search: false
    },
    {
        display: 'Groentes',
        name: 'vegetables',
        special: 'list',
        listName: 'vegetables',
        input: Checkboxes,
        checkboxesLink: _config.url + 'api/groentes',
        checkboxesName: 'vegetable',
        important: false,
        search: false
    },
    {
        display: 'Eigenaar',
        name: 'owner_id',
        special: 'link',
        link: '../eigenaren/',
        input: Datalist,
        datalistLink: _config.url + 'api/eigenaren',
        referenceName: 'owner_name',
        important: true,
        search: false
    },
    {
        display: 'Paspoort',
        name: 'pasport',
        special: 'image',
        input: File,
        important: false,
        search: false
    },
    {
        display: 'Foto',
        name: 'photo',
        special: 'image',
        input: File,
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

export default function Dieren({ alert }) {
    return <SubIndex {...{ resolver, config, blueprint, alert }} />;
}
