import React, { useState, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import _ from 'lodash';
import { Datalist, InputDate, Textarea, Animals } from '../minor/Inputs';
import { blueprint as eigenaarBlueprint } from '../Eigenaren';
import _config from '../../config.json';

// Force update "hook" because giving the delete button a type="button" to prevent submitting prevents it from updating as well
// This is because, for fuck knows why, let _inputs[position] = null changes _inputs and inputs at the same time, so React does not see a state change
function useForceUpdate() {
    const [v, sv] = useState(0);
    return () => sv(v => ++v);
}

/**
 * CreateReservering
 * Unique create form for stays
 *
 * @param {alert} alert Function to display alert
 * @param {object} config Object containing config data
 * @param {array} blueprint Array containing information about inputs/table data to construct
 * @param {bool} edit If it should be an edit form
 */
export default function CEReservering({ alert, config, blueprint, edit = false }) {
    const form = useRef(null);
    const [schema, setSchema] = useState(undefined); // Schema to use for validating
    const [ownerId, setOwnerId] = useState(0); // Wether to show existing owners or not
    const [showOwners, setShowOwners] = useState(true); // Wether to allow existing animals or not
    const [allowOldAnimals, setAllowOldAnimals] = useState(false); // Wether to allow existing animals or not
    const [newInputs, setNewInputs] = useState([]); // Array of numbers, used to create input rows
    const [oldInputs, setOldInputs] = useState([]); // Array of numbers, used to create input rows
    const [stay, setStay] = useState(null); // Stay data if editing
    const forceUpdate = useForceUpdate();
    let { register: r, handleSubmit, errors, reset } = useForm({ resolver: yupResolver(schema) });

    // Remove inputs for animals
    const removeInputs = (position, isNew) => {
        if (isNew) {
            const i = newInputs;
            i[position] = undefined;
            setNewInputs(i);
        } else {
            const i = oldInputs;
            i[position] = undefined;
            setOldInputs(i);
        }
        forceUpdate();
    };
    // Add aditional inputs for animals
    const createInputs = isNew => {
        isNew ? setNewInputs([...newInputs].concat([newInputs.length])) : setOldInputs([...oldInputs].concat([oldInputs.length]));
        forceUpdate();
    };

    // Change schema if form changes
    useEffect(() => {
        // Basic rules
        let shape = {
            start_date: yup.string().required('Verplicht'),
            end_date: yup.string().required('Verplicht'),
            s_information: yup.string().max(10000, 'Moet 10000 karakters of minder zijn'),
            cage_id: yup.string().notOneOf(['0'], 'Verplicht')
        };
        if (!showOwners) {
            // Set a bunch of new owner properties rules if making a new owner
            shape = {
                ...shape,
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
            };
        } else {
            // Set owner_id rule if selecting existing owner
            shape = {
                ...shape,
                owner_id_override: yup.string().notOneOf(['0'], 'Verplicht')
            };
        }
        // Rules for existing animals
        oldInputs.map(i => {
            shape = {
                ...shape,
                ['a_' + i + '_id']: yup.string().notOneOf(['0'], 'Verplicht')
            };
        });
        // Rules for new animals
        newInputs.map(i => {
            shape = {
                ...shape,
                ['a_' + i + '_species']: yup
                    .string()
                    .required('Verplicht')
                    .notOneOf(['0'], 'Verplicht'),
                ['a_' + i + '_amount']: yup
                    .number()
                    .truncate()
                    .required('Verplicht')
                    .min(1, 'Minimaal 1')
                    .max(99, 'Maximaal 99')
            };
        });
        setSchema(yup.object().shape(shape));
    }, [showOwners, oldInputs, newInputs]);

    // Do not allow selecting existing animals if making a new owner
    useEffect(() => {
        setAllowOldAnimals(false);
        if (!showOwners) {
            setOldInputs([]);
        }
    }, [showOwners]);

    // Set owner id when owner is chosen, so the animal list can unblocked and refreshed
    const onOwnerChange = id => {
        setOwnerId(id);
        setAllowOldAnimals(true);
        setOldInputs([]);
    };

    // On form submit
    const onSubmit = data => {
        // Animal validation
        let valid = false;
        let animalIds = [];
        for (const key in data) {
            // Check if the user has even added an animal
            if (key.match(/a_[\d]_(species|amount|id)/)) {
                valid = true;
                // Check if user has selected the same animal multiple times
                if (key.match(/a_[\d]_id/)) {
                    if (animalIds[data[key]]) {
                        alert('Bestaand dier mag maar 1 keer geselecteerd worden', true);
                        return;
                    }
                    animalIds[data[key]] = true;
                }
            }
        }

        // If animals are valid
        if (valid) {
            // Check if start date is not earlier than end date
            if (new Date(data.start_date).getTime() < new Date(data.end_date).getTime()) {
                if (edit) {
                    data.owner_id = ownerId;
                    data._method = 'PUT';
                    axios
                        .post(config.api + '/' + /(?<=\/)[\d]+/.exec(window.location.href)[0], data)
                        .then(() => alert('Bewerkt', false))
                        .catch(() => alert('Error tijdens het aanmaken', true));
                } else {
                    axios
                        .post(config.api, data)
                        .then(() => {
                            alert('Aangemaakt', false);
                            form.current.reset();
                            setShowOwners(true);
                            setOldInputs([]);
                            setNewInputs([]);
                        })
                        .catch(() => alert('Error tijdens het aanmaken', true));
                }
            } else {
                alert('Start datum is niet eerder dan eind datum', true);
            }
        } else {
            alert('Geen dier(en) toegevoegd', true);
        }
    };

    // If editing, get stay data and do a bunch of stuff
    useEffect(() => {
        let url = /(?<=\/)[\d]+/.exec(window.location.href);
        if (edit && url) {
            // This unmounted stuff is needed to prevent an error
            let isMounted = true;
            // url[0] is the ID from the url
            const getData = async () => await axios(_config.url + 'api/reserveringen/' + url[0]);
            getData().then(results => {
                if (isMounted) {
                    // Stay information is named s_information
                    results.data.s_information = results.data.information;
                    setOwnerId(results.data.owner_id);
                    setAllowOldAnimals(true);
                    reset(results.data);
                    // Create old inputs for each link found
                    const _oldInputs = [];
                    results.data.links.map((link, i) => {
                        results.data[`a_${i}_id`] = link.animal_id;
                        _oldInputs.push(i);
                    });
                    setOldInputs(_oldInputs);
                    setStay(results.data);
                }
            });
            return () => {
                isMounted = false;
            };
        }
    }, []);

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="regular-form" ref={form}>
                {/* Owners */}
                {!edit && (
                    <>
                        <h2>Eigenaar</h2>
                        <nav className="buttons">
                            <button type="button" className="btn btn-outline-info warning-trigger" onClick={() => setShowOwners(true)}>
                                Bestaand
                            </button>
                            <button type="button" className="btn btn-outline-primary warning-trigger" onClick={() => setShowOwners(false)}>
                                Nieuw
                            </button>
                        </nav>
                        <div className="backgrounds">
                            {showOwners ? (
                                <Datalist
                                    blueprint={{ ...blueprint[0], name: 'owner_id_override' }}
                                    reg={r}
                                    onChange={onOwnerChange}
                                    error={errors.owner_id_override}
                                />
                            ) : (
                                eigenaarBlueprint.map(
                                    print =>
                                        print.input && (
                                            <print.input
                                                key={print.name + '1601287246897'}
                                                blueprint={print}
                                                reg={r}
                                                error={errors[print.name]}
                                            />
                                        )
                                )
                            )}
                        </div>
                    </>
                )}
                {/* Stay info */}
                <h2>Reservering</h2>
                <div className="backgrounds">
                    <InputDate
                        blueprint={{
                            display: 'Start datum',
                            name: 'start_date'
                        }}
                        reg={r}
                        error={errors.start_date}
                    />
                    <InputDate
                        blueprint={{
                            display: 'Eind datum',
                            name: 'end_date'
                        }}
                        reg={r}
                        error={errors.end_date}
                    />
                    <Textarea
                        blueprint={{
                            display: 'Informatie',
                            name: 's_information'
                        }}
                        reg={r}
                        error={errors.s_information}
                    />
                </div>

                {/* Animals */}
                <h2>Dieren</h2>
                {/* Old inputs */}
                <div className="backgrounds">
                    {_.isArray(oldInputs) &&
                        oldInputs.map((i, j) => {
                            return typeof i === 'undefined' ? null : (
                                <Animals
                                    key={i + '1601635712459'}
                                    where={['owner_id', ownerId]}
                                    reg={r}
                                    onDelete={() => removeInputs(i, false)}
                                    counter={i}
                                    errors={errors}
                                    values={stay?.links[j]}
                                    edit={edit}
                                />
                            );
                        })}
                    <button
                        type="button"
                        className={`btn btn-${allowOldAnimals ? 'primary' : 'dark'}`}
                        onClick={() => createInputs(false)}
                        disabled={!allowOldAnimals}
                    >
                        +1 bestaand
                    </button>
                </div>
                {/* New inputs */}
                <div className="backgrounds">
                    {newInputs.map(i => {
                        return typeof i === 'undefined' ? null : (
                            <Animals
                                key={i + '160163519327'}
                                reg={r}
                                onDelete={() => removeInputs(i, true)}
                                counter={i}
                                errors={errors}
                                edit={edit}
                                isNew
                            />
                        );
                    })}
                    <button type="button" className="btn btn-primary" onClick={() => createInputs(true)}>
                        +1 nieuw
                    </button>
                </div>
                <input type="submit" className="btn btn-primary" value={edit ? 'Bewerken' : 'Aanmaken'} />
            </form>
        </div>
    );
}
