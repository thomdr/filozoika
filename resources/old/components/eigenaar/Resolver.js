import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

/**
 * Resolver (Validation) for owner form
 */
export const resolver = yupResolver(
    yup.object().shape({
        name: yup
            .string()
            .max(50, 'Moet 50 karakters of minder zijn')
            .required('Verplicht'),
        email: yup
            .string()
            .max(64, 'Moet 64 karakters of minder zijn')
            .email('Ongeldig email adres')
            .required('Verplicht'),
        phone_1: yup.string().max(15, 'Moet 15 karakters of minder zijn'),
        phone_2: yup.string().max(15, 'Moet 15 karakters of minder zijn'),
        phone_3: yup.string().max(15, 'Moet 15 karakters of minder zijn'),
        information: yup.string().max(10000, 'Moet 10000 karakters of minder zijn')
    })
);
