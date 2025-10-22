
import validations from "src/utils/validation";
import * as yup from "yup";


export const taxValidation = yup.object().shape({

    category: yup.string().required("This field is required"),
    // subCategory: yup.string().required("This field is required"),
    companyPercentage: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber,"Value must be between 1 to 100"),
    individualPercentage: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber,"Value must be between 1 to 100"),
    taxPercentage: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber,"Value must be between 1 to 100"),
    serviceCharge: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber,"Value must be between 1 to 100"),
    
  
});
