import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import _config from '../../config.json';

/**
 * Input field component
 * @param {object} Blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @param {object} error Object holding potential errors
 * @param {bool} isEmail If it should be type email
 * @return {React} \<div> with label, input and error
 */
export function Text({ blueprint: bp, reg, error, isEmail = false }) {
    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <input id={bp.name} className="form-control" type={isEmail ? 'email' : 'text'} name={bp.name} ref={reg} />
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}

/**
 * Hidden input component
 * @param {object} Blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @return {React} \<div> with label, input and error
 */
export function Hidden({ blueprint: bp, reg }) {
    return <input type="hidden" name={bp.name} ref={reg} />;
}

/**
 * Input field component for numbers
 * @param {object} Blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @param {object} error Objecth holding potential errors
 * @return {React} \<div> with label, input number and error
 */
export function Number({ blueprint: bp, reg, error }) {
    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <input id={bp.name} className="form-control" type="number" name={bp.name} ref={reg} />
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}

/**
 * Input field component for dates
 * @param {object} Blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @param {object} error Objecth holding potential errors
 * @return {React} \<div> with label, input date and error
 */
export function InputDate({ blueprint: bp, reg, error }) {
    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <input id={bp.name} className="form-control" type="date" name={bp.name} ref={reg} />
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}

/**
 * Select component
 * @param {object} Blueprint Object containing data
 * 		@property {array} options Array of values to render as options
 * @param {function} reg Required for Hook Form
 * @return {React} \<div> with label, select and error
 */
