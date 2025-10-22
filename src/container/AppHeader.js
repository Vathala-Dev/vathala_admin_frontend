import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import "./style.css"

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { useGlobalStore } from 'src/utils/store'

const AppHeader = () => {

  const {setSidebarShow,notifyCount,notify} = useGlobalStore((state) => state)
  const [showBreadCrumb, setShowBreadCrumb] = useState(true)

  return (
    <CHeader position="sticky" style={{backgroundColor:"#f5f5f5",paddingLeft:0,paddingBottom:0}} >
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={setSidebarShow}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {/* <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href='/adminpanel/notification' className='position-relative'  >
              
              <CIcon icon={cilBell} size="lg" />
           {notify && <span class="position-absolute top-2 start-80 translate-middle badge rounded-pill bg-info">
    {notifyCount}
    <span class="visually-hidden">unread messages</span>
  </span>}
            </CNavLink>
          </CNavItem>
         
       
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider className='mb-0' />
    {/* {showBreadCrumb && <CContainer fluid className='breadcrumb-div' >
        <AppBreadcrumb setShowBreadCrumb={setShowBreadCrumb} />
      </CContainer>} */}
    </CHeader>
  )
}

export default AppHeader
