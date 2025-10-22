import { CCard, CCardBody } from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'
import SimpleDatePicker from 'src/components/common/datePicker'
import api from 'src/utils/api'
import { getUniqueListBy } from 'src/utils/common'


import styles from "./style.module.css"
import IndividualTable from './table'
import { Button } from '@mui/material'
import { downloadExcel } from 'react-export-table-to-excel'

function Index({show}) {


const [service, setService] = useState(2)
const [searchKey, setSearchKey] = useState("")

const [fromDate, setFromDate] = useState("")
const [toDate, setToDate] = useState("")
const [allService, setAllService] = useState([])
const [refresh, setRefresh] = useState(0)


console.log(show,"showaccess");


useEffect(() => {
  getAllUsers()
}, [service,refresh,searchKey,fromDate,toDate])


function getAllUsers(){
  api.post("getPymentData",{
    search:searchKey,
    type: service,
    fromDate:Number(moment(fromDate).format("X")) * 1000 ,
    toDate:Number(moment(toDate).format("X")) * 1000 ,
  }).then(result => {
    console.log(result,"allPayment");
          setAllService(result?.data?.map((v,i) => ({...v, newId: i})))        
           
  }).catch(err => {
    console.log(err);
  })
}



useEffect(() => {
   setSearchKey("")
}, [])


function handleDownloadExcel() {
  downloadExcel({
    fileName: "payment_mgmt",
    sheet: "users",
    tablePayload: {
     header : ["No.","UserName","Service Provider Name","Transaction Id","Amount","Commission Amount","Payment Method","Date","Time","Service Name"] ,
      // accept two different data structures
      body: allService.map(user => ({newId: user.newId + 1, name: user.userName,serviceProviderName:user.serviceProviderName,transectionId:user.transectionId,amount:user?.amount,commAmount:user?.commAmount,paymentMode:user?.paymentMode,
        date:moment(user?.cretedOn).format("DD/MM/YYYY"),time:moment(user?.cretedOn).format("hh:mm a"),service:user?.serviceName})),
    },
  });
}

  return (
   <div>
       <div className='bdc-container-content' >
        <h1 className="bdc-item" >Payment Management</h1>
        <div className={styles.secondContainer} >
    <div className={service === 2 ? styles.selected : styles.unselected } onClick={() => setService(2)} >Company</div>
    <div className={service === 1 ? styles.selected : styles.unselected } onClick={() => setService(1)} >Individual</div>

 </div>
        <div  >
  <AiOutlineSearch className="searchIcon" />
  <input type="text" placeholder="Search" className="searchInput" value={searchKey} onChange={(e) => {

    setSearchKey(e.target.value) }}  />
 
 </div>
      </div>
  
    <CCard>
 <CCardBody>

 <div className='d-flex justify-content-between align-items-center mx-3 mb-4 mt-2' style={{gap:"5rem"}}  >

<div className='d-flex' >
<div className='d-flex align-items-center me-5' >
  <label className='me-2' >From</label>
  <SimpleDatePicker value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
</div>

<div className='d-flex align-items-center'>
  <label className='me-2' >To</label>
  <SimpleDatePicker value={toDate} onChange={(e) => setToDate(e.target.value)} />

</div>
</div>


<Button variant="contained" className={styles.acceptCta} onClick={handleDownloadExcel} >Export</Button>


</div>




<IndividualTable show={show} currService={service} allService={allService} setRefresh={setRefresh} refresh={refresh} searchKey={searchKey} />
 


 </CCardBody>

    </CCard>
    </div>
  )
}

export default Index