import { CCard, CCardBody } from '@coreui/react'
import React, { useState } from 'react'
import RichTextEditor from 'react-rte'
import styles from './style.module.css'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import api from 'src/utils/api'
import { useEffect } from 'react'

function Index() {
   const [service, setService] = useState('User')
   const [state, setState] = useState({
      privacyPolicy: RichTextEditor.createValueFromString('', 'html'),
      aboutUs: RichTextEditor.createValueFromString('', 'html'),
      faq: RichTextEditor.createValueFromString('', 'html'),
      termsAndCondition: RichTextEditor.createValueFromString('', 'html'),
   })

   console.log(state?.['aboutUs'].toString('html'), 'aboutUs')

   useEffect(() => {
      getStaticData()
   }, [service])

   function getStaticData() {
      api.get('getContentData')
         .then((res) => {
            console.log(res?.data, 'getContentData')

            let aboutUsData = res?.data?.aboutUsData
               ?.filter((v) => v?.userType == service)
               ?.map((i) => ({ ...i, insert: 'aboutUs' }))
            let faqData = res?.data?.faqData
               ?.filter((v) => v?.userType == service)
               ?.map((i) => ({ ...i, insert: 'faq' }))
            let tcData = res?.data?.termsData
               ?.filter((v) => v?.userType == service)
               ?.map((i) => ({ ...i, insert: 'termsAndCondition' }))
            let privacyData = res?.data?.privacyData
               ?.filter((v) => v?.userType == service)
               ?.map((i) => ({ ...i, insert: 'privacyPolicy' }))
            let combineArr = [...aboutUsData, ...faqData, ...tcData, ...privacyData]
            console.log(combineArr, 'combineArr')
            let newObj = {
               aboutUs: '',
               faq: '',
               tc: '',
               privacy: '',
            }

            combineArr?.map((v) => {
               console.log(v, 'singular')
               if (v?.insert == 'aboutUs') {
                  newObj.aboutUs = v?.content
               } else if (v?.insert == 'faq') {
                  newObj.faq = v?.content
               } else if (v?.insert == 'termsAndCondition') {
                  newObj.tc = v?.content
               } else if (v?.insert == 'privacyPolicy') {
                  newObj.privacy = v?.content
               }
            })

            setState({
               faq: RichTextEditor.createValueFromString(newObj.faq, 'html'),
               aboutUs: RichTextEditor.createValueFromString(newObj.aboutUs, 'html'),
               termsAndCondition: RichTextEditor.createValueFromString(newObj.tc, 'html'),
               privacyPolicy: RichTextEditor.createValueFromString(newObj.privacy, 'html'),
            })
         })
         .catch((err) => {
            toast.error(err)
         })
   }

   function AddStaticData(type) {
      api.post('addContentData', {
         contentType: type,
         content: state?.[type].toString('html'),
         userType: service,
      })
         .then((res) => {
            console.log(res, 'addContentData')
            toast.success(res?.message)
            getStaticData()
         })
         .catch((err) => {
            toast.error(err)
         })
   }

   return (
      <div>
         <div className="bdc-container-content">
            <h1 className="bdc-item">CMS Management</h1>
            <div className={styles.firstContainer}>
               <div
                  className={service === 'User' ? styles.selected : styles.unselected}
                  onClick={() => {
                     setService('User')
                  }}
               >
                  User
               </div>
               <div
                  className={service === 'Company' ? styles.selected : styles.unselected}
                  onClick={() => {
                     setService('Company')
                  }}
               >
                  Company
               </div>
               <div
                  className={service === 'Indevidual' ? styles.selected : styles.unselected}
                  onClick={() => {
                     setService('Indevidual')
                  }}
               >
                  Individual
               </div>
               <div
                  className={service === 'Staff' ? styles.selected : styles.unselected}
                  onClick={() => {
                     setService('Staff')
                  }}
               >
                  Staff
               </div>
            </div>
         </div>

         <CCard>
            <CCardBody>
               <div>
                  <h4>Privacy Policy</h4>
                  <RichTextEditor
                     value={state?.privacyPolicy}
                     onChange={(value) => setState({ ...state, privacyPolicy: value })}
                     editorStyle={{ height: '15rem' }}
                  />
                  <div className="text-end mt-3">
                     <Button
                        variant="contained"
                        className={styles.acceptCta}
                        onClick={() => AddStaticData('privacyPolicy')}
                     >
                        Save
                     </Button>
                  </div>
               </div>
               <div>
                  <h4>FAQ</h4>
                  <RichTextEditor
                     value={state?.faq}
                     onChange={(value) => setState({ ...state, faq: value })}
                     editorStyle={{ height: '15rem' }}
                  />
                  <div className="text-end mt-3">
                     <Button
                        variant="contained"
                        className={styles.acceptCta}
                        onClick={() => AddStaticData('faq')}
                     >
                        Save
                     </Button>
                  </div>
               </div>
               <div>
                  <h4>About Us</h4>
                  <RichTextEditor
                     value={state?.aboutUs}
                     onChange={(value) => setState({ ...state, aboutUs: value })}
                     editorStyle={{ height: '15rem' }}
                  />
                  <div className="text-end mt-3">
                     <Button
                        variant="contained"
                        className={styles.acceptCta}
                        onClick={() => AddStaticData('aboutUs')}
                     >
                        Save
                     </Button>
                  </div>
               </div>
               <div>
                  <h4>Terms and Condition</h4>
                  <RichTextEditor
                     value={state?.termsAndCondition}
                     onChange={(value) => setState({ ...state, termsAndCondition: value })}
                     editorStyle={{ height: '15rem' }}
                  />
                  <div className="text-end mt-3">
                     <Button
                        variant="contained"
                        className={styles.acceptCta}
                        onClick={() => AddStaticData('termsAndCondition')}
                     >
                        Save
                     </Button>
                  </div>
               </div>
            </CCardBody>
         </CCard>
      </div>
   )
}

export default Index
