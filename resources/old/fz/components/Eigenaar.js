import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import Request from './Request';
import Search from './Search';
import LGTool from './LGTool';
import { SingleRow, RouteComponent, SingleEntry, FormInput } from './MinorComponents';

/*
  + EigenaarForm contains a Formik form, because of ease of use
  = Props:
		* refreshData={function}
    ? Function called when the user has uploaded/updated an eigenaar, meant to refresh the eigenaren data
    * values={object}
    ? Object of default values in the form, used for setting up editing/clearing the form
    * submitType={string}
    ? String to let this component know wether to update or insert in database
    * resetForm={function}
    ? Function called when the user has pressed reset
    * hideForm={function}
    ? Function called when the user has edited an user
*/
class EigenaarForm extends React.Component {
  inputs = [
    { name: 'Naam', uName: 'naam', required: true, as: 'input' },
    { name: 'Email', uName: 'email', required: true, as: 'input' },
    { name: 'Telefoon 1', uName: 'telefoon_1', required: false, as: 'input' },
    { name: 'Telefoon 2', uName: 'telefoon_2', required: false, as: 'input' },
    { name: 'Telefoon 3', uName: 'telefoon_3', required: false, as: 'input' },
    { name: 'Extra Informatie', uName: 'extra_informatie', required: false, as: 'textarea' }
  ];
  render() {
    const { values, submitType, refreshData, hideForm, resetForm, alert } = this.props;
    return (
      <Formik
        enableReinitialize={true}
        initialValues={values}
        validationSchema={Yup.object({
          naam: Yup.string()
            .max(50, 'Moet 50 karakters of minder zijn')
            .required('Verplicht'),
          email: Yup.string()
            .max(64, 'Moet 64 karakters of minder zijn')
            .email('Ongeldig email adres')
            .required('Verplicht'),
          telefoon_1: Yup.string().max(15, 'Moet 15 karakters of minder zijn'),
          telefoon_2: Yup.string().max(15, 'Moet 15 karakters of minder zijn'),
          telefoon_3: Yup.string().max(15, 'Moet 15 karakters of minder zijn'),
          extra_informatie: Yup.string().max(10000, 'Moet 10000 karakters of minder zijn')
        })}
        onSubmit={(values, { resetForm }) => {
          const func = submitType === 'Post' ? 'create_eigenaar' : 'update_eigenaar';
          // Update/Create eigenaar data
          Request.post(func, values)
            .then(response => alert(response))
            .finally(() => {
              refreshData();
              // Both resets are needed
              resetForm();
              this.props.resetForm();
              if (submitType !== 'Post') hideForm();
            });
        }}
      >
        <Form className="regular-form" id="form">
          {// Create an ID field just to show which entry is being edited
          values.id ? (
            <div className="form-group">
              <label>ID</label>
              <Field className="form-control input-id" name="id" disabled />
            </div>
          ) : null}
          {this.inputs.map(i => (
            <FormInput data={i} key={i.uName} />
          ))}
          <button type="submit" className="btn btn-primary">
            {submitType}
          </button>
          {/* resetForm is needed for resetting the form when it has values from the user pressing edit */}
          <button type="reset" className="btn btn-outline-primary" onClick={resetForm}>
            Reset formulier
          </button>
        </Form>
      </Formik>
    );
  }
}
// Eigenaren contains a table of all eigenaren, and a form for creating/editing
class Eigenaren extends React.Component {
  // Initial values used on start and reset
  initialValues = {
    id: 0,
    naam: '',
    email: '',
    telefoon_1: '',
    telefoon_2: '',
    telefoon_3: '',
    extra_informatie: ''
  };
  state = {
    formActive: false,
    eigenaren: null, //? Array of object containing eigenaar information
    submitType: 'Post', //? String determening the submit method, can be 'Post', anything else equals to updating
    values: this.initialValues, //? Object holding initial values of the form
    searchQuery: '',
    searchOption: 'id',
    searchDir: 'DESC'
  };
  componentDidMount() {
    this.getData();
  }
  deleteEigenaar = id => {
    // Prevent deleting eigenaar 0
    if (id === '0')
      this.props.alert({
        error: 1,
        message: 'Dit kan niet verwijderd worden.'
      });
    else
      Request.post('delete_eigenaar', { id: id }).then(response => {
        this.props.alert(response);
        this.getData();
      });
  };
  getData = () => {
    Request.post('get_eigenaren', {}).then(response => {
      if (!response.error) this.setState({ eigenaren: response.results });
      else this.props.alert(response);
    });
  };
  prepareUpdate = eigenaar => {
    this.setState({
      submitType: 'Update',
      formActive: true,
      values: eigenaar
    });
    window.scrollTo(0, 0);
  };
  // Needed if resetting the form while it has data from editing
  resetForm = () => {
    this.setState({
      submitType: 'Post',
      values: this.initialValues
    });
  };
  // Set state based on Search component results
  setSearchState = searchState => {
    this.setState({
      searchQuery: searchState.query,
      searchOption: searchState.option,
      searchDir: searchState.dir
    });
  };

