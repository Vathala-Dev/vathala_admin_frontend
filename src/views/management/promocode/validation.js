
import validations from "src/utils/validation";
import * as yup from "yup";


export const promocodeValidation = yup.object().shape({

    title: yup.string().required("This field is required"),
    imageUrl: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
    type: yup.string().required("This field is required"),
    maxDiscount: yup.string().required("This field is required").matches(validations.hundredNumber, "This value must be a number between 1-100"),
    discountUpto: yup.string().required("This field is required"),
 
    usesLimit: yup.string().required("This field is required"),
    startDate: yup.string().required("This field is required"),
    endDate: yup.string().required("This field is required"),
    orderValue: yup.string().required("This field is required").matches(validations.number, "This value must be a number"),

  
});


