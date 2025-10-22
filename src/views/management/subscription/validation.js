
import * as yup from "yup";


export const planValidation = yup.object().shape({

    name: yup.string().required("This field is required"),
    price: yup.string().required("This field is required"),
    duration: yup.string().required("This field is required"),

  
});
