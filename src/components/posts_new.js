import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) {

        const { meta: { touched, error }} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        //The following code (...field.input) is a JSX way to
        //say something like "onChange={field.input.onChange},
        //onBlur={field.input.onBlur}, etc etc etc
        return (
            <div className={className}>
                <label>{field.labelContent}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        //Redirect

        this.props.createPost(values, () => {
            console.log('hello');
            this.props.history.push('/');
        });
    }

    render() {

        const { handleSubmit } = this.props;


        //labelContent puede llamarse de cualquier forma, es un parametro inventado
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new post</h3>
                <Field
                labelContent="Title for Post"
                name="title"
                component={this.renderField}
                label="title"
                />
                <Field
                    labelContent="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    labelContent="Post Content"
                    name="content"
                    component={this.renderField}
                />


                <button className="btn btn-primary" type="submit">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>

            </form>
        );
    }
}


function validate(values) {
    //console.log(values) => { title: 'dasds, categories: 'radsg', content: 'gfdsgd' }

    const errors = {};

    //validate the inputs from 'values'
    if(!values.title) {
        errors.title = "Ingresa un titulo!!";
    }

    if(values.title  && values.title.length < 3) {
        errors.title = "El titulo debe tener por lo menos 4 caracteres!"
    }

    if(!values.categories) {
        errors.categories = "Ingresa una categoría!";
    }

    if (!values.content) {
        errors.content = "Ingresa algún contenido!";
    }


    //If errors is empty, the form is fine to submit
    //If errors has *any* properties, redux form assumes form is invalid

    return errors;
}


//validate: validate
//validate function always will be called when someone submit the form
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    //multiple connects (one for the get, another one for the post)
    connect(null, { createPost })(PostsNew)
);