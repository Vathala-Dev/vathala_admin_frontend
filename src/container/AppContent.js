import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { useGlobalStore } from 'src/utils/store'



const AppContent = () => {

const token = localStorage.getItem("token")
console.log(token,"userToken");
const location = useLocation()
const {userDetails} = useGlobalStore(state => state)
console.log(userDetails,"userDetailsNav");

function Accessible(name){
  
  console.log(userDetails?.accessModule.filter(v => v?.title == name),"gotIt");
  if(userDetails?.adminType == "subAdmin"){
  if(userDetails?.accessModule.filter(v => v?.title == name).length > 0){
    if(userDetails?.accessModule.filter(v => v?.title == name)[0]?.access == "View Only"){
      return true
    }
  }
  }
}


  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes >
          {routes.map((route, idx) => {
            console.log(Accessible(route.name),"routeAll");
            return (
              route.element && (
                <Route
                  key={idx}           
                  path={route.path}        
                  exact={route.exact}
                  name={route.name}
                  element={<route.element show={Accessible(route.name)}  />}
                />
              )
            )
          })}
          {token ? 
          <Route path="/" element={<Navigate to={"/adminpanel/dashboard"} replace />} /> :
          <Route path="/" element={<Navigate to={"/adminpanel/login"} replace />} />
        }
          
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
