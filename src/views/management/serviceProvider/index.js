import { CCard, CCardBody } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import IndividualTable from './individualTable'
import ProviderTable from './providerTable'
import styles from "./style.module.css"

function Index({ show }) {

   const [provider, setProvider] = useState(1)
   const [service, setService] = useState(1)
   const [searchKey, setSearchKey] = useState("")




   useEffect(() => {
      setSearchKey("")
   }, [provider])



   return (
      <div>
         <div className='bdc-container-content' >
            <h1 className="bdc-item" >Service Provider Management</h1>
            <div className={styles.firstContainer} >
               <div  >
                  <AiOutlineSearch className="searchIcon" />
                  <input type="text" placeholder="Search" className="searchInput" value={searchKey} onChange={(e) => {

                     setSearchKey(e.target.value)
                  }} />
               </div>
               <div className={provider === 1 ? styles.selected : styles.unselected} onClick={() => setProvider(1)} >Provider</div>
               <div className={provider === 2 ? styles.selected : styles.unselected} onClick={() => setProvider(2)} >Individual</div>
            </div>
         </div>

         <CCard>
            <CCardBody>

               <div className={styles.secondContainer} >
                  <div className={service === 1 ? styles.selected : styles.unselected} onClick={() => setService(1)} >New Request</div>
                  <div className={service === 2 ? styles.selected : styles.unselected} onClick={() => setService(2)} >Accepted</div>
                  <div className={service === 3 ? styles.selected : styles.unselected} onClick={() => setService(3)} >Rejected</div>
               </div>

               {provider == 2 ? <IndividualTable currService={service} searchKey={searchKey} show={!show} /> : <ProviderTable currService={service} searchKey={searchKey} show={!show} />}




            </CCardBody>

         </CCard>
      </div>
   )
}

export default Index