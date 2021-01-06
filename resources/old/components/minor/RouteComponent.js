import React from 'react';

export default function RouteComponent({ name, children }) {
    document.title = `${name} | Filozoika Paneel`;
    return <>{children}</>;
}

// /*
// 	+ Single input field based on 'as' property
// 	= Props:
// 		* data
// 		? Object containing data. Yeah.
// 		* onFileChange
// 		? Function triggered when file is uploaded
// */
// export function FormInput({ data, onFileChange, alert, onCheckboxChange }) {
//     const { name, required, as, uName } = data;
//     const [url, setUrl] = useState(config.mediaRoot + '/placeholder.png');
//     const label = (
//         <label htmlFor={uName}>
//             {name} {required && <span>Verplicht</span>}
//         </label>
//     );
//     const error = (
//         <p className="warning">
//             <ErrorMessage name={uName} />
//         </p>
//     );
//     let input;
//     switch (as) {
//         case 'select':
//             input = (
//                 <>
//                     {label}
//                     <Field as={as} className="form-control" name={uName} id={uName}>
//                         {data.options}
//                     </Field>
//                     {error}
//                 </>
//             );
//             break;
//         // For files, uName is the name of the folder they need to go to
//         case 'file':
//             input = (
//                 <>
//                     <label htmlFor={uName} className="upload">
//                         {name}
//                     </label>
//                     <label htmlFor={uName} className="btn btn-outline-info">
//                         Selecteer bestand
//                     </label>
//                     <input
//                         id={uName}
//                         name={uName}
//                         type="file"
//                         className="hidden"
//                         onChange={ev => {
//                             const file = ev.target.files[0];
//                             if (file.type === 'image/jpeg' || file.type === 'image/png') {
//                                 onFileChange(ev);
//                                 setUrl(URL.createObjectURL(file));
//                             } else {
//                                 alert({
//                                     message: 'Ongeldig bestand',
//                                     error: 1
//                                 });
//                             }
//                         }}
//                     />
//                     <img src={url} alt="Upload afbeelding" className="preview-img" />
//                 </>
//             );
//             break;
//         case 'checkbox':
//             input = (
//                 <>
//                     {label}
//                     <input type="checkbox" id={uName} name={uName} className="checkbox" onChange={ev => onCheckboxChange(ev)} />
//                 </>
//             );
//             break;
//         default:
//             input = (
//                 <>
//                     {label}
//                     <Field as={as} className="form-control" name={uName} id={uName} />
//                     {error}
//                 </>
//             );
//             break;
//     }
//     return (
//         <div className="form-group" key={name}>
//             {input}
//         </div>
//     );
// }
