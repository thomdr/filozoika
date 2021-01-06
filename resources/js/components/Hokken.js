import React from 'react';
import { Checkbox, Text, Number, Checkboxes } from './minor/Inputs';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import SubIndex from './minor/SubIndex';
import _config from '../config.json';

/**
 * Resolver (Validation) for forms
 */
export const resolver = yupResolver(
    yup.object().shape({
        number: yup
            .number()
            .required('Verplicht')
            .max(11, 'Moet 11 karakters of minder zijn'),
        name: yup
            .string()
            .required('Verplicht')
            .max(100, 'Moet 100 karakters of minder zijn')
    })
);

/**
 * Config object
 */
export const config = {
    display: 'Hokken',
    url: '/hokken',
    api: '/api/hokken'
};

/**
 * Blueprint array
 * Based on this blueprint, all components will know how to construct themselves (tables, forms, etc.)
 */
export const blueprint = [
    {
        display: 'Nummer',
        name: 'number',
        special: false,
        input: Number,
        important: true,
        search: true
    },
    {
        display: 'Naam',
        name: 'name',
        special: false,
        input: Text,
        important: true,
        search: true
    },
    {
        display: 'Binnen',
        name: 'inside',
        special: 'bool',
        input: Checkbox,
        important: true,
        search: false
    },
    {
        display: 'Soorten',
        name: 'species',
        special: 'list',
        listName: 'species',
        input: Checkboxes,
        checkboxesLink: _config.url + 'api/soorten',
        checkboxesName: 'species',
        important: true,
        search: false
    }
];

export default function Hokken({ alert }) {
    return <SubIndex {...{ resolver, config, blueprint, alert }} />;
}
