import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import Request from './Request';
import Search from './Search';
import Tool from './Tool';
import { SingleEntry, RouteComponent, SingleRow, FormInput } from './MinorComponents';

/*
  + DierForm contains a Formik form, because of ease of use
  = Props:
		* refreshData={function}
    ? Function called when the user has uploaded/updated a dier, meant to refresh the dier data
    * values={object}
    ? Object of default values in the form, used for setting up editing/clearing the form
    * submitType={string}
    ? String to let this component know wether to update or insert in database
    * resetForm={function}
    ? Function called when the user has pressed reset
    * hideForm={function}
    ? Function called when the user has edited an user
*/
class DierForm extends React.Component {
    state = {
        inputs: null
    };

    formData = new FormData();

    handleFile = ev => this.formData.append(ev.target.name, ev.target.files[0]);

    handleCheckbox = ev => this.formData.set(ev.target.name, ev.target.checked);

    componentDidMount() {
        // Give option 8 the entire list of all eigenaren
        Request.post('get_eigenaren', {}).then(response => {
            if (!response.error)
                this.setState({
                    inputs: [
                        { name: 'Naam', uName: 'naam', required: true, as: 'input' },
                        { name: 'Soort', uName: 'soort', required: true, as: 'input' },
                        {
                            name: 'Geslacht',
                            uName: 'geslacht',
                            required: false,
                            as: 'select',
                            options: (
                                <>
                                    <option value="Man" key="man">
                                        Man
                                    </option>
                                    <option value="Vrouw" key="vrouw">
                                        Vrouw
                                    </option>
                                </>
                            )
                        },
                        { name: 'Geboorte datum', uName: 'geboorte_datum', required: true, as: 'input' },
                        { name: 'Dierenarts', uName: 'dierenarts', required: true, as: 'input' },
                        { name: 'Eigen voer', uName: 'eigen_voer', required: false, as: 'checkbox' },
                        { name: 'Voedings hoeveelheid', uName: 'voedings_hoeveelheid', required: true, as: 'input' },
                        {
                            name: 'Eigenaar',
                            uName: 'eigenaar_id',
                            required: true,
                            as: 'select',
                            options: (
                                <>
                                    {response.results.reverse().map((e, i) => (
                                        <option value={e.id} key={e.naam + i}>
                                            {e.naam}
                                        </option>
                                    ))}
                                </>
                            )
                        },
                        // For files, uName is the name of the folder they need to go to
                        { name: 'Foto', uName: 'dierfoto', required: false, as: 'file' },
                        { name: 'Paspoort', uName: 'paspoort', required: false, as: 'file' },
                        { name: 'Actief', uName: 'actief', required: false, as: 'checkbox' },
                        { name: 'Extra Informatie', uName: 'extra_informatie', required: false, as: 'textarea' }
                    ]
                });
            else this.props.alert(response);
        });
    }

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
                    soort: Yup.string()
                        .max(50, 'Moet 50 karakters of minder zijn')
                        .required('Verplicht'),
                    geboorte_datum: Yup.string()
                        .max(50, 'Moet 50 karakters of minder zijn')
                        .required('Verplicht'),
                    dierenarts: Yup.string()
                        .max(50, 'Moet 50 karakters of minder zijn')
                        .required('Verplicht'),
                    voedings_hoeveelheid: Yup.string()
                        .max(100, 'Moet 100 karakters of minder zijn')
                        .required('Verplicht'),
                    extra_informatie: Yup.string().max(10000, 'Moet 10000 karakters of minder zijn')
                })}
                onSubmit={(values, { resetForm }) => {
                    this.formData.set('functionName', submitType === 'Post' ? 'create_dier' : 'update_dier');
                    // Set custom FormData because of image uploading
                    for (const key in values) {
                        // Dumbass if statement because this for loop tries to overwrite checkbox values
                        if (key === 'eigen_voer' || key === 'actief') if (this.formData.get(key) === 'true') continue;
                        this.formData.set(key, values[key]);
                    }
                    // Update/Create dier data
                    Request.postFile(this.formData)
                        .then(response => {
                            console.log(response);
                            alert(response);
                        })
                        .finally(() => {
                            refreshData();
                            // Both resets are needed
                            resetForm();
                            this.props.resetForm();
                            if (submitType !== 'Post') hideForm();
                        });
                    this.formData = new FormData();
                }}
            >
                <Form className="regular-form">
                    {// Create an ID field just to show which entry is being edited
                    values.id ? (
                        <div className="form-group">
                            <label>ID</label>
                            <Field className="form-control input-id" name="id" disabled />
                        </div>
                    ) : null}
                    {this.state.inputs &&
                        this.state.inputs.map(i => (
                            <FormInput
                                data={i}
                                key={i.uName}
                                onFileChange={this.handleFile}
                                alert={alert}
                                onCheckboxChange={this.handleCheckbox}
                            />
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
// Dieren contains a table of all dieren, and a form for creating/editing
class Dieren extends React.Component {
    // Initial values used on start and reset
    initialValues = {
        id: 0,
        naam: '',
        soort: '',
        geslacht: 'Man',
        geboorte_datum: '',
        dierenarts: '',
        eigen_voer: false,
        voedings_hoeveelheid: '',
        eigenaar_id: 0,
        actief: false,
        extra_informatie: ''
    };
    state = {
        formActive: false,
        dieren: null, //? Array of object containing dier information
        submitType: 'Post', //? String determening the submit method, can be 'Post', anything else equals to updating
        values: this.initialValues, //? Object holding initial values of the form
        searchQuery: '',
        searchOption: 'id',
        searchDir: 'DESC'
    };
    componentDidMount() {
        this.getData();
    }
    deleteDier = id => {
        Request.post('delete_dier', { id: id }).then(response => {
            this.props.alert(response);
            this.getData();
        });
    };
    getData = () => {
        Request.post('get_dieren', {}).then(response => {
            if (!response.error) this.setState({ dieren: response.results });
            else this.props.alert(response);
        });
    };
    prepareUpdate = dier => {
        this.setState({
            submitType: 'Update',
            formActive: true,
            values: dier
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
        let { searchQuery, searchDir, searchOption, dieren, values, submitType, formActive } = this.state;
        let { alert } = this.props;
        const columns = [
            { size: 's', uName: 'id', special: false },
            { size: 'm', uName: 'naam', special: false },
            { size: 'm', uName: 'soort', special: false },
            { size: 's', uName: 'geslacht', special: false },
            { size: 'l', uName: 'eigenaar_naam', special: 'linkToEigenaar' },
            { size: 'm', uName: 'eigen_voer', special: 'yesOrNo' },
            { size: 'm', uName: 'voedings_hoeveelheid', special: false },
            { size: 's', uName: 'actief', special: 'yesOrNo' }
        ];
        if (dieren) var temp = Tool.sort(dieren, searchQuery, searchOption, searchDir);
        return (
            <div>
                <button className="btn btn-primary" onClick={() => this.setState({ formActive: !formActive })}>
                    {formActive ? 'Verberg formulier' : 'Open formulier'}
                </button>
                {formActive && (
                    <DierForm
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
                            <th className="td-m">Naam</th>
                            <th className="td-m">Soort</th>
                            <th className="td-s">Geslacht</th>
                            <th className="td-l">Eigenaar</th>
                            <th className="td-m">Eigen voer</th>
                            <th className="td-m">Hoeveelheid</th>
                            <th className="td-s">Actief</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {temp &&
                            temp.map(d => (
                                <SingleRow
                                    key={d.id}
                                    entry={d}
                                    prepareUpdate={e => this.prepareUpdate(e)}
                                    deleteEntry={e => this.deleteDier(e)}
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
        { name: 'Soort', uName: 'soort', special: false },
        { name: 'Geboorte datum', uName: 'geboorte_datum', special: false },
        { name: 'Dierenarts', uName: 'dierenarts', special: false },
        { name: 'Eigen voer', uName: 'eigen_voer', special: 'yesOrNo' },
        { name: 'Voedings hoeveelheid', uName: 'voedings_hoeveelheid', special: false },
        { name: 'Eigenaar', uName: 'eigenaar_naam', special: 'linkToEigenaar' },
        { name: 'Foto', uName: 'dierfoto', special: 'image' },
        { name: 'Paspoort', uName: 'paspoort', special: 'image' },
        { name: 'Actief', uName: 'actief', special: 'yesOrNo' },
        { name: 'Extra informatie', uName: 'extra_informatie', special: 'html' }
    ];
    return (
        <RouteComponent name="Dieren">
            <h1>Dieren</h1>
            <Switch>
                <Route
                    path={`${path}/:id(\\d+)`}
                    render={({ match }) => <SingleEntry alert={alert} match={match} url={url} functionName="get_dier" rows={rows} />}
                />
                <Route path={path}>
                    <Dieren alert={alert} />
                </Route>
            </Switch>
        </RouteComponent>
    );
};
