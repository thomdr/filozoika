import React from 'react';

/**
 * Dismissable alert box
 * @param {bool} type Type of alert
 * @param {string} Children Text of alert
 * @param {function} closeAlert Close the alert box
 */
export default function Alert({ isError, children, closeAlert }) {
    return (
        <div className={'alert alert-dismissible alert-' + (isError ? 'danger' : 'success')}>
            <p>{children}</p>
            <button type="button" className="close" onClick={closeAlert}>
                <span>&times;</span>
            </button>
        </div>
    );
}
