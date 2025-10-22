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
import UploadImg from 'src/assets/images/upload.png'
import { subAdminValidation, subCategoryValidation } from './validation'

function SubDetails({ setAddSub, refresh, setRefresh, moduleArray, prefillValues }) {
   // const [featureDetail, setFeatureDetail] = useState({name:"",image:"",description:"",goodPrice:"",category:"",excellentPrice:"",averagePrice:"",instruction:""})
   const [featureDetail, setFeatureDetail] = useState({})
   const [modulesArr, setModulesArr] = useState([])
   const [modifyModulesArr, setModifyModulesArr] = useState([])
   const [updated, setUpdated] = useState(true)

   console.log(modifyModulesArr, 'modifyModulesArr')

   console.log(moduleArray, 'moduleArray')

   useEffect(() => {
      setFeatureDetail(prefillValues)
      setModulesArr(prefillValues?.accessModule)
   }, [prefillValues])

   useEffect(() => {
      if (updated) {
         setModifyModulesArr(
            moduleArray.map(function (x) {
               let result = modulesArr.filter((a1) => a1._id == x._id)
               console.log(result, 'resu1lt')
               if (result.length > 0) {
                  x.access = result[0].access
               } else {
                  x.access = 'View Only'
               }
               return x
            }),
         )
      }
   }, [moduleArray, modulesArr])

   const {
      name = '',
      email = '',
      password = '',
      address = '',
      country_code = '',
      mobile_number = '',
      adminId = '',
   } = featureDetail

   function ErrorTest(values) {
      subAdminValidation
         .validate(values, { abortEarly: false })
         .then((responseData) => {
            console.log('no validation errors')
            console.log(responseData)
         })
         .catch((err) => {
            if (err.errors.length > 0) {
               if (err.errors[0] == 'This field is required') {
                  let str = err.errors[0].replace('This field', err.inner[0].path)
                  toast.error(str)
               } else {
                  toast.error(err.errors[0])
               }
            }
         })
   }

   console.log(featureDetail, 'featureDetail')
   console.log(prefillValues, 'prefillValues')
   console.log(modulesArr, 'modulesArr')

   function changeModifyArr(e, i, id) {
      setUpdated(false)
      console.log(e.target.value, i, 'checkStatus')
      let newData = [...modifyModulesArr]
      newData[i]['access'] = e.target.value
      setModifyModulesArr(newData)
      let updatedData = [...modulesArr]
      updatedData.filter((v) => v?._id == id)[0].access = e.target.value
      console.log(updatedData, 'updatedData')
      setModulesArr(updatedData)
   }

   return (
      <Formik
         enableReinitialize
         validationSchema={subAdminValidation}
         initialValues={{
            name,
            email,
            password,
            address,
            country_code,
            mobile_number,
            adminId,
         }}
         onSubmit={(values) => {
            console.log(values, 'values')

            if (values?.adminId) {
               api.post('updateSubAdminDetails', {
                  name: values?.name,
                  email: values?.email,
                  password: values?.password,
                  mobile_number: values?.mobile_number,
                  country_code: values?.country_code,
                  address: values?.address,
                  accessModule: modulesArr,

                  adminId: values?.adminId,
               })
                  .then((result) => {
                     toast.success(result?.message)
                     setRefresh(refresh + 1)
                     setAddSub(false)
                  })
                  .catch((err) => {
                     toast.error(err?.message)
                  })
            } else {
               api.post('addSubAdmin', {
                  name: values?.name,
                  email: values?.email,
                  password: values?.password,
                  mobile_number: values?.mobile_number,
                  country_code: values?.country_code,
                  address: values?.address,
                  accessModule: modulesArr,
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
            <Form autoComplete="off">
               <div>
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
                     title="Email"
                     placeholder="Enter Email"
                     error={touched?.email && errors?.email}
                     name="email"
                     value={values?.email}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Password"
                     placeholder="Enter Password"
                     value={values?.password}
                     onChange={handleChange}
                     error={touched?.password && errors?.password}
                     name="password"
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Address"
                     placeholder="Enter Address"
                     value={values?.address}
                     error={touched?.address && errors?.address}
                     onChange={handleChange}
                     name="address"
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Country Code"
                     placeholder="Enter Code"
                     value={values?.country_code}
                     error={touched?.country_code && errors?.country_code}
                     onChange={handleChange}
                     name="country_code"
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleInput
                     required
                     title="Mobile Number"
                     placeholder="Enter Mobile Number"
                     value={values?.mobile_number}
                     error={touched?.mobile_number && errors?.mobile_number}
                     onChange={handleChange}
                     name="mobile_number"
                     style={{ marginBottom: '10px' }}
                  />

                  <h4>Access Modules</h4>

                  <div className={styles.modulesArr}>
                     {modifyModulesArr?.map((v, i) => {
                        return (
                           <div className="d-flex">
                              <input
                                 name={v?.title}
                                 onClick={() => {
                                    if (modulesArr?.some((obj) => obj?._id == v?._id)) {
                                       setModulesArr(
                                          modulesArr.filter((item) => item?._id !== v?._id),
                                       )
                                    } else {
                                       setModulesArr((pre) => [...pre, v])
                                    }
                                 }}
                                 type="checkbox"
                                 checked={modulesArr?.some((obj) => obj?._id == v?._id)}
                                 style={{ width: '20px', marginRight: '10px', marginTop: '-10px' }}
                              />
                              <SimpleSelect
                                 style={{ marginBottom: '10px' }}
                                 options={[
                                    { key: `${v?.title} Full Access`, value: `Full Access` },
                                    { key: `${v?.title} View Only`, value: `View Only` },
                                 ]}
                                 value={v?.access}
                                 onChange={(e) => changeModifyArr(e, i, v?._id)}
                                 name="duration"
                              />
                           </div>
                        )
                     })}
                  </div>

                  <div className="text-center mt-5 mb-1">
                     <Button
                        variant="contained"
                        className={styles.acceptCta}
                        onClick={() => ErrorTest(values)}
                        type="submit"
                     >
                        {prefillValues?.adminId ? 'Update' : 'Save'}
                     </Button>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default SubDetails
