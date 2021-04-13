import React from 'react'
import "../../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
    
    const defaultValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required")
    });

    return (
        <div className="auth-form">
            <h1>Login</h1>
            <Formik
                    // onSubmit={}
                    validateOnMount={true}
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
            >
                <Form>
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
                </Form>
                
            </Formik>
        </div>
        
    )
}

export default Login
