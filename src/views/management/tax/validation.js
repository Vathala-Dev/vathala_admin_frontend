
import validations from "src/utils/validation";
import * as yup from "yup";


// export const taxValidation = yup.object().shape({

//     category: yup.string().required("This field is required"),
//     subCategory: yup.string().required("This field is required"),
//     companyPercentage: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber, "Value must be between 1 to 100"),
//     individualPercentage: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber, "Value must be between 1 to 100"),
//     // taxPercentage: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber,"Value must be between 1 to 100"),
//     taxPercentage: yup.number().typeError("This value must be a number").min(0, "Value must be between 0 to 100").max(100, "Value must be between 0 to 100"),

//     serviceCharge: yup.string().required("This field is required").matches(validations.number, "This value must be a number").matches(validations.hundredNumber, "Value must be between 1 to 100"),



// });
const percentageValidation = yup
    .number()
    .transform((value, originalValue) =>
        originalValue === "" ? null : value
    )
    .nullable()
    .typeError("This value must be a number")
    .min(0, "Value must be between 0 to 100")
    .max(100, "Value must be between 0 to 100")
    .test(
        "max-2-decimals",
        "Only up to 2 decimal places allowed",
        value => {
            if (value === null || value === undefined) return true;
            return /^\d+(\.\d{1,2})?$/.test(value.toString());
        }
    );


export const taxValidation = yup.object().shape({
    category: yup.string().required("This field is required"),
    subCategory: yup.string().required("This field is required"),
    companyPercentage: percentageValidation,
    individualPercentage: percentageValidation,
    taxPercentage: percentageValidation,
    serviceCharge: percentageValidation,
});
