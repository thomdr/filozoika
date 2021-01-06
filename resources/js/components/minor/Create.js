import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Custom form
 * @param {object} config Object containing config data
 * @param {array} blueprint Array containing information about inputs to construct
 * @param {resolver} resolver Resolver validation schema
 * @param {function} alert Alert function
 */
export default function Create({ config, alert, blueprint, resolver }) {
    const form = useRef(null);
    const { register, handleSubmit, errors } = useForm({ resolver });

    const onSubmit = data => {
        const formData = new FormData();
        // Insert data into FormData, so images can be uploaded
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'object') {
                    // Files
                    if (data[key][0]?.type === 'image/png' || data[key][0]?.type === 'image/jpeg') {
                        formData.append(key, data[key][0]);
                    } else {
                        formData.append(key, 'undefined');
                    }
                } else if (data[key] === true || data[key] === false) {
                    // Booleans
                    formData.append(key, data[key] ? 1 : 0);
                } else {
                    // Anything else
                    formData.append(key, data[key]);
                }
            }
        }
        // Post data
        axios
            .post(config.api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                alert('Aangemaakt', false);
                form.current.reset();
            })
            .catch(() => alert('Error tijdens het aanmaken', true));
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="regular-form" ref={form}>
                <div className="backgrounds">
                    {blueprint.map(print =>
                        print.input ? (
                            <print.input
                                key={print.name + '1601287343867' + config.display}
                                blueprint={print}
                                reg={register}
                                error={errors[print.name]}
                            />
                        ) : null
                    )}
                </div>
                <input type="submit" className="btn btn-primary" value="Aanmaken" />
            </form>
        </div>
    );
}
