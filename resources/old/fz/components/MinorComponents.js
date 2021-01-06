import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Link, useRouteMatch } from 'react-router-dom';
import Request from './Request';
import config from '../config.json';

export function RouteComponent({ name, children }) {
  document.title = `${name} | Filozoika Paneel`;
  return <div className="container">{children}</div>;
}
/*
  + Table data element
  = Parameters:
		* className
    ? class name for <td> element
    * entry
    ? Object containing the information to display
    * bp (blueprint)
    ? Object containing the information of what to display and how
*/
function getTD(className, entry, bp) {
  switch (bp.special) {
    case false:
      return <td className={className}>{entry[bp.uName]}</td>;
    case 'yesOrNo':
      return (
        <td className={className}>
          {entry[bp.uName] === '1' ? (
            <span className="text-success">Ja</span>
          ) : (
            <span className="text-danger">Nee</span>
          )}
        </td>
      );
    case 'html':
      return <td className={className} dangerouslySetInnerHTML={{ __html: entry[bp.uName] }}></td>;
    case 'image':
      if (entry[bp.uName] === '') return <td>Geen foto</td>;
      return (
        <td>
          <img src={entry[bp.uName] /*eslint-disable-line*/} />
        </td>
      );
    case 'linkToEigenaar':
      return (
        <td className={className}>
          <Link to={'../eigenaren/' + entry.eigenaar_id}>{entry.e_naam}</Link>
        </td>
      );
    default:
      return <td>Improper special property!</td>;
  }
}
/*
  + Single table row to display data
  = Props:
		* entry={object}
    ? Object containing data
    * prepareUpdate(), deleteEntry()
    ? Functions triggered on edit and delete
    * columns=[{object}]
    ? Array containing objects with data to display columns
*/
export function SingleRow({ entry, prepareUpdate, deleteEntry, columns }) {
  const { path } = useRouteMatch();
  return (
    <tr>
      <td className="td-s">
        <Link to={path + '/' + entry.id}>
          <button className="btn btn-outline-info">Bekijk</button>
        </Link>
      </td>
      {columns.map((c, i) => (
        <React.Fragment key={c.uName + i}>{getTD('td-' + c.size, entry, c)}</React.Fragment>
      ))}
      <td className="buttons">
        <button className="btn btn-outline-primary" onClick={() => prepareUpdate(entry)}>
          Bewerk
        </button>
        <button
          className="btn btn-outline-danger warning-trigger"
          onClick={() => {
            window.confirm('Weet je zeker dat je deze actie wil uitvoeren?') && deleteEntry(entry.id);
          }}
        >
          Verwijder
        </button>
      </td>
    </tr>
  );
}
/*
  + Single table to display data
  = Props:
		* rows=[{object}]
    ? Array of objects containing information to create elements
    * url
    ? Url of page to go back to
*/
export class SingleEntry extends React.Component {
  state = {
    entry: null, //? JSX results of axios
    id: this.props.match.params.id, //? ID obtained from the url
    error: null //? Optional JSX error
  };
  componentDidMount() {
    Request.post(this.props.functionName, { id: this.state.id }).then(response => {
      if (!response.error) this.setState({ entry: response.results });
      else this.setState({ entry: null, error: <p>{response.message}</p> });
    });
  }
  render() {
    const { entry, error } = this.state;
    const { rows, url } = this.props;
    return (
      <>
        <Link to={url} className="btn btn-outline-primary go-back">
          Terug naar overzicht
        </Link>
        {error}
        <table className="display-table">
          {entry && (
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.name + i}>
                  <th>{r.name}</th>
                  {getTD('', entry, r)}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </>
    );
  }
}
/*
  + Single input field based on 'as' property
  = Props:
    * data
    ? Object containing data. Yeah.
    * onFileChange
    ? Function triggered when file is uploaded
*/
export function FormInput({ data, onFileChange, alert, onCheckboxChange }) {
  const { name, required, as, uName } = data;
  const [url, setUrl] = useState(config.mediaRoot + '/placeholder.png');
  const label = (
    <label htmlFor={uName}>
      {name} {required && <span>Verplicht</span>}
    </label>
  );
  const error = (
    <p className="warning">
      <ErrorMessage name={uName} />
    </p>
  );
  let input;
  switch (as) {
    case 'select':
      input = (
        <>
          {label}
          <Field as={as} className="form-control" name={uName} id={uName}>
            {data.options}
          </Field>
          {error}
        </>
      );
      break;
    // For files, uName is the name of the folder they need to go to
    case 'file':
      input = (
        <>
          <label htmlFor={uName} className="upload">
            {name}
          </label>
          <label htmlFor={uName} className="btn btn-outline-info">
            Selecteer bestand
          </label>
          <input
            id={uName}
            name={uName}
            type="file"
            className="hidden"
            onChange={ev => {
              const file = ev.target.files[0];
              if (file.type === 'image/jpeg' || file.type === 'image/png') {
                onFileChange(ev);
                setUrl(URL.createObjectURL(file));
              } else {
                alert({
                  message: 'Ongeldig bestand',
                  error: 1
                });
              }
            }}
          />
          <img src={url} alt="Upload afbeelding" className="preview-img" />
        </>
      );
      break;
    case 'checkbox':
      input = (
        <>
          {label}
          <input type="checkbox" id={uName} name={uName} className="checkbox" onChange={ev => onCheckboxChange(ev)} />
        </>
      );
      break;
    default:
      input = (
        <>
          {label}
          <Field as={as} className="form-control" name={uName} id={uName} />
          {error}
        </>
      );
      break;
  }
  return (
    <div className="form-group" key={name}>
      {input}
    </div>
  );
}
