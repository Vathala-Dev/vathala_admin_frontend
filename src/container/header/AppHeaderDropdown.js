import React, { useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAirplaneModeOff,
  cilDialpad,
  cilExitToApp,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { toast } from 'react-toastify'
import api from 'src/utils/api'
import { Switch } from '@mui/material'
import { Form } from 'react-bootstrap'
import { useGlobalStore } from 'src/utils/store'

const AppHeaderDropdown = () => {


const {notify,setNotify} = useGlobalStore(state => state)

  function ChangeNotification(status) {
    api.post("changeNotificationStatus",{status}).then(res => {
      console.log(res,"changeNotificationStatus");
      setNotify(res?.data?.notificationStatus)

      toast.success("Notification Status Changed Successfully")
    }).catch(err => {
      toast.error(err?.message)
    })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
      <CIcon icon={cilUser} size="lg"/>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
     
        <CDropdownItem href="/adminpanel/profile">
        <CIcon icon={cilUser} className="me-2"/>
          Profile
       
        </CDropdownItem>
        <CDropdownItem href="/adminpanel/change-password">
        <CIcon icon={cilDialpad} className="me-2"/>
          Change Password
       
        </CDropdownItem>
     
        <CDropdownItem >
        <CIcon icon={cilBell} className="me-2"/>
          Notification
         <Form.Check type="switch" id="custom-switch" className='ms-2 d-inline' checked={notify} onClick={(e) => {
          e.stopPropagation()
          ChangeNotification(!notify)
         }} />
        </CDropdownItem>
    
        <CDropdownDivider />
        <CDropdownItem href='/adminpanel/login' onClick={() => {
          localStorage.clear()
          toast.success("Sign Out Successfully")
          
          } }>
          <CIcon icon={cilExitToApp} className="me-2" />
          Sign Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
