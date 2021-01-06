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
        species: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        // gender: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        date_of_birth: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        vet: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        // own_food: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        food_amount: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        // owner_id: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        // pasport: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        // photo: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        // active: yup.string().max(100, 'Moet 100 karakters of minder zijn'),
        information: yup.string().max(10000, 'Moet 10000 karakters of minder zijn')
    })
);