export function Select({ blueprint: bp, reg }) {
    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <select className="custom-select" id={bp.name} ref={reg} name={bp.name}>
                {bp.options.map(value => (
                    <option value={value} key={value + '1601301124203'}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}

/**
 * Textarea input component
 * @param {object} Blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @param {object} error Objecth holding potential errors
 * @return {React} \<div> with label, textarea and error
 */
export function Textarea({ blueprint: bp, reg, error }) {
    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <textarea className="form-control" id={bp.name} name={bp.name} ref={reg}></textarea>
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}

/**
 * Checkbox input component
 * @param {object} Blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @return {React} \<div> with label, checkbox
 */
export function Checkbox({ blueprint: bp, reg }) {
    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <input id={bp.name} type="checkbox" name={bp.name} ref={reg} />
        </div>
    );
}

/**
 * Radio input component
 * @param {object} Blueprint Object containing data
 * 		@param {array} radioValues Array of values to render as radio inputs
 * @param {function} reg Required for Hook Form
 * @return {React} \<div> with label, radio buttons
 */
export function Radio({ blueprint: bp, reg }) {
    return (
        <div className="input-container">
            <label>{bp.display}</label>
            {bp.radioValues.map(value => (
                <label className="radio" key={value + '1601290276779'}>
                    <input type="radio" name={bp.name} ref={reg} value={value} />
                    {value}
                </label>
            ))}
        </div>
    );
}

/**
 * File input component
 * @param {object} blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @param {string} img Image to display as placeholder
 * @param {object} error Objecth holding potential errors
 * @return {React} \<div> with label, file input
 */
export function File({ blueprint: bp, reg, img = 'public/placeholder.png' }) {
    const [url, setUrl] = useState(_config.url + img);
    const [error, setError] = useState(null);

    // Update image if edit form just loaded an image
    useEffect(() => (img !== null ? setUrl(_config.url + img) : undefined), [img]);

    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <label htmlFor={bp.name} className="file btn btn-info">
                Upload
            </label>
            <input
                id={bp.name}
                type="file"
                name={bp.name}
                ref={reg}
                onChange={ev => {
                    const file = ev.target.files[0];
                    if (file.type === 'image/jpeg' || file.type === 'image/png') {
                        setUrl(URL.createObjectURL(file));
                        setError(null);
                    } else {
                        setError('Ongeldige afbeelding');
                        setUrl(_config.url + 'public/placeholder_error.png');
                    }
                }}
            />
            <img src={url} alt="Upload afbeelding" className="preview-img" />
            {error && <p className="warning">{error}</p>}
        </div>
    );
}

/**
 * Datalist component
 * Because the value has to be saved as an ID, this component uses hooks to set a hidden input's value,
 * which is the value that will be used by the form
 *
 * @param {object} blueprint Object containing data
 * 		@property {string} datalistLink API link to get data
 * 		@property {string} referenceName Name of property to be displayed as text
 * @param {function} reg Required for Hook Form
 * @param {array} values Optional array of all values
 * @param {function} onChange Optional function called on input change
 * @param {object} error Object holding potential errors
 * @return {React} \<div> with label, datalist input and error
 */
export function Datalist({ blueprint: bp, reg, values = [], onChange = null, error = null }) {
    const [data, setData] = useState(null);
    const [datalistValue, setDatalistValue] = useState(0);
    const [name, setName] = useState('Geen');

    // Load list
    useEffect(() => {
        // This unmounted stuff is needed to prevent an error
        let isMounted = true;
        const getData = async () => await axios(bp.datalistLink);
        getData().then(results => isMounted && setData(results.data));
        return () => {
            isMounted = false;
        };
    }, []);

    // Set name already if editing
    useEffect(() => {
        if (!_.isEmpty(values)) setName(values[bp.referenceName]);
    }, [values]);

    return (
        <div className="input-container">
            <label htmlFor={bp.name}>{bp.display}</label>
            <input
                list={'dl' + bp.name}
                id={bp.name}
                className="custom-select"
                onChange={ev => {
                    let result = data.filter(d => ev.target.value?.toLowerCase() === d.name?.toLowerCase());
                    if (!_.isEmpty(result)) {
                        setName(ev.target.value);
                        setDatalistValue(result[0].id);
                        onChange && onChange(result[0].id);
                    }
                }}
            />
            <datalist id={'dl' + bp.name}>
                {_.isArray(data) && data.map(d => <option key={d.id + '1601287221714'} data-value={d.id} value={d.name} />)}
            </datalist>
            <input type="hidden" name={bp.name} value={datalistValue} ref={reg} />
            <p>Geselecteerd: {name}</p>
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}

/**
 * Animals (modified datalist) component
 *
 * @param {object} blueprint Object containing data
 * @param {function} reg Required for Hook Form
 * @param {function} onDelete Function called on delete button click
 * @param {int} counter Counter for name value
 * @param {object} errors Object holding potential errors, note that this requires a different error object than other inputs
 * @param {bool} isNew Whether it should be new animals or old ones
 * @param {array} where Optional array serving as 'where' clause
 * @param {array} values Optional array of all values
 * @return {React} \<div> with label, datalist input and error
 */
export function Animals({ reg, onDelete, counter, errors, isNew = false, where = [], values = [], edit = false }) {
    const [data, setData] = useState(null);
    const [datalistValue, setDatalistValue] = useState(0);
    const [name, setName] = useState('Geen');
    const [cage, setCage] = useState(0);
    const [nails, setNails] = useState(0);
    const [medication, setMedication] = useState(0);
    const [cages, setCages] = useState(null);
    const [speciesId, setSpeciesId] = useState(null);
    const [speciesName, setSpeciesName] = useState('Geen');

    // Small string for htmlFor and id purposes
    const n = isNew ? 'a' : 'b';

    // Load list
    useEffect(() => {
        // This unmounted stuff is needed to prevent an error
        let isMounted = true;
        const getData = async () => await axios(_config.url + (isNew ? 'api/soorten' : 'api/dieren'));
        const getCages = async () => await axios(_config.url + 'api/hokken');
        getData().then(({ data }) => isMounted && setData(data));
        getCages().then(({ data }) => isMounted && setCages(data));
        return () => {
            isMounted = false;
        };
    }, []);

    // Set name already if editing
    useEffect(() => {
        if (!_.isEmpty(values)) {
            setName(values.animal_name);
            setDatalistValue(values.animal_id);
            setSpeciesId(values.species_id);
            setCage(values.cage_id);
            setNails(values.nails);
            setMedication(values.medication);
            setSpeciesName(values.species_name);
        }
    }, [values]);

    return (
        <div className="input-container input-animals">
            <label htmlFor={counter + n}>{isNew ? 'Soort' : 'Dier'}</label>
            <div className="flex">
                <div>
                    <input
                        list={'dl' + counter + n}
                        id={counter + n}
                        className="custom-select"
                        onChange={ev => {
                            let result = data.filter(d => ev.target.value?.toLowerCase() === d.name?.toLowerCase());
                            if (!_.isEmpty(result)) {
                                setName(ev.target.value);
                                setDatalistValue(result[0].id);
                                setSpeciesId(_.has(result[0], 'deleted') ? result[0].species_id : result[0].id);
                                setSpeciesName(_.has(result[0], 'deleted') ? result[0].species_name : null);
                            }
                        }}
                    />
                    {isNew && (
                        <>
                            <span>X</span>
                            <input
                                type="number"
                                name={`a_${counter}_amount`}
                                min="1"
                                max="99"
                                steps="1"
                                ref={reg}
                                className="form-control"
                            />
                        </>
                    )}
                </div>
                <div>
                    <select
                        className="custom-select cages"
                        name={`a_${counter}_${isNew ? 'new' : 'old'}_cage`}
                        ref={reg}
                        value={cage}
                        defaultValue={values.cage_id}
                        onChange={ev => setCage(ev.target.value)}
                    >
                        {_.isArray(cages) &&
                            cages.map(
                                // Sort cages based on species id
                                cage => {
                                    return !speciesId || cage.speciesIds.includes(speciesId) ? (
                                        <option key={cage.id + '1640196195629'} value={cage.id}>
                                            {cage.number + ' - ' + cage.name}
                                        </option>
                                    ) : null;
                                }
                            )}
                    </select>
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(counter, isNew)}>
                        &times;
                    </button>
                </div>
            </div>
            {edit && (
                <div className="checkboxes">
                    <div className="checkbox">
                        <input
                            id="nails"
                            name={`a_${counter}_${isNew ? 'new' : 'old'}_nails`}
                            type="checkbox"
                            ref={reg}
                            value="1"
                            checked={nails == 1 ? true : false}
                            onChange={() => setNails(nails == 1 ? 0 : 1)}
                        />
                        <label htmlFor="nails">Nagels</label>
                    </div>
                    <div className="checkbox">
                        <input
                            id="medic"
                            name={`a_${counter}_${isNew ? 'new' : 'old'}_medic`}
                            type="checkbox"
                            ref={reg}
                            value="1"
                            checked={medication == 1 ? true : false}
                            onChange={() => setMedication(medication == 1 ? 0 : 1)}
                        />
                        <label htmlFor="medic">Medicatie</label>
                    </div>
                </div>
            )}
            <datalist id={'dl' + counter + n}>
                {_.isArray(data) &&
                    data.map(d =>
                        _.isEmpty(where) || d[where[0]] == where[1] ? (
                            <option key={d.id + '1601296221962'} data-value={d.id} value={d.name}>
                                {d.species_name}
                            </option>
                        ) : null
                    )}
            </datalist>
            <input type="hidden" name={isNew ? `a_${counter}_species` : `a_${counter}_id`} value={datalistValue} ref={reg} />
            <p>Geselecteerd: {name}</p>
            {!isNew && <p>Soort: {speciesName}</p>}
            {isNew ? (
                <>
                    {errors[`a_${counter}_species`] && <p className="warning">{errors[`a_${counter}_species`]?.message}</p>}
                    {errors[`a_${counter}_amount`] && <p className="warning">{errors[`a_${counter}_amount`]?.message}</p>}
                </>
            ) : (
                errors[`a_${counter}_id`] && <p className="warning">{errors[`a_${counter}_id`]?.message}</p>
            )}
        </div>
    );
}

/**
 * Checkboxes
 * Generates a series of checkboxes
 *
 * @param {object} blueprint Object containing data
 * 		@property {string} checkboxesLink API link to get data
 * @param {function} reg Required for Hook Form
 * @return {React} \<div> with label, file input and error
 */
export function Checkboxes({ blueprint: bp, reg }) {
    const [data, setData] = useState(null);

    // Load data
    useEffect(() => {
        // This unmounted stuff is needed to prevent an error
        let isMounted = true;
        const getData = async () => await axios(bp.checkboxesLink);
        getData().then(results => {
            if (isMounted) setData(results.data);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="input-container">
            <label>{bp.display}</label>
            <div className="checkboxes">
                {_.isArray(data) &&
                    data.map(d => (
                        <div className="checkbox" key={d.id + '1601290254107'}>
                            <input id={d.name + d.id} name={bp.checkboxesName + '_' + d.id} type="checkbox" value="1" ref={reg} />
                            <label htmlFor={d.name + d.id}>{d.name}</label>
                        </div>
                    ))}
            </div>
        </div>
    );
}
