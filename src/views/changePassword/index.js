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


const [oldPass, setOldPass] = useState("")
const [newPass, setNewPass] = useState("")
const [confirmPass, setConfirmPass] = useState("")




function ProfileFunc() {

if(!oldPass || !newPass || !confirmPass ){
    toast.error("All fields are required")
    return
}

if(newPass !== confirmPass ){
    toast.error("New and Confirm Password doesn't match")
    return
}

    api.post("updatePassword",{
        oldPassword : oldPass,
        newPassword: newPass
    }).then(res => {
        console.log(res,"response");
        toast.success(res?.message)
        setOldPass("")
        setNewPass("")
        setConfirmPass("")
    }).catch(err => {
        toast.error(err?.message)
    })
}



  return (
    <div>
           <div className='bdc-container-content' >
        <h1 className="bdc-item" >Change Password</h1>
   
      </div>
      <CCard>
        <CCardBody>


<div className={styles.container} >

    <div className='mt-4' >
        <SimpleInput labelStyle={{width:"30%"}} style={{width:"40rem",marginBottom:"2rem",display:"flex",gap:"1.5rem",alignItems:"center"}} title="Old Password"  onChange={(e) => setOldPass(e.target.value) } value={oldPass} />

        <SimpleInput labelStyle={{width:"30%"}} style={{width:"40rem",marginBottom:"2rem",display:"flex",gap:"1.5rem",alignItems:"center"}} title="New Password"  onChange={(e) => setNewPass(e.target.value) } value={newPass} />

        <SimpleInput labelStyle={{width:"30%"}} style={{width:"40rem",marginBottom:"2rem",display:"flex",gap:"1.5rem",alignItems:"center"}} title="Confirm Password"  onChange={(e) => setConfirmPass(e.target.value) } value={confirmPass} />

        <div className="text-center mb-1">
                     <Button variant="contained" className={styles.acceptCta} onClick={ProfileFunc} type="button">
                        {"Submit"}
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