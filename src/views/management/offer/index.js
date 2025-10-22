import { CCard, CCardBody } from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai'
import SimpleDatePicker from 'src/components/common/datePicker'
import api from 'src/utils/api'
import { getUniqueListBy } from 'src/utils/common'


import styles from "./style.module.css"
import IndividualTable from './table'

function Index({show}) {

const [provider, setProvider] = useState(1)
const [service, setService] = useState(1)
const [searchKey, setSearchKey] = useState("")
const [sortByDate, setSortByDate] = useState("desc")
const [sortByProvider, setSortByProvider] = useState("")
const [fromDate, setFromDate] = useState("")
const [toDate, setToDate] = useState("")
const [allProvider, setAllProvider] = useState([])

console.log(sortByProvider,"sortByProvider");
console.log(allProvider,"allProvider");
console.log(show,"showaccess");


useEffect(() => {
   setSearchKey("")
}, [provider])

useEffect(() => {
  getAllProvider()
}, [])



function getAllProvider(){
  api.post("getAllServiceCompany").then(result => {

        api.post("getAllServiceIndividual").then(newResult => {
  
          setAllProvider(getUniqueListBy([...result?.response?.acceptedData,...newResult?.response?.acceptedData],"name"))
          
      
        }).catch(err => {
          console.log(err);
        })
  }).catch(err => {
    console.log(err);
  })


}


  return (
   <div>
       <div className='bdc-container-content' >
        <h1 className="bdc-item" >Offer Management</h1>
        <div className={styles.secondContainer} >
    <div className={service === 1 ? styles.selected : styles.unselected } onClick={() => setService(1)} >New</div>
    <div className={service === 2 ? styles.selected : styles.unselected } onClick={() => setService(2)} >Accept</div>
    <div className={service === 3 ? styles.selected : styles.unselected } onClick={() => setService(3)} >Reject</div>
    <div className={service === 4 ? styles.selected : styles.unselected } onClick={() => setService(4)} >Expired</div>
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
<div className='d-flex align-items-center' >
  <label className='me-2' >Sort</label>
  <Form.Group >
        <Form.Select onChange={(e) => setSortByDate(e.target.value)} value={sortByDate} >
          <option value="desc" >Newer To Older</option>
          <option value="aesc" >Older To Newer</option>
        </Form.Select>
      </Form.Group>
</div>
<div className='d-flex align-items-center' >
  <label className='me-2' >Sort by Provider</label>
  <Form.Group >
        <Form.Select onChange={(e) => setSortByProvider(e.target.value)} value={sortByProvider} >
        <option value="" >Select Provider</option>
           {allProvider?.map(v => {
            return <option value={v?._id} >{v?.name}</option>
           })}
        </Form.Select>
      </Form.Group>
</div>

<div className='d-flex align-items-center' >
  <label className='me-2' >From</label>
  <SimpleDatePicker value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

</div>
<div className='d-flex align-items-center' >
  <label className='me-2' >To</label>
  <SimpleDatePicker value={toDate} onChange={(e) => setToDate(e.target.value)} />

</div>



</div>




<IndividualTable show={show} currService={service} fromDate={Number(moment(fromDate).format("X")) * 1000 } toDate={Number(moment(toDate).format("X")) * 1000 } searchKey={searchKey} sortByDate={sortByDate} providerId={sortByProvider} />
 


 </CCardBody>

    </CCard>
    </div>
  )
}

export default Index