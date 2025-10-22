import { CCard, CCardBody } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SimpleInput from 'src/components/common/simpleInput'
import api from 'src/utils/api'
import styles from './style.module.css'
import moment from 'moment'
import { GrFormPreviousLink } from 'react-icons/gr'
import { saveAs } from 'file-saver'
import { CFormSelect, CFormLabel } from '@coreui/react'
import Select from 'react-select'
import CommonModal from 'src/components/common/modal'

function Details() {
   const [details, setDetails] = useState()
   const [stateList, setstateList] = useState([])
   const [cityList, setcityList] = useState([])
   const params = useParams()
   const location = useLocation()
   const navigate = useNavigate()
   const [allCategory, setAllCategory] = useState([])
   const [selectedcategory, setSelectedcategory] = useState([])
   const [detailPopup, setDetailPopup] = useState(false)
   const [currimage, setCurrimage] = useState('')
   console.log(details, 'details')

   console.log(location?.state, 'params')

   useEffect(() => {
      getDetails()
   }, [params])

   useEffect(() => {
      getcategoryList()
   }, [params])

   const handleDownload = (fileUrl, fileName) => {
      saveAs(fileUrl, fileName)
   }

   function getDetails() {
      api.post(location?.state?.service == 'individual' ? 'getIndividualById' : 'getCompanyById', {
         id: params?.id,
      })
         .then((result) => {
            setDetails(result?.response)
            getstateList()
            if (location?.state?.service == 'individual') {
               result.response.state = result?.response?.stateCode
            }
            getcityList(result?.response?.state)
            getcategoryList(result?.response.serviceCategory)
         })
         .catch((err) => {
            // toast.error(err?.message)
         })
   }

   function getstateList() {
      api.get('getStateList')
         .then((result) => {
            setstateList(result?.data)
         })
         .catch((err) => {
            // toast.error(err?.message)
         })
   }

   function getcategoryList(categorylist) {
      api.post('getAllCategory', {})
         .then((result) => {
            let catlist = result?.response.map((ele) => {
               return { value: ele._id, label: ele.name }
            })
            setAllCategory(catlist)
            let allcat = catlist.filter((option) => categorylist.includes(option.value))
            console.log('all categorys', categorylist)
            setSelectedcategory(allcat)
         })
         .catch((err) => {
            // toast.error(err?.message)
         })
   }

   function getcityList(state) {
      api.post('getCity', {
         countryCode: 'IN',
         stateCode: state,
      })
         .then((result) => {
            setcityList(result?.data)
         })
         .catch((err) => {
            // toast.error(err?.message)
         })
   }

   const addBaseUrl = (url) => {
      if (!url) return url
      const baseUrl = 'http://52.66.187.242:3001/'
      const s3Pattern = /^https?:\/\/.*\.s3\..*amazonaws\.com\/.*/

      if (url.startsWith('https')) {
         return url
      }

      return `${baseUrl}${url}`
   }

   const handleChange = (selectedOptions) => {
      setSelectedcategory(selectedOptions)
   }

   return (
      <div>
         <CommonModal
            show={detailPopup}
            setShow={setDetailPopup}
            title=""
            bodyContent={
               <div style={{ textAlign: 'center' }}>
                  <img src={addBaseUrl(currimage)} style={{ width: '300px', height: '300px' }} />
               </div>
            }
         />

         <div className="d-flex align-items-center mb-3">
            <GrFormPreviousLink className={styles.backIcon} onClick={() => navigate(-1)} />
            <h2 className={styles.subBreadCrumbTitle}>
               {' '}
               {location?.state?.service == 'individual' ? 'Individual' : 'Service'} Provider
               Details
            </h2>
         </div>

         <CCard>
            <CCardBody>
               <div className={styles.detailContainer}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                     <img
                        src={addBaseUrl(
                           location?.state?.service == 'individual'
                              ? details?.profile_image
                              : details?.profileImage,
                        )}
                        onClick={() => {
                           setDetailPopup(true)
                           setCurrimage(
                              addBaseUrl(
                                 location?.state?.service == 'individual'
                                    ? details?.profile_image
                                    : details?.profileImage,
                              ),
                           )
                        }}
                        style={{
                           width: '100px',
                           height: '100px',
                           borderRadius: '50%',
                           cursor: 'pointer',
                        }}
                     />
                  </div>
                  <SimpleInput title="Name" value={details?.name} style={{ width: '40%' }} />
                  <div style={{ width: '50%' }}>
                     <label class="form-label mb-1 fw-bolder">Service category</label>
                     <Select
                        isMulti
                        options={allCategory}
                        value={selectedcategory}
                        hideSelectedOptions={true}
                        isDisabled
                        isClearable={false}
                        onChange={handleChange}
                     />
                  </div>

                  <SimpleInput
                     title="Total experience"
                     value={details?.total_experience}
                     style={{ width: '40%' }}
                  />
                  <SimpleInput
                     title="Specialist Type"
                     value={details?.specialistType}
                     style={{ width: '40%' }}
                  />
                  {location?.state?.service == 'provider' && (
                     <SimpleInput
                        title="Status"
                        value={location?.is_blocked ? 'Blocked' : 'Active'}
                        style={{ width: '40%' }}
                     />
                  )}
                  {location?.state?.service == 'provider' && (
                     <SimpleInput
                        title="Company Name"
                        value={details?.companyName}
                        style={{ width: '40%' }}
                     />
                  )}
                  {/* {location?.state == "provider" &&  <SimpleInput title="Plan Details" value="" style={{width:"40%"}} />} */}
                  <SimpleInput
                     title="Contact Number"
                     value={
                        location?.state?.service == 'individual'
                           ? details?.mobile_number
                           : details?.contactNumber
                     }
                     style={{ width: '40%' }}
                  />
                  {location?.state?.service == 'provider' && (
                     <SimpleInput title="Plan Status" value="N/A" style={{ width: '40%' }} />
                  )}
                  <SimpleInput title="Email Id" value={details?.email} style={{ width: '40%' }} />
                  {/* {location?.state == "provider" &&    <SimpleInput title="Service Listings" value="" style={{width:"40%"}} />} */}
                  <SimpleInput
                     title="Date of Joining"
                     value={moment(details?.created_on).format('DD.MM.YYYY')}
                     style={{ width: '40%' }}
                  />
                  {location?.state?.service == 'provider' && (
                     <SimpleInput
                        title="Liscence No."
                        value={details?.liscenceNo}
                        style={{ width: '40%' }}
                     />
                  )}
                  <div style={{ width: '40%' }}>
                     <label class="form-label mb-1 fw-bolder">State</label>
                     <CFormSelect
                        title="State"
                        value={details?.state}
                        onChange={() => {}}
                        style={{
                           fontSize: '14px',
                           color: 'black',
                           height: '40px',
                           border: '1px solid',
                           borderRadius: '5px',
                           borderColor: '#D8D8D8',
                           boxShadow: 'none',
                        }}
                     >
                        {stateList?.map((item, index) => (
                           <option key={index} value={item['isoCode']}>
                              {item['name']}
                           </option>
                        ))}
                     </CFormSelect>
                  </div>
                  <div style={{ width: '40%' }}>
                     <label class="form-label mb-1 fw-bolder">City</label>
                     <CFormSelect
                        title="City"
                        value={details?.city}
                        onChange={() => {}}
                        style={{
                           fontSize: '14px',
                           color: 'black',
                           height: '40px',
                           border: '1px solid',
                           borderRadius: '5px',
                           borderColor: '#D8D8D8',
                           boxShadow: 'none',
                        }}
                     >
                        {cityList?.map((item, index) => (
                           <option key={index} value={item['name']}>
                              {item['name']}
                           </option>
                        ))}
                     </CFormSelect>
                  </div>

                  <SimpleInput title="Address" value={details?.address} style={{ width: '40%' }} />

                  {location?.state?.service != 'provider' && (
                     <div style={{ width: '80%' }}>
                        <label className="fw-bold d-block">Service Images </label>
                        {details?.images?.map((item, index) => (
                           <img
                              src={addBaseUrl(item)}
                              onClick={() => {
                                 setDetailPopup(true)
                                 setCurrimage(addBaseUrl(item))
                              }}
                              style={{
                                 width: '100px',
                                 height: '100px',
                                 marginRight: '15px',
                                 cursor: 'pointer',
                              }}
                           />
                        ))}
                     </div>
                  )}

                  {location?.state?.service != 'provider' && (
                     <div style={{ width: '80%' }}>
                        <label className="fw-bold d-block">Certficate </label>
                        {details?.certificate?.map((item, index) => (
                           <img
                              src={addBaseUrl(item)}
                              onClick={() => {
                                 setDetailPopup(true)
                                 setCurrimage(addBaseUrl(item))
                              }}
                              style={{
                                 width: '100px',
                                 height: '100px',
                                 marginRight: '15px',
                                 cursor: 'pointer',
                              }}
                           />
                        ))}
                     </div>
                  )}

                  {location?.state?.service == 'provider' && (
                     <div style={{ width: '80%' }}>
                        <label className="fw-bold d-block">Service Images </label>
                        {details?.service_images?.map((item, index) => (
                           <img
                              src={addBaseUrl(item)}
                              onClick={() => {
                                 setDetailPopup(true)
                                 setCurrimage(addBaseUrl(item))
                              }}
                              style={{
                                 width: '100px',
                                 height: '100px',
                                 marginRight: '15px',
                                 cursor: 'pointer',
                              }}
                           />
                        ))}
                     </div>
                  )}

                  {location?.state?.service == 'provider' && (
                     <div style={{ width: '80%' }}>
                        <label className="fw-bold d-block">Attached Certificate </label>
                        {details?.certificates?.map((item, index) => (
                           <img
                              src={addBaseUrl(item)}
                              onClick={() => {
                                 setDetailPopup(true)
                                 setCurrimage(addBaseUrl(item))
                              }}
                              style={{
                                 width: '100px',
                                 height: '100px',
                                 marginRight: '15px',
                                 cursor: 'pointer',
                              }}
                           />
                        ))}
                     </div>
                  )}
               </div>
               <div className="mt-5 mb-2">
                  <h2>Bank Details</h2>
               </div>
               <div>
                  <SimpleInput
                     title="Customer Name"
                     value={details?.accountHolderName}
                     style={{ width: '70%', marginBottom: '20px' }}
                  />
                  <SimpleInput
                     title="Account Number"
                     value={details?.accountNumber}
                     style={{ width: '70%', marginBottom: '20px' }}
                  />
                  <SimpleInput
                     title="Bank Name"
                     value={details?.bankName}
                     style={{ width: '70%', marginBottom: '20px' }}
                  />
                  <SimpleInput
                     title="IFSC Code"
                     value={details?.ifscCode}
                     style={{ width: '70%', marginBottom: '20px' }}
                  />
               </div>
            </CCardBody>
         </CCard>
      </div>
   )
}

export default Details
