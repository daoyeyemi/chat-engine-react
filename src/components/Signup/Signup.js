import React from 'react';
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Signup() {
    return (
        <div className="form">
            <h1>Sign up</h1>
            <Formik>
                <Form>
                    <Field type="email" name="email"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                    <button type="submit">Sign up</button>
                </Form>    
            </ Formik>
        </div>
    )
}

export default Signup
