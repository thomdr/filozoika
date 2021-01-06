import React from 'react';

/**
 * Input field
 * @param {string} name Name for JS
 * @param {function} reg Required for Hook Form
 * @param {object} error Objecth holding potential errors
 * @param {string} display Display name for users to see
 * @param {bool} disabled Bool to toggle disabled attribute
 * @return {React} \<div> with label, input and error
 */
export function InputText({ name, reg, error, display, disabled }) {
    return (
        <div className="input-container">
            <label htmlFor={name}>{display}</label>
            <input id={name} className="form-control" type="text" name={name} ref={reg} disabled={disabled} />
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}

/**
 * Textarea
 * @param {string} name Name for JS
 * @param {function} reg Required for Hook Form
 * @param {object} error Objecth holding potential errors
 * @param {string} display Display name for users to see
 * @return {React} \<div> with label, textarea and error
 */
export function Textarea({ name, reg, error, display }) {
    return (
        <div className="input-container">
            <label htmlFor={name}>{display}</label>
            <textarea className="form-control" id={name} name={name} ref={reg}></textarea>
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}

/**
 * Checkbox
 * @param {string} name Name for JS
 * @param {function} reg Required for Hook Form
 * @param {object} error Objecth holding potential errors
 * @param {string} display Display name for users to see
 * @param {bool} checked Display name for users to see
 * @return {React} \<div> with label, textarea and error
 */
export function InputCheckbox({ name, reg, error, display, checked }) {
    return (
        <div className="input-container">
            <label htmlFor={name}>{display}</label>
            <input id={name} className="form-check" type="checkbox" name={name} ref={reg} checked={checked} />
            <span></span>
            {error && <p className="warning">{error?.message}</p>}
        </div>
    );
}
