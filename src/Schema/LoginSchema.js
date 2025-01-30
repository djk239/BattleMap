import * as yup from 'yup';

// Schema for login form. Both a username and password must be provided.

export const loginSchema = yup.object().shape({        
    email: yup.string().email("Please enter a valid email").required("Email is required"),  
    password: yup
    .string()
    .required("Password is required"),
});  