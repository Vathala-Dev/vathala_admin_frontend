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
import UploadImg from "src/assets/images/upload.png"
import { subCategoryValidation } from './validation'


function SubDetails({ setAddSub, refresh, setRefresh, categoryArray, prefillValues }) {
   // const [featureDetail, setFeatureDetail] = useState({name:"",image:"",description:"",goodPrice:"",category:"",excellentPrice:"",averagePrice:"",instruction:""})
   const [featureDetail, setFeatureDetail] = useState({})

   const [insArray, setInsArray] = useState([""])


   useEffect(() => {
    setFeatureDetail(prefillValues)
    setInsArray(prefillValues?.instruction)
 }, [prefillValues])

 console.log(categoryArray,prefillValues,"noww");

 console.log(categoryArray?.filter(v => v?._id == prefillValues?.category)[0]?.name,"check");
 

   const {
      name = '',
      image = '',
      description = '',
      goodPrice = '',
      category = "",
      excellentPrice = '',
      averagePrice = '',
      id=""
   } = featureDetail

   console.log(insArray, 'insArray')
   console.log(featureDetail, 'featureDetail')
   console.log(prefillValues,"prefillValues");



   function NoneEmpty(arr) {
    return arr.indexOf("") === -1;
  }



  console.log(NoneEmpty(insArray),insArray,"insArrayEmpty");

  

   const ChangeInput = (index, value) => {
      const updated = [...insArray]
      updated[index] = value
      setInsArray(updated)
   }

   function selectArray(initial, array) {
      let optionsArray = [{ key: initial, value: {} }]
      array?.map((item) => {
         return optionsArray.push({ key: item?.name, value: item?._id })
      })

      return optionsArray
   }

   return (
      <Formik
         enableReinitialize  
         validationSchema={subCategoryValidation}    
         initialValues={{
            name,
            image,
            description,
            goodPrice,
            category,
            excellentPrice,
            averagePrice,
            id
         }}
         onSubmit={(values) => {

          if(values?.id){
            api.post('updateService', {
              name: values?.name,
              category: values?.category,
              description: values?.description,
              averagePrice: values?.averagePrice.toString(),
              excellentPrice: values?.excellentPrice.toString(),
              goodPrice: values?.goodPrice.toString(),
              image: values?.image,
              instruction: insArray,
              id:values?.id
           })
              .then((result) => {
                 toast.success(result?.message)
                 setRefresh(refresh + 1)
                 setAddSub(false)
              })
              .catch((err) => {
                 toast.error(err?.message)
              })
          }else{
            api.post('addService', {
              name: values?.name,
              category: values?.category,
              description: values?.description,
              averagePrice: values?.averagePrice,
              excellentPrice: values?.excellentPrice,
              goodPrice: values?.goodPrice,
              image: values?.image,
              instruction: insArray,
           })
              .then((result) => {
                 toast.success(result?.message)
                 setRefresh(refresh + 1)
                 setAddSub(false)
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
                 
                  <FilePicker
                     onGetUrl={(url) => setFieldValue('image', url)}
                     imageUrl={
                        featureDetail?.image
                           ? `http://52.66.187.242:3001${featureDetail?.image}`
                           : UploadImg
                     }
                     bodyWidth="150px"
                   
                     bodyHeight="150px"
                  />
                  <SimpleInput
                     required
                     title="Name"
                     placeholder="Enter Name"
                     name="name"
                     value={values?.name}
                     onChange={handleChange}
                     error={touched?.name && errors?.name}
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Description"
                     placeholder="Enter description"
                     error={touched?.description && errors?.description}
                     name="description"
                     textArea
                     value={values?.description}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />

                  <div style={{ position: 'relative', marginBottom: '10px' }}>
                     <CFormLabel className="mb-0">Instruction</CFormLabel>

                     <span style={{ color: 'red' }}> * </span>

                     {/* <div className="d-flex justify-content-between align-items-center">
                        <CFormInput
                           style={{
                              fontSize: '14px',
                              color: 'black',
                              height: '40px',
                              border: '1px solid',
                              borderRadius: '5px',
                              borderColor: '#D8D8D8',
                              width: '90%',
                           }}
                           placeholder="Enter Instructions"
                           value={values?.instruction[0]}
                           onChange={(e) =>
                              setFeatureDetail({ ...featureDetail, instruction: e.target.value })
                           }
                        />
                        <AiOutlinePlusCircle
                           className={styles.addMoreIcon}
                           onClick={() => setInsArray(insArray.concat(''))}
                        />
                     </div> */}

                     {insArray?.map((v, i) => {
                      
                        return (
                           <div className="d-flex justify-content-between align-items-center">
                              <CFormInput
                                 style={{
                                    fontSize: '14px',
                                    color: 'black',
                                    height: '40px',
                                    border: '1px solid',
                                    borderRadius: '5px',
                                    borderColor: '#D8D8D8',
                                    width: '90%',
                                 }}
                                 placeholder="Enter Instructions"
                                 value={v}
                                 onChange={(e) => ChangeInput(i, e.target.value)}
                              />

                              {
                                i == 0 ? (
                                
                               <AiOutlinePlusCircle
                                  className={styles.addMoreIcon}
                                  onClick={() => setInsArray(insArray.concat(''))}
                               />
                                ) : (
                                  <AiOutlineMinusCircle
                                  className={styles.addMoreIcon}
                                  onClick={() => {
                                     setInsArray(
                                        insArray.filter(function (person, id) {
                                           return id !== i
                                        }),
                                     )
                                  }}
                               />
                                )
                              }
                          
                           </div>
                        )
                     })}
                  </div>

                  <SimpleSelect
                     required
                     style={{ marginBottom: '10px' }}
                     options={selectArray('Select Category', categoryArray)}
                     value={values?.category }
                     onChange={handleChange}
                     error={touched?.category && errors?.category}
                     name="category"
                     title="Category"
                  />

                  <SimpleInput
                     required
                     title="Good Price"
                     placeholder="Enter Price"
                     value={values?.goodPrice}
                     onChange={handleChange}
                     error={touched?.goodPrice && errors?.goodPrice}
                     name="goodPrice"
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Excellent Price"
                     placeholder="Enter Price"
                     value={values?.excellentPrice}
                     error={touched?.excellentPrice && errors?.excellentPrice}
                     onChange={handleChange}
                     name="excellentPrice"
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Average Price"
                     placeholder="Enter Price"
                     value={values?.averagePrice}
                     error={touched?.averagePrice && errors?.averagePrice}
                     onChange={handleChange}
                     name="averagePrice"
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

export default SubDetails
