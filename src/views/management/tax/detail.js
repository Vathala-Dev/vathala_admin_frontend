import { CFormInput, CFormLabel } from '@coreui/react'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import FilePicker from 'src/components/common/imageUploader'
import SimpleSelect from 'src/components/common/select'
import SimpleInput from 'src/components/common/simpleInput'
import api from 'src/utils/api'
import styles from './style.module.css'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { Form, Formik } from 'formik'
import { taxValidation } from './validation'



function Details({ setAddTax, refresh,allCat ,allSub,setRefresh,prefillValues }) {

   const [featureDetail, setFeatureDetail] = useState({})
   const [filteredSub, setFilteredSub] = useState([])


console.log(prefillValues,"prefillValues");
console.log(allSub,prefillValues?.subCategory,"filteredSub");


   useEffect(() => {
    setFeatureDetail(prefillValues)
    setFilteredSub(allSub.filter(v => v?.category == prefillValues?.category))
 }, [prefillValues])


 

   const {
      category = "" ,
      subCategory = "" ,
      companyPercentage = "" ,
      individualPercentage = "",
      taxPercentage = "",
      serviceCharge = "",
      id=""
   } = featureDetail









   function selectArray(initial, array) {
      let optionsArray = [{ key: initial, value: "" }]
      array?.map((item) => {
         return optionsArray.push({ key: item?.name, value: item?._id })
      })

      return optionsArray
   }


   return (
      <Formik
         enableReinitialize    
         validationSchema={taxValidation}    
         initialValues={{
            category,
            subCategory,
            companyPercentage,
            individualPercentage,
            taxPercentage,
            serviceCharge,
            id
         }}
         onSubmit={(values) => {      
         
     

          if(values?.id){
            api.post('updateCommission', {
             category:values?.category,
             subCategory:filteredSub?.length > 0 ? values?.subCategory : "",
             companyPercentage:values?.companyPercentage,
             individualPercentage:values?.individualPercentage,   
             taxPercentage : values?.taxPercentage,
             serviceCharge : values?.serviceCharge,              
             commissionId:values?.id
           })
              .then((result) => {
                 toast.success(result?.message)
                 setRefresh(refresh + 1)
                 setAddTax(false)
              })
              .catch((err) => {
                 toast.error(err?.message)
              })
          }else{
            api.post('addCommission', {
                category:values?.category,
                subCategory: filteredSub?.length > 0 ? values?.subCategory : "",
                companyPercentage:values?.companyPercentage,
                individualPercentage:values?.individualPercentage,
                taxPercentage : values?.taxPercentage,
                serviceCharge : values?.serviceCharge
           })
              .then((result) => {
                 toast.success(result?.message)
                 setRefresh(refresh + 1)
                 setAddTax(false)
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

               <SimpleSelect
                     required
                     style={{ marginBottom: '10px' }}
                     error={touched?.category && errors?.category}

                     options={selectArray("Select Category",allCat)}
                     value={values?.category }
                     onChange={(e) => {
                        console.log(e.target.value,"category");
                        setFieldValue("category",e.target.value)
                        setFilteredSub(allSub.filter(v => v?.category == e.target.value))
                     }}
                     name="category"
                     title="Select Category"
                  />

            <SimpleSelect
                     required
                     style={{ marginBottom: '10px' }}
                     options={selectArray("Select Sub-Category",filteredSub)}
                     value={values?.subCategory }
                     onChange={handleChange}
                     name="subCategory"
                     title="Select Sub-Category"
                  />
                 
                  <SimpleInput
                     required
                     error={touched?.companyPercentage && errors?.companyPercentage}

                     title="Company Percentage"
                     placeholder="Enter Company Percentage"
                     name="companyPercentage"
                     value={values?.companyPercentage}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Individual Percentage"
                     placeholder="Enter Individual Percentage"
                     name="individualPercentage"
                     error={touched?.individualPercentage && errors?.individualPercentage}                  
                     value={values?.individualPercentage}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />


                  <SimpleInput
                     required
                     title="Tax Percentage"
                     placeholder="Enter Tax Amount Percentage"
                     name="taxPercentage"
                     error={touched?.taxPercentage && errors?.taxPercentage}                  
                     value={values?.taxPercentage}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
           
                     <SimpleInput
                        required
                        title="Service Charge Percentage"
                        placeholder="Enter Service Charge Percentage"
                        name="serviceCharge"
                        error={touched?.serviceCharge && errors?.serviceCharge}                  
                        value={values?.serviceCharge}
                        onChange={handleChange}
                        style={{ marginBottom: '10px' }}
                     />

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

export default Details