  render() {
    let { searchQuery, searchDir, searchOption, eigenaren, values, submitType, formActive } = this.state;
    let { alert } = this.props;
    const columns = [
      { size: 's', uName: 'id', special: false },
      { size: 'l', uName: 'naam', special: false },
      { size: 'l', uName: 'email', special: false },
      { size: 'm', uName: 'telefoon_1', special: false },
      { size: 'm', uName: 'telefoon_2', special: false },
      { size: 'm', uName: 'telefoon_3', special: false }
    ];
    if (eigenaren) var temp = LGTool.sort(eigenaren, searchQuery, searchOption, searchDir);
    return (
      <div>
        <button className="btn btn-primary" onClick={() => this.setState({ formActive: !formActive })}>
          {formActive ? 'Verberg formulier' : 'Open formulier'}
        </button>
        {formActive && (
          <EigenaarForm
            refreshData={this.getData}
            alert={alert}
            values={values}
            submitType={submitType}
            resetForm={this.resetForm}
            hideForm={() => this.setState({ formActive: false })}
          />
        )}
        <Search
          search={this.setSearchState}
          options={[
            { name: 'Naam', uName: 'naam' },
            { name: 'ID', uName: 'id' }
          ]}
        />
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              <th className="td-s">ID</th>
              <th className="td-l">Naam</th>
              <th className="td-l">Email</th>
              <th className="td-m">Telefoon 1</th>
              <th className="td-m">Telefoon 2</th>
              <th className="td-m">Telefoon 3</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {temp &&
              temp.map(e => (
                <SingleRow
                  key={e.id}
                  entry={e}
                  prepareUpdate={e => this.prepareUpdate(e)}
                  deleteEntry={e => this.deleteEigenaar(e)}
                  columns={columns}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
// Final component
export default ({ alert }) => {
  const { path, url } = useRouteMatch();
  const rows = [
    { name: 'ID', uName: 'id', special: false },
    { name: 'Naam', uName: 'naam', special: false },
    { name: 'Email', uName: 'email', special: false },
    { name: 'Telefoon 1', uName: 'telefoon_1', special: false },
    { name: 'Telefoon 2', uName: 'telefoon_2', special: false },
    { name: 'Telefoon 3', uName: 'telefoon_3', special: false },
    { name: 'Extra informatie', uName: 'extra_informatie', special: false }
  ];
  return (
    <RouteComponent name="Eigenaren">
      <h1>Eigenaren</h1>
      <Switch>
        <Route
          path={`${path}/:id(\\d+)`}
          render={({ match }) => (
            <SingleEntry alert={alert} match={match} url={url} functionName="get_eigenaar" rows={rows} />
          )}
        />
        <Route path={path}>
          <Eigenaren alert={alert} />
        </Route>
      </Switch>
    </RouteComponent>
  );
};
