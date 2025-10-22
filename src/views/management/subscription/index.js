import { CCard, CCardBody } from '@coreui/react'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { toast } from 'react-toastify'
import api from 'src/utils/api'
import FeatureTable from './featureTable'

import PlanTable from './planTable'

import styles from "./style.module.css"

function Index({show}) {


const [service, setService] = useState(1)
const [allFeatures, setAllFeatures] = useState([])
const [refresh, setRefresh] = useState(0)
const [featuresPopup, setFeaturesPopup] = useState(false)
const [addPlan, setAddPlan] = useState(false)
const [mainService, setMainService] = useState([])
const [searchKey, setSearchKey] = useState("")


useEffect(() => {
  getAllUsers()
}, [refresh])

useEffect(() => {
  setSearchKey("")
}, [service])



console.log(mainService,"mainService");


function getAllUsers(){
  api.get("getAllSubsFeature").then(result => {
    console.log(result,"getAllUsers");
    if(result?.status_code == "200"){
     
          setAllFeatures(result?.response?.map((v,i) => ({...v, newId: i})))
  
      
    }else{
      localStorage.clear()
      toast.success("Sign Out Successfully")
    }
  }).catch(err => {
    console.log(err);
  })
}


  return (
    <div>
      <div className='bdc-container-content' >
        <h1 className="bdc-item" >Subscription Plan Management</h1>
        {/* <div>
        <div style={{display:"inline-block",marginRight:"20px"}} >
  <AiOutlineSearch className={styles.searchIcon} />
  <input type="text" placeholder="Search" className={styles.searchInput} value={searchKey} onChange={(e) => {

    setSearchKey(e.target.value) }}  />
</div>
{ !show && <Button variant="contained" className={styles.acceptCta} onClick={() => {
          if(service == 1){
            setFeaturesPopup(true)
          }else{
            if(mainService?.length < 3){
              setAddPlan(true)
            }else{
              toast.error("You can only add only 3 subscription")
            }
          }
        }}  >Add New {service == 1 ? "Feature" : "Plan"}</Button>}
        </div>

        */}
      </div>
    <CCard>
 <CCardBody>
 <div className={styles.firstContainer} >
    <div className={service === 1 ? styles.selected : styles.unselected } onClick={() => setService(1)} >Features</div>
    <div className={service === 2 ? styles.selected : styles.unselected } onClick={() => setService(2)} >Plan</div>
 </div>

 {service == 1 ? <FeatureTable searchKey={searchKey} show={!show} refresh={refresh} featuresPopup={featuresPopup} setFeaturesPopup={setFeaturesPopup} setRefresh={setRefresh} allFeatures={allFeatures}   /> : <PlanTable show={!show} searchKey={searchKey} allFeatures={allFeatures} addPlan={addPlan} setAddPlan={setAddPlan} setMainService={setMainService} /> }

 


 </CCardBody>

    </CCard>
    </div>
  )
}

export default Index