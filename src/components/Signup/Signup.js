import React from 'react';
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {

const defaultValues = {
    email: "",
    password: "",
    userName: "",
    verifyPassword: ""
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required").min(6, "must be at least six characters"),
    userName: Yup.string().required("Required").matches(/^\S*$/, "Spaces not allowed").min(5, "must be at least six characters"),
    verifyPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords do not match")
});

const [errorInServer, setErrorInServer] = useState("");

    return (
        <div className="auth-form">
            <h1>Sign up</h1>
            <Formik
                onSubmit={() => { console.log("Submitting...") } }
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
            >
                {({ isValid, isSubmitting }) => (
                   <Form>
                        <label>
                            Username
                            <Field className="form-control" type="text" name="userName"/>
                            <ErrorMessage className="error" name="userName" component="div"/>
                        </label>
                        <label>
                            Email
                            <Field className="form-control" type="email" name="email"/>
                            <ErrorMessage className="error" name="email" component="div"/>
                        </label>
                        <label>
                            Password
                            <Field className="form-control" type="password" name="password"/>
                            <ErrorMessage className="error" name="password" component="div"/>
                        </label>                    
                        <label>
                            Re-type password
                            <Field className="form-control" type="verifyPassword" name="verifyPassword"/>
                            <ErrorMessage className="error" name="verifyPassword" component="div"/>
                        </label>
                        <Link to="/login">
                        <div className="auth-link-container auth-link">
                            Have an account already?
                        </div>
                        </Link>
                        
                        <button disabled={isSubmitting === true || isValid === false} type="submit">Sign up</button>
                    </Form> 
                )}
            </ Formik>

        {errorInServer && <div className="error">{errorInServer}</div>}
        </div>
    )
};

export default Signup;
