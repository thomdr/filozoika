import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Custom form for animals
 * @param {object} config Object containing config data
 * @param {function} alert Alert function
 * @param {match} match react-router-dom magic, used to get ID from url
 * @param {array} blueprint Array containing information about inputs to construct
 * @param {resolver} resolver Resolver validation schema
 */
export default function Edit({ config, alert, match, blueprint, resolver }) {
    const [_data, _setData] = useState({});
    const { register, handleSubmit, errors, reset } = useForm({ resolver });
    const [images, setImages] = useState({});

    useEffect(() => {
        // isMounted stuff to prevent an error
        let isMounted = true;
        const getData = async () => await axios(config.api + '/' + match.params.id + '/edit');
        getData().then(({ data }) => {
            if (isMounted) {
                // Removes images from data because it would otherwise crash
                blueprint.map(print => {
                    if (print.input && print.input.name === 'File' && data.hasOwnProperty(print.name)) {
                        let i = images;
                        i[print.name] = data[print.name];
                        setImages(i);
                        delete data[print.name];
                    }
                });
                _setData(data);
                reset(data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [reset]);

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
        // axios.put does NOT work with multipart/form-data, hence this!
        formData.append('_method', 'PUT');
        // Put data
        axios
            .post(config.api + '/' + match.params.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => alert('Bewerkt', false))
            .catch(() => alert('Error tijdens het bewerken', true));
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="regular-form">
                <div className="backgrounds">
                    {blueprint.map(print =>
                        print.input ? (
                            <print.input
                                key={print.name + '1601287319627' + config.display}
                                blueprint={print}
                                reg={register}
                                error={errors[print.name]}
                                img={images[print.name]}
                                values={_data}
                            />
                        ) : null
                    )}
                </div>
                <input type="submit" className="btn btn-primary" value="Bewerken" />
            </form>
        </div>
    );
}
