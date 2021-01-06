import React from 'react';
import { Textarea, Checkbox, Datalist, InputDate } from './minor/Inputs';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import CEReservering from './unique/CEReservering';
import SubIndex from './minor/SubIndex';
import _config from '../config.json';

/**
 * Resolver (Validation) for forms
 */
export const resolver = yupResolver(
    yup.object().shape({
        start_date: yup.string().required('Verplicht'),
        end_date: yup.string().required('Verplicht'),
        information: yup.string().max(10000, 'Moet 10000 karakters of minder zijn')
    })
);

/**
 * Config object
 */
export const config = {
    display: 'Reserveringen',
    url: '/reserveringen',
    api: '/api/reserveringen'
};

/**
 * Blueprint array
 * Based on this blueprint, all components will know how to construct themselves (tables, forms, etc.)
 */
export const blueprint = [
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
        display: 'Aantal dieren',
        name: 'animals',
        special: false,
        important: true,
        search: false
    },
    {
        display: 'Start datum',
        name: 'start_date',
        special: false,
        input: InputDate,
        important: true,
        search: true
    },
    {
        display: 'Eind datum',
        name: 'end_date',
        special: false,
        input: InputDate,
        important: true,
        search: true
    },
    {
        display: 'Dieren',
        name: 'links',
        special: 'stayLinks',
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

export default function Reserveringen({ alert }) {
    return (
        <SubIndex
            {...{ resolver, config, blueprint, alert }}
            create={<CEReservering {...{ alert, blueprint, config }} />}
            edit={<CEReservering {...{ alert, blueprint, config }} edit />}
        ></SubIndex>
    );
}
