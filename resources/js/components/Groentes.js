import React from 'react';
import { Text } from './minor/Inputs';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import SubIndex from './minor/SubIndex';

/**
 * Resolver (Validation) for forms
 */
export const resolver = yupResolver(
    yup.object().shape({
        name: yup
            .string()
            .max(100, 'Moet 100 karakters of minder zijn')
            .required('Verplicht')
    })
);

/**
 * Config object
 */
export const config = {
    display: 'Groentes',
    url: '/groentes',
    api: '/api/groentes'
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
    }
];

export default function Goentes({ alert }) {
    return <SubIndex {...{ resolver, config, blueprint, alert }} />;
}
