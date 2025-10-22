
import validations from "src/utils/validation";
import * as yup from "yup";


export const subAdminValidation = yup.object().shape({

    name: yup.string().required("This field is required").matches(validations.alpha_numeric, "Only alpha-numeric values are allowed"),
    email: yup.string().required("This field is required").matches(validations.email, "Enter a valid email"),
    password: yup.string().required("This field is required").max(15,"Value should be max 15 digits"),
    address: yup.string().required("This field is required"),
    country_code: yup.string().required("This field is required").max(3,"Value should be max 3 digits"),
    mobile_number: yup.string().required("This field is required").matches(validations.indian_phone_number, "Enter a valid phone number").max(10,"Enter a valid phone number"),
  
  
});

