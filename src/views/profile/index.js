import { CCard, CCardBody } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import FilePicker from 'src/components/common/imageUploader'
import UploadImg from "src/assets/images/upload.png"
import styles from "./style.module.css"
import SimpleInput from 'src/components/common/simpleInput'
import { Button } from '@mui/material'
import api from 'src/utils/api'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function Index() {

const [selectedImg, setSelectedImg] = useState()
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [number, setNumber] = useState("")


useEffect(() => {
    getProfile()
}, [])


function ProfileFunc() {

if(!name || !email || !number || !selectedImg){
    toast.error("All fields are required")
    return
}

let mailFormat = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
let numberFormat = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/);

  
  if(!mailFormat.test(email)){
    toast.error("Please input valid email");
    return
  }

  if(!numberFormat.test(number) || number.length > 10 ){
    toast.error("Please input valid phone number");
    return
  }

    api.post("updateProfile",{
        "profile_image" : selectedImg,
        "name" : name,
        "mobile_number" : number,
        "country_code" : "+91",
        "email" : email
    }).then(res => {
        console.log(res,"response");
        toast.success(res?.message)
    }).catch(err => {
        toast.error(err?.message)
    })
}

function getProfile() {
    api.get("getProfileDetails").then(res => {
        console.log(res,"getProfile");
        setName(res?.data?.name)
        setEmail(res?.data?.email)
        setNumber(res?.data?.mobile_number)
        setSelectedImg(res?.data?.profile_image)
    }).catch(err => {
        toast.error(err)
    })
}

  return (
    <div>
          <div className='bdc-container-content' >
        <h1 className="bdc-item" >Profile</h1>
     
      
      </div>

  
    <CCard>
        <CCardBody>

     
            <FilePicker
       onGetUrl={(url) => setSelectedImg(url)}
       imageUrl={selectedImg ? `http://52.66.187.242:3001${selectedImg}` : UploadImg}
       bodyWidth="150px"
       bodyHeight="150px"
       />

<div className={styles.container} >

    <div className='mt-4' >
        <SimpleInput style={{width:"40rem",marginBottom:"2rem",display:"flex",gap:"2.5rem"}} title="Name"  onChange={(e) => setName(e.target.value) } value={name} />
        <SimpleInput style={{width:"40rem",marginBottom:"2rem",display:"flex",gap:"2.5rem"}} title="Email"  placeholder="xyz@gmail.com" onChange={(e) => setEmail(e.target.value) } value={email} />
        <SimpleInput style={{width:"40rem",marginBottom:"2rem",display:"flex",gap:"1rem"}} title="Mobile No." onChange={(e) => setNumber(e.target.value) } value={number} />
        <div className="text-center mb-1">
                     <Button variant="contained" className={styles.acceptCta} onClick={ProfileFunc} type="button">
                        {"Save"}
                     </Button>
                  </div>
    </div>
</div>
        </CCardBody>
    </CCard>
    </div>
  )
}

export default Index