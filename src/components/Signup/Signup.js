import React from 'react';
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validate from "./config";
import defaultVals from "./config";

function Signup() {
    return (
        <div className="form">
            <h1>Sign up</h1>
            <Formik
                onSubmit={() => {console.log("Submitting...")} }
                validateOnMount={true}
                initialValues={defaultVals}
                validate={validate}
            >
                <Form>
                    <Field type="email" name="email"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="username" name="username"/>
                    <ErrorMessage name="password" component="div"/>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                    <Field type="verifyPassword" name="verifyPassword"/>
                    <ErrorMessage name="verifyPassword" component="div"/>
                    <button type="submit">Sign up</button>
                </Form>    
            </ Formik>
        </div>
    )
}

export default Signup
