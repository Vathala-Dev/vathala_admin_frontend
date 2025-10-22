import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SimpleSelect from 'src/components/common/select'
import SimpleInput from 'src/components/common/simpleInput'
import api from 'src/utils/api'
import styles from './style.module.css'
import { Formik, Form } from 'formik'
import { planValidation } from './validation'

function PlanDetails({ allFeatures, setAddPlan, refresh, setRefresh,prefillValues }) {
   console.log(allFeatures, 'allFeatures')
   // const [featureDetail, setFeatureDetail] = useState({name:"",price:"",duration:""})
   const [featureDetail, setFeatureDetail] = useState({})
   const [featureArray, setFeatureArray] = useState([])

   console.log(featureArray, 'featureArray')

   const { name = '', duration = '', price = '',package_policy = "",terms = "", id="" } = featureDetail


   useEffect(() => {
      setFeatureDetail(prefillValues)
      setFeatureArray(prefillValues?.features)
   }, [prefillValues])
   

   
  
   return (
      <Formik
      enableReinitialize
      validationSchema={planValidation}
         initialValues={{
            name,
            duration,
            price,
            package_policy,
            terms,
            id,
         }}
         onSubmit={(values) => {
           
            console.log(values, 'values')

            if(featureArray.length == 0){
toast.error("Feature is required")
return
            }

            if(values?.id){
               api.post('updateSubscription', {
                  name: values?.name,
                  duration: values?.duration,
                  package_policy: values?.package_policy,
                  terms: values?.terms,
                  price: values?.price.toString(),
                  features: featureArray,
                  id:values?.id
               })
                  .then((result) => {
                     toast.success(result?.message)
                     setRefresh(refresh + 1)
                     setAddPlan(false)
                  })
                  .catch((err) => {
                     toast.error(err?.message)
                  })
            }else{
               api.post('addSubscription', {
                  name: values?.name,
                  duration: values?.duration,
                  package_policy: values?.package_policy,
                  terms: values?.terms,             
                  price: values?.price,
                  features: featureArray,
               })
                  .then((result) => {
                     toast.success(result?.message)
                     setRefresh(refresh + 1)
                     setAddPlan(false)
                  })
                  .catch((err) => {
                     toast.error(err?.message)
                  })
            }

          
         }}
      >
         {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form
               autoComplete="off"
              
            >
               <div>
                  <SimpleInput
                     required
                     title="Name"
                     placeholder="Enter Name"
                     error={touched?.name && errors?.name}
                     value={values?.name}
                     onChange={ handleChange}
                     name="name"
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleInput
                     required
                     title="Price"
                     placeholder="Enter Price"
                     error={touched?.price && errors?.price}
                     name="price"
                     value={values?.price}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleInput
                     required
                     title="Package Policy"
                     textArea
                     placeholder="Enter package policy"            
                     name="package_policy"
                     value={values?.package_policy}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleInput
                     required
                     title="Terms & Conditions"
                     placeholder="Enter Terms and Conditions"                
                     name="terms"
                     value={values?.terms}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleSelect
                     required
                     style={{ marginBottom: '10px' }}
                     options={[
                        { key: 'Select Duration ', value: '' },
                        { key: '1 Month', value: '1 Month' },
                        { key: '2 Month', value: '2 Month' },
                        { key: '3 Month', value: '3 Month' },
                        { key: '4 Month', value: '4 Month' },
                        { key: '5 Month', value: '5 Month' },
                     ]}
                     value={values?.duration}
                     error={touched?.duration && errors?.duration}
                     name="duration"
                     onChange={handleChange}
                     title="Duration"
                  />

                  <div>
                     <p className="fw-bold fs-4">Feature* </p>
                     {allFeatures?.map((v) => {
                        console.log(featureArray?.some((obj) => obj?._id == v?._id),"alreadyTick");
                        return (
                           <div className="d-flex align-items-center mt-3">
                              <input
                                 type="checkbox"
                                   checked={featureArray?.some((obj) => obj?._id == v?._id)}
                                 
                                 onClick={() => {
                                    if (featureArray?.some((obj) => obj?._id == v?._id)) {
                                       setFeatureArray(
                                          featureArray.filter((item) => item?._id !== v?._id),
                                       )
                                    } else {
                                       setFeatureArray((pre) => [...pre, v])
                                    }
                                 }}
                                 style={{ width: '20px', height: '18px' }}
                              />
                              <p className="fs-7 ms-2 ">{v?.name}</p>
                           </div>
                        )
                     })}
                  </div>

                  <div className="text-center mt-5 mb-1">
                     <Button variant="contained" className={styles.acceptCta} type="submit">
                        {prefillValues?.id ? "Update" : "Save"}
                     </Button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default PlanDetails
