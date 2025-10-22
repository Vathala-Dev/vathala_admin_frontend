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
import SimpleDatePicker from 'src/components/common/datePicker'
import { promocodeValidation } from './validation'
import moment from 'moment'


function PCDetails({ setAddSub, refresh, setRefresh, categoryArray, prefillValues }) {

   const [featureDetail, setFeatureDetail] = useState({})




   useEffect(() => {
      setFeatureDetail(prefillValues)

   }, [prefillValues])

   console.log(prefillValues, "noww");

   console.log(categoryArray?.filter(v => v?._id == prefillValues?.category)[0]?.name, "check");


   const {
      title = "",
      imageUrl = "",
      description = "",
      maxDiscount = "",
      discountUpto = "",
      type = "1",
      usesLimit = "",
      orderValue = "",
      startDate = "",
      endDate = "",
      isUserShow = true,
      id = ""
   } = featureDetail


   console.log(featureDetail, 'featureDetail')
   console.log(prefillValues, "prefillValues");


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
         validationSchema={promocodeValidation}
         initialValues={{
            title,
            imageUrl,
            description,
            maxDiscount,
            discountUpto,
            type,
            startDate,
            endDate,
            isUserShow,
            usesLimit,
            orderValue,
            id
         }}
         onSubmit={(values) => {


            //    if (
            //      !values?.title ||
            //      !values?.imageUrl ||
            //      !values?.description ||
            //      !values?.maxDiscount ||
            //      !values?.discountUpto ||
            //      !values?.type ||
            //      !values?.duration ||
            //      !values?.usesLimit || 
            //      !values?.orderValue  

            //   ) {
            //      toast.error('Fields marked with * are required to fill')
            //      return
            //   }

            //  updateService

            if (values?.id) {
               api.post('editPromoCode', {
                  title: values?.title,
                  imageUrl: values?.imageUrl,
                  description: values?.description,
                  maxDiscount: values?.maxDiscount,
                  discountUpto: values?.discountUpto,
                  startDate: moment(values?.startDate).format("X"),
                  endDate: moment(values?.endDate).format("X"),
                  type: values?.type,
                  isUserShow: values?.isUserShow,
                  usesLimit: values?.usesLimit,
                  orderValue: values?.orderValue,
                  promoCodeId: values?.id
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
               api.post('addPromoCode', {
                  title: values?.title,
                  imageUrl: values?.imageUrl,
                  description: values?.description,
                  maxDiscount: values?.maxDiscount,
                  discountUpto: values?.discountUpto,
                  startDate: moment(values?.startDate).format("X"),
                  endDate: moment(values?.endDate).format("X"),
                  type: values?.type,
                  isUserShow: values?.isUserShow,
                  usesLimit: values?.usesLimit,
                  orderValue: values?.orderValue,

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
                  {/* <p className="mt-2 fs-5 fw-bold mb-3 text-center ">Add Category</p> */}
                  <FilePicker
                     onGetUrl={(url) => setFieldValue('imageUrl', url)}
                     imageUrl={
                        featureDetail?.imageUrl
                           ? `http://52.66.187.242:3001${featureDetail?.imageUrl}`
                           : UploadImg
                     }
                     bodyWidth="150px"
                     error={touched?.imageUrl && errors?.imageUrl}
                     bodyHeight="150px"
                  />
                  <SimpleInput
                     required
                     error={touched?.title && errors?.title}

                     title="Promocode Name"
                     placeholder="Enter Name"
                     name="title"
                     value={values?.title}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleInput
                     required
                     title="Description"
                     placeholder="Enter description"
                     name="description"
                     error={touched?.description && errors?.description}

                     textArea
                     value={values?.description}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleInput
                     required
                     title="Discount"
                     placeholder="Enter max discount"
                     name="maxDiscount"
                     error={touched?.maxDiscount && errors?.maxDiscount}

                     value={values?.maxDiscount}
                     onChange={e => {
                        const numberRegex = /^[0-9]*$/;
                        if (e.target.value === '' || numberRegex.test(e.target.value)) {
                           handleChange(e);
                        }
                     }}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleInput
                     required
                     title="Discount Up To"
                     placeholder="Enter discount up to"
                     name="discountUpto"
                     error={touched?.discountUpto && errors?.discountUpto}

                     value={values?.discountUpto}
                     onChange={e => {
                        const numberRegex = /^[0-9]*$/;
                        if (e.target.value === '' || numberRegex.test(e.target.value)) {
                           handleChange(e);
                        }
                     }}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleDatePicker
                     required
                     title="Start Date"
                     error={touched?.startDate && errors?.startDate}
                     name="startDate"
                     value={values?.startDate}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleDatePicker
                     required
                     title="End Date"
                     error={touched?.endDate && errors?.endDate}
                     min={values?.startDate}
                     name="endDate"
                     value={values?.endDate}
                     onChange={handleChange}
                     style={{ marginBottom: '10px' }}
                  />
                  <SimpleSelect
                     required
                     style={{ marginBottom: '10px' }}
                     error={touched?.type && errors?.type}
                     options={[
                        { key: "New User", value: "New User" },
                        { key: "Existing User", value: "Existing User" },
                     ]}
                     value={values?.type}
                     onChange={handleChange}
                     name="type"
                     title="Select Type"
                  />
                  <SimpleSelect
                     required
                     style={{ marginBottom: '10px' }}
                     error={touched?.isUserShow && errors?.isUserShow}
                     options={[
                        { key: "Yes", value: true },
                        { key: "No", value: false },
                     ]}
                     value={values?.isUserShow}
                     onChange={handleChange}
                     name="isUserShow"
                     title="User Visibility"
                  />
                  {/* <SimpleSelect
                     required
                     style={{ marginBottom: '10px' }}
                     error={touched?.duration && errors?.duration}

                     options={[
                        {key:"1 month",value:1},
                        {key:"2 month",value:2},
                     ]}
                     value={values?.duration }
                     onChange={handleChange}
                     name="duration"
                     title="Select Duration"
                  /> */}
                  <SimpleInput
                     required
                     title="Usage Limit"
                     placeholder="Enter usage limit"
                     error={touched?.usesLimit && errors?.usesLimit}
                     value={values?.usesLimit}
                     onChange={e => {
                        const numberRegex = /^[0-9]*$/;
                        if (e.target.value === '' || numberRegex.test(e.target.value)) {
                           handleChange(e);
                        }
                     }}
                     name="usesLimit"
                     style={{ marginBottom: '10px' }}
                  />

                  <SimpleInput
                     required
                     title="Order Value"
                     error={touched?.orderValue && errors?.orderValue}
                     placeholder="Enter order value"
                     value={values?.orderValue}
                     onChange={e => {
                        const numberRegex = /^[0-9]*$/;
                        if (e.target.value === '' || numberRegex.test(e.target.value)) {
                           handleChange(e);
                        }
                     }}
                     name="orderValue"
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

export default PCDetails
