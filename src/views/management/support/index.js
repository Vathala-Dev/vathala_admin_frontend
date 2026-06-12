import { CCard, CCardBody } from '@coreui/react'
import { Button } from '@mui/material'
import React from 'react'
import styles from "../blogs/style.module.css";
import { BiEdit } from 'react-icons/bi';
const index = () => {
    return (
        <>
            <div className="bdc-container-content">
                <h1 className="bdc-item">Support Number Management</h1>
            </div>
            <div>
                <div>
                    <CCard>
                        <CCardBody>
                            <div>
                                <p><div><span className='tooltip'>i</span></div>Flag:<span> True</span>   <BiEdit
                                    style={{
                                        fontSize: '24px',
                                        color: '#006d5b',
                                        cursor: 'pointer',
                                    }} /></p> 

                                <p>Support Number:<span> 9879696</span> </p>
                            </div>
                        </CCardBody>
                    </CCard>
                </div>
            </div >
        </>)
}

export default index