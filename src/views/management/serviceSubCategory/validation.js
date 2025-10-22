
import validations from "src/utils/validation";
import * as yup from "yup";


export const subCategoryValidation = yup.object().shape({

    name: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
    goodPrice: yup.string().required("This field is required").matches(validations.number, "This value must be a number"),
    category: yup.string().required("This field is required"),
    excellentPrice: yup.string().required("This field is required").matches(validations.number, "This value must be a number"),
    averagePrice: yup.string().required("This field is required").matches(validations.number, "This value must be a number"),
  
});
