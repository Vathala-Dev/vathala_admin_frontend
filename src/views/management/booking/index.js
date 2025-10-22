import { CCard, CCardBody } from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai'
import SimpleDatePicker from 'src/components/common/datePicker'
import api from 'src/utils/api'
import { getUniqueListBy } from 'src/utils/common'

import styles from './style.module.css'
import IndividualTable from './table'

function Index({ show }) {
   const [provider, setProvider] = useState(2)
   const [service, setService] = useState('ongoing')

   const [searchKey, setSearchKey] = useState('')
   const [sortByDate, setSortByDate] = useState('desc')

   console.log(show, 'showaccess')

   useEffect(() => {
      setSearchKey('')
   }, [])

   return (
      <div>
         <div className="bdc-container-content">
            <h1 className="bdc-item">Booking Management</h1>
            <div className={styles.secondContainer}>
               <div
                  className={service === 'ongoing' ? styles.selected : styles.unselected}
                  onClick={() => setService('ongoing')}
               >
                  On-going
               </div>
               <div
                  className={service === 'completed' ? styles.selected : styles.unselected}
                  onClick={() => setService('completed')}
               >
                  Completed
               </div>
               <div
                  className={service === 'cancelled' ? styles.selected : styles.unselected}
                  onClick={() => setService('cancelled')}
               >
                  Cancelled
               </div>
            </div>
            <div>
               <AiOutlineSearch className="searchIcon" />
               <input
                  type="text"
                  placeholder="Search"
                  className="searchInput"
                  value={searchKey}
                  onChange={(e) => {
                     setSearchKey(e.target.value)
                  }}
               />
            </div>
         </div>

         <CCard>
            <CCardBody>
               <div
                  className="d-flex justify-content-between align-items-center mx-3 mb-4 mt-2"
                  style={{ gap: '5rem' }}
               >
                  <div className="d-flex align-items-center">
                     <label className="me-2">Sort</label>
                     <Form.Group>
                        <Form.Select
                           onChange={(e) => setSortByDate(e.target.value)}
                           value={sortByDate}
                        >
                           <option value="desc">Newer To Older</option>
                           <option value="aesc">Older To Newer</option>
                        </Form.Select>
                     </Form.Group>
                  </div>

                  <div className={styles.thirdContainer}>
                     <div
                        className={provider === 1 ? styles.unselected : styles.selected}
                        onClick={() => setProvider(2)}
                     >
                        Company
                     </div>
                     <div
                        className={provider === 2 ? styles.unselected : styles.selected}
                        onClick={() => setProvider(1)}
                     >
                        Individual
                     </div>
                  </div>
               </div>

               <IndividualTable
                  show={show}
                  currService={service}
                  provider={provider}
                  searchKey={searchKey}
                  sortByDate={sortByDate}
               />
            </CCardBody>
         </CCard>
      </div>
   )
}

export default Index
