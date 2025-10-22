import { CCard, CCardBody } from '@coreui/react'
import styles from "./style.module.css"
import React from 'react'
import SimpleInput from 'src/components/common/simpleInput'
import { Button } from '@mui/material'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import api from 'src/utils/api'
import { toast } from 'react-toastify'
import { useEffect } from 'react'


function Index() {

    const [allUsers, setAllUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [selectedProvider, setSelectedProvider] = useState([])
    const [selectedIndividualProvider, setSelectedIndividualProvider] = useState([])
    const [allProvider, setAllProvider] = useState([])
    const [allIndividualProvider, setAllIndividualProvider] = useState([])
    const [userSearchKey, setUserSearchKey] = useState("")
    const [providerSearchKey, setProviderSearchKey] = useState("")
    const [individualSearchKey, setIndividualSearchKey] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState('')

    const [checkAllUser, setCheckAllUser] = useState(false)
    const [checkAllCompany, setCheckAllCompany] = useState(false)
    const [checkAllIndividual, setCheckAllIndividual] = useState(false)
console.log(allUsers,allProvider,"allUsers");
console.log(selectedUser,"selectedUser");


function SendNoti(){

    if(!title || !description){
        toast.error("Title and Description are required")
        return
    }

    if(selectedUser.length == 0 && selectedProvider.length == 0 && selectedIndividualProvider.length == 0 ){
        toast.error("No user or provider is selected to send notification")
        return
    }

    api.post("sendNotification",{
        "title" : title,
        "description" : description,
        "userIds" : selectedUser,
        "serviceProviders" : selectedProvider,
        "serviceIndividual" : selectedIndividualProvider
    }).then(res => {
        console.log(res,"response");
        toast.success(res?.message)
        setTitle("")
        setDescription("")
        setSelectedUser([])
        setSelectedProvider([])
    }).catch(err => {
        toast.error(err)
    })
}

    useEffect(() => {
        getAllUsers()
    }, [userSearchKey])
    
        useEffect(() => {
          getAllProvider()
      }, [providerSearchKey])


      useEffect(() => {
        getAllIndividualProvider()
    }, [individualSearchKey])


    function getAllUsers(){
        api.post("getAllUsers",{search:userSearchKey}).then(result => {
          console.log(result,"getAllUsers");
   
            setAllUsers(result?.response?.map((v,i) => ({...v, newId: i})) )
         
        }).catch(err => {
          console.log(err);
        })
      }

      function getAllProvider(){
        api.post("getAllServiceCompany",{search:providerSearchKey}).then(result => {
          console.log(result,"getAllUsers");

            setAllProvider(result?.response?.acceptedData)     
        }).catch(err => {
          console.log(err);
        })
      }

      function getAllIndividualProvider(){
        api.post("getAllServiceIndividual",{search:individualSearchKey}).then(result => {
          console.log(result,"getAllUsers");

          setAllIndividualProvider(result?.response?.acceptedData)     
        }).catch(err => {
          console.log(err);
        })
      }

      function areArraysSimilar(arr1, arr2) {
        // Sort the arrays
        const sortedArr1 = arr1.slice().sort();
        const sortedArr2 = arr2.slice().sort();
    
        // Check if the sorted arrays are equal
        return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
    }    

  return (
    <CCard>
        <CCardBody>
            <div className={styles.container} >
                 <div className={styles.content1} >
                    <SimpleInput title="Notification Title" groupClassName="mb-5 mt-3" onChange={(e) => setTitle(e.target.value)} value={title} />
                    <SimpleInput textArea title="Description" groupClassName="mb-4" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className="text-center mb-1">
                     <Button variant="contained" className={styles.acceptCta} onClick={SendNoti} type="button">
                        {"Send"}
                     </Button>
                  </div>
                 </div>
                 <div className={styles.content2} style={{width:"260px"}} >
                    <h4>Users</h4>
                    <div className='position-relative' >
  <AiOutlineSearch className="searchIcon" />
  <input type="text" placeholder="Search" className="searchInput" value={userSearchKey} onChange={(e) => {
setUserSearchKey(e.target.value) }}  />
 </div>
 <div className='mt-3' > 
 <div className={styles.checkCta}  >
 <input type="checkbox" checked={checkAllUser} onChange={()=>{
  if(!checkAllUser){
      let arr = allUsers.map((ele)=> { return ele._id })
       setSelectedUser(arr)
    }else{
      setSelectedUser([])
    }
    console.log(selectedUser)
    setCheckAllUser(!checkAllUser)
  }} /><p>ALL</p>
</div>

 {allUsers?.filter(k => k?.first_name != "NA")?.map(v => {
return  <div className={styles.checkCta} >
<input type="checkbox" checked={selectedUser?.includes(v?._id)} onClick={() => {
    if(selectedUser?.includes(v?._id)){
        const index = selectedUser.indexOf(v?._id)
        let arr = [...selectedUser]
        if (index > -1) { 
            arr.splice(index, 1);
          }
          setSelectedUser(arr)
    }else{
        let arr = [...selectedUser]
        arr.push(v?._id)
        setSelectedUser(arr)
    }
}} />
<p>{v?.first_name + " " + v?.last_name}</p>
</div>
 })}
   
 </div>
                 </div>
                 <div className={styles.content3} style={{width:"260px"}}>
                    <h4>Company</h4>
                    <div className='position-relative'  >
  <AiOutlineSearch className="searchIcon" />
  <input type="text" placeholder="Search" className="searchInput" value={providerSearchKey} onChange={(e) => {

setProviderSearchKey(e.target.value) }}  />
 
 </div>
 <div className='mt-3' >
 <div className={styles.checkCta}  >
 <input type="checkbox" checked={checkAllCompany} onChange={()=>{
  if(!checkAllCompany){
      let arr = allProvider.map((ele)=> { return ele._id })
      setSelectedProvider(arr)
    }else{
      setSelectedProvider([])
    }
    console.log(selectedUser)
    setCheckAllCompany(!checkAllCompany)
  }} /><p>ALL</p>
</div>
 
 {allProvider?.map(v => {
return  <div className={styles.checkCta} >
<input type="checkbox" checked={selectedProvider?.includes(v?._id)}
onClick={() => {
    if(selectedProvider?.includes(v?._id)){
        const index = selectedProvider.indexOf(v?._id)
        let arr = [...selectedProvider]
        if (index > -1) { 
            arr.splice(index, 1);
          }
          setSelectedProvider(arr)
    }else{
        let arr = [...selectedProvider]
        arr.push(v?._id)
        setSelectedProvider(arr)
    }
}}
/>
<p>{v?.companyName}</p>
</div>
 })}
 </div>
 
                 </div>


                 <div className={styles.content3} style={{width:"260px"}}>
                    <h4>Individual</h4>
                    <div className='position-relative'  >
  <AiOutlineSearch className="searchIcon" />
  <input type="text" placeholder="Search" className="searchInput" value={individualSearchKey} onChange={(e) => {

setIndividualSearchKey(e.target.value) }}  />
 
 </div>
 <div className='mt-3' >
 <div className={styles.checkCta}  >
 <input type="checkbox" checked={checkAllIndividual} onChange={()=>{
  if(!checkAllIndividual){
      let arr = allIndividualProvider.map((ele)=> { return ele._id })
      setSelectedIndividualProvider(arr)
    }else{
      setSelectedIndividualProvider([])
    }
    console.log(selectedUser)
    setCheckAllIndividual(!checkAllIndividual)
  }} /><p>ALL</p>
</div>
 
 {allIndividualProvider?.map(v => {
return  <div className={styles.checkCta} >
<input type="checkbox" checked={selectedIndividualProvider?.includes(v?._id)}
onClick={() => {
    if(selectedIndividualProvider?.includes(v?._id)){
        const index = selectedIndividualProvider.indexOf(v?._id)
        let arr = [...selectedIndividualProvider]
        if (index > -1) { 
            arr.splice(index, 1);
          }
          setSelectedIndividualProvider(arr)
    }else{
        let arr = [...selectedIndividualProvider]
        arr.push(v?._id)
        setSelectedIndividualProvider(arr)
    }
}}
/>
<p>{v?.name}</p>
</div>
 })}
 </div>
 
                 </div>
                 
            </div>
        </CCardBody>
    </CCard>
  )
}

export default Index