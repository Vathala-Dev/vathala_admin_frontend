import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../container/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3 pt-3 " style={{backgroundColor:"#deebe8"}} >
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
