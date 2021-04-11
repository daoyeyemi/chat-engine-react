import Yup from "yup";

export const defaultVals = {
    email: "",
    password: "",
    userName: "",
    verifyPassword: ""
};

export const validate = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required").min(6, "must be at least six characters"),
    userName: Yup.string().required("Required").matches(/^\S*$/, "Spaces not allowed").min(5, "must be at least six characters"),
    verifyPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords do not match")
});