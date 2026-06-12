import { CCard, CCardBody } from '@coreui/react'
import React, { useState } from 'react'
import styles from './style.module.css'
import { AiOutlineDownload } from 'react-icons/ai'
import { toast } from 'react-toastify'
import api from 'src/utils/api'
import { downloadExcel } from 'react-export-table-to-excel'
import moment from 'moment'

function Index({ show }) {
   console.log(show, 'showAll')

   function Header(name) {
      if (name == 'newUser') {
         return [
            'First Name',
            'Last Name',
            'Country Code',
            'Mobile Number',
            'Email',
            'City',
            'Address',
            'Joined On',
            'Referral Code',
            'State',
            'Completed Booking',
            'Cancelled Booking',
            'Status',
         ]
      }
      if (name == 'totalUser') {
         return [
            'First Name',
            // 'Last Name',
            // 'Country Code',
            'Mobile Number',
            'Email',
            'City',
            'Address',
            'Joined On',
            'Referral Code',
            'state',
            'Completed Booking',
            'Cancelled Booking',
            'Status',
         ]
      } else if (name == 'totalCompany') {
         return [
            'Name',
            'Company Name',
            'Contact Number',
            'Email',
            'Total Workforce',
            'Category',
            'Registration No.',
            'Liscence No.',
            'Address',
            'JoinedOn',
         ]
      } else if (name == 'totalIndevidual') {
         return [
            'Name',
            'Category',
            'Mobile Number',
            'Email',
            'City',
            'Address',
            'Total experience',
            'Specialist Type',
            'State',
            'Total Rating',
            'Status',
            'JoinedOn',
         ]
      } else if (name == 'totalCompleteService') {
         return [
            'User Name',
            'Mobile',
            'Email',
            'City',
            'Booking Date & Time',
            'Booking Id',
            'Company Name',
            'Service Man Alloted',
            'Category',
            'Reservation Date',
            'Total Charges',
            'Payment Status',
            'User Address',
            'Payment Mode',
         ]
      } else if (name == 'totalOngoingService') {
         return [
            'User Name',
            'Mobile',
            'Email',
            'City',
            'Booking Date & Time',
            'Booking Id',
            'Company Name',
            'Service Man Alloted',
            'Category',
            'Reservation Date',
            'Total Charges',
            'Payment Status',
            'User Address',
            'Payment Mode',
         ]
      } else if (name == 'totalCancelledService') {
         return [
            'User Name',
            'Mobile',
            'Email',
            'City',
            'Booking Date & Time',
            'Booking Id',
            'Company Name',
            'Service Man Alloted',
            'Category',
            'Reservation Date',
            'Total Charges',
            'Payment Status',
            'Cancel Reason',
            'User Address',
            'Payment Mode',
         ]
      } else if (name == 'totalRevenuePlateform') {
         return [
           'User Name',
            'Mobile',
            'Email',
            'City',
            'Booking Date & Time',
            'Booking Id',
            'Company Name',
            'Service Man Alloted',
            'Category',
            'Reservation Date',
            'Total Charges',
            'Payment Status',
            'User Address',
            'Payment Mode',
         ]
      } else if (name == 'totalRevenueCompany') {
         return [
            'UserName',
            'Booking Date & Time',
            'Booking Id',
            'Company Name',
            'Service Man Alloted',
            'Category',
            'Reservation Date',
            'Total Charges',
            'Payment Status',
            'User Address',
            'Payment Mode',
         ]
      } else if (name == 'totalReview') {
         return [
            'Name',
            'Email',
            'Contact Number',
            'Booking ID',
            'Service Category',
            'Company Name',
            'Service Man Name',
            'Service Review',
            'Service Rating',
            'Service Provider Review',
            'Service Provider Rating',
         ]
      }
   }

   function Body(name, data) {
      console.log('srsdata: ', data)
      if (name == 'newUser') {
         return data?.map((v) => ({
            fName: v?.first_name,
            lName: v?.last_name,
            country_code: v?.country_code,
            mNo: v?.mobile_number,
            email: v?.email,
            city: v?.city,
            address: v?.address,
            joined_on: v.created_on,
            referral_code: v?.ref_code,
            state: v?.state,
            completedBokking: v.completeBooking,
            cancelledBooking: v.cancelledBooking,
            status: v?.is_blocked == 1 ? 'Blocked' : 'Active',
         }))
      } else if (name == 'totalUser') {
         return data?.map((v) => ({
            fName: v?.first_name,
            // lName: v?.last_name,
            // country_code: v?.country_code,
            mNo: v?.mobile_number,
            email: v?.email,
            city: v?.city,
            address: v?.address,
            joined_on: v.created_on,
            referral_code: v?.ref_code,
            state: v?.state,
            completedBokking: v.completeBooking,
            cancelledBooking: v.cancelledBooking,
            status: v?.is_blocked == 1 ? 'Blocked' : 'Active',
         }))
      } else if (name == 'totalCompany') {
         // ["Name","Company Name","Contact Number","Email","Total Workforce","Category","Registration No.","Liscence No.","Address"]
         return data?.map((v) => ({
            name: v?.name,
            company: v?.companyName,
            mNo: v?.contactNumber,
            email: v?.email,
            totalWorkForce: v?.totalWorkforce,
            category: v?.serviceTypeName,
            register: v?.registrationNo,
            liscence: v?.liscenceNo,
            address: v?.address,
            JoinedOn: v?.joinedOn,
         }))
      } else if (name == 'totalIndevidual') {
         return data?.map((v) => ({
            name: v?.name,
            category: v?.serviceTypeName,
            mNo: v?.mobile_number,
            email: v?.email,
            city: v?.city,
            address: v?.address,
            totalexperience: v?.total_experience,
            specialisttype: v?.specialistType?.join(', '),
            state: v?.state,
            totalRating: v?.totalRating,
            status: v?.is_blocked == 1 ? 'Blocked' : 'Active',
            JoinedOn: v?.joinedOn,
         }))
      } else if (name == 'totalCompleteService') {
         return data?.map((v) => {
            v.bookingDateTime = formatDateTime(v?.bookingDateTime)
            v.createdOn = formatDate(v?.createdOn)
            return {
               name: v?.userName,
               mobileNumber:v?.userMobile,
               email:v?.userEmail,
               city:v?.userCity,
               bookingDateTime: v?.bookingDateTime,
               bookingId: v?.bookingId,
               companyName: v?.companyName ? v.companyName : 'N/A',
               serviceManAlloted: v?.allocatedStaff,
               category: v?.category,
               reservationDate: v?.createdOn,
               totalCharges: v.amount,
               paymentStatus: v.paymentStatus,
               address: v.address,
               paymentMode: v.paymentMode ? v.paymentMode : 'COD',
            }
         })
      } else if (name == 'totalOngoingService') {
         return data?.map((v) => {
            v.bookingDateTime = formatDateTime(v?.bookingDateTime)
            v.createdOn = formatDate(v?.createdOn)
            return {
              name: v?.userName,
               mobileNumber:v?.userMobile,
               email:v?.userEmail,
               city:v?.userCity,
               bookingDateTime: v?.bookingDateTime,
               bookingId: v?.bookingId,
               companyName: v?.companyName ? v.companyName : 'N/A',
               serviceManAlloted: v?.allocatedStaff,
               category: v?.category,
               reservationDate: v?.createdOn,
               totalCharges: v.amount,
               paymentStatus: v.paymentStatus,
                address: v.address,
               paymentMode: v.paymentMode ? v.paymentMode : 'COD',
            }
         })
      } else if (name == 'totalCancelledService') {
         return data?.map((v) => {
            v.bookingDateTime = formatDateTime(v?.bookingDateTime)
            v.createdOn = formatDate(v?.createdOn)
            return {
               name: v?.userName,
               mobileNumber:v?.userMobile,
               email:v?.userEmail,
               city:v?.userCity,
               bookingDateTime: v?.bookingDateTime,
               bookingId: v?.bookingId,
               companyName: v?.companyName ? v.companyName : 'N/A',
               serviceManAlloted: v?.allocatedStaff,
               category: v?.category,
               reservationDate: v?.createdOn,
               totalCharges: v.amount,
               paymentStatus: v.paymentStatus,
               cancelReason: v.cancelReason || 'N/A',
                address: v.address,
               paymentMode: v.paymentMode ? v.paymentMode : 'COD',
            }
         })
      } else if (name == 'totalRevenuePlateform') {
         return data?.map((v) => {
            v.bookingDateTime = formatDateTime(v?.bookingDateTime)
            v.createdOn = formatDate(v?.createdOn)
            return {
              name: v?.userName,
               mobileNumber:v?.userMobile,
               email:v?.userEmail,
               city:v?.userCity,
               bookingDateTime: v?.bookingDateTime,
               bookingId: v?.bookingId,
               companyName: v?.companyName ? v.companyName : 'N/A',
               serviceManAlloted: v?.allocatedStaff,
               category: v?.category,
               reservationDate: v?.createdOn,
               totalCharges: v.amount,
               paymentStatus: v.paymentStatus,
               address: v.address,
               paymentMode: v.paymentMode ? v.paymentMode : 'COD',
            }
         })
      } else if (name == 'totalRevenueCompany') {
         return data?.map((v) => {
            v.bookingDateTime = formatDateTime(v?.bookingDateTime)
            v.createdOn = formatDate(v?.createdOn)
            return {
               name: v?.userName,
               bookingDateTime: v?.bookingDateTime,
               bookingId: v?.bookingId,
               companyName: v?.companyName ? v.companyName : 'N/A',
               serviceManAlloted: v?.allocatedStaff,
               category: v?.category,
               reservationDate: v?.createdOn,
               totalCharges: v.amount,
               paymentStatus: v.paymentStatus,
               email: v.address,
               paymentMode: v.paymentMode ? v.paymentMode : 'COD',
            }
         })
      } else if (name == 'totalReview') {
         return data?.map((v) => ({
            userName: v?.userName,
            email: v?.email,
            mobileNumber: v?.mobileNumber,
            bookingId: v?.bookingId,
            category: v?.category,
            companyName: v.companyName ? v.companyName : 'N/A',
            staffName: v?.staffName,
            serviceFeedBack: v?.serviceFeedBack,
            serviceRating: v?.serviceRating,
            staffFeedBack: v?.staffFeedBack,
            staffRating: v?.staffRating,
         }))
      }
   }

   function formatDateTime(timestamp) {
      const date = new Date(timestamp)

      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear().toString().slice(-2)

      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'

      return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`
   }

   function formatDate(timestamp) {
      const date = new Date(timestamp)

      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear().toString().slice(-2)

      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'

      return `${day}/${month}/${year}`
   }

   function DownloadReport(name, fileName) {
      api.post('reportData', {
         type: name,
      })
         .then((result) => {
            console.log(result, 'newResult')
            if (result?.data?.length == 0) {
               toast.error('No Data Found')
               return
            }
            downloadExcel({
               fileName: fileName,
               sheet: fileName,
               tablePayload: {
                  header: Header(name),
                  // accept two different data structures
                  body: Body(name, result?.data),
               },
            })
         })
         .catch((err) => {
            toast.error(err?.message)
         })
   }

   return (
      <div>
         <div className="bdc-container-content">
            <h1 className="bdc-item">Report Management</h1>
         </div>

         <div className={styles.container}>
            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalUser', 'Total Users')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total Users Registered On Platform
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>

            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('newUser', 'New Users')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Recently Joined Users{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>
            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalCompany', 'Total Company')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total Company Added{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>

            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalIndevidual', 'Total Individual')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total Individual Added{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>
            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalCompleteService', 'Total Completed Services')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total No. Of Completed Services{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>
            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalOngoingService', 'Total Ongoing Bookings')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total No. Of On-Going Bookings{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>

            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalCancelledService', 'Total Cancelled Bookings')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total No. Of Cancelled{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>

            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalRevenuePlateform', "Total Platform's Revenue")
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total Revenue Generated Through The Platform{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>

            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalRevenueCompany', "Total Company's Revenue")
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total Revenue Generated By Company{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>

            <CCard className={styles.cardContent}>
               <CCardBody
                  onClick={() => {
                     DownloadReport('totalReview', 'Total Review')
                  }}
                  style={{ cursor: 'pointer' }}
               >
                  <h5>
                     Total Reviews and Ratings{' '}
                     <span>
                        <AiOutlineDownload size={30} />{' '}
                     </span>{' '}
                  </h5>
               </CCardBody>
            </CCard>
         </div>
      </div>
   )
}

export default Index
