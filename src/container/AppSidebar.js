import React from 'react'


import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import Logo from "src/assets/images/logo.png"
import "./style.css"
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import Nav from 'src/_nav'
import { useGlobalStore } from 'src/utils/store'

const AppSidebar = () => {

  const {sidebarShow} = useGlobalStore((state) => state)


  return (
    <CSidebar
      position="fixed"
      unfoldable={false}
      visible={sidebarShow}
      style={{backgroundImage: "linear-gradient(#006D5B,#033639)"}}
      onVisibleChange={(visible) => {
        console.log(visible,"visible");
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
       <img src={Logo} style={{width:"62%"}} />
      </CSidebarBrand>
      <CSidebarNav className='sidebar-nav' >
        <SimpleBar>
          <AppSidebarNav items={Nav()} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
