import { Button, Switch, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CustomTable from 'src/components/common/table';
import api from 'src/utils/api';
import { createData } from 'src/utils/common';
import styles from "./style.module.css"
import {AiFillEye, AiOutlineSearch} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImBin } from 'react-icons/im';
import CommonModal from 'src/components/common/modal';
import { BiEdit } from 'react-icons/bi';
import moment from 'moment';

function IndividualTable({currService,refresh,setRefresh,show,allService = []}) {


    
    
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [showDeletePopup, setShowDeletePopup] = useState("")
const navigate = useNavigate()



  let rows = allService


const emptyRows =
page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

function DeletePlan(id) {
  api.post("removeOffer",{
    offerId:id
  }).then(result => {
    toast.success(result?.message)
    setRefresh(refresh + 1)
    setShowDeletePopup("")
  }).catch(err => {
    toast.error(err?.message)
  })
}

function Headers(){
  if(!show){
    if(currService == 1){
      return ["No.","UserName","Service Provider Name","Transaction Id","Amount","Commission Amount","Payment Method","Date","Time","Category Name","Service Name"] 
  }else if(currService == 2){
      return ["No.","UserName","Company Name","Service Provider Name","Transaction Id","Amount","Commission Amount","Payment Method","Date","Time","Category Name","Service Name"] 
  }

  else{
      return ["No.","UserName","Service Provider Name","Transaction Id","Amount","Commission Amount","Payment Method","Date","Time","Category Name","Service Name"] 
  }
  }else{
    if(currService == 1){
      return ["No.","UserName","Service Provider Name","Transaction Id","Amount","Commission Amount","Payment Method","Date","Time","Category Name","Service Name"] 
  }else if(currService == 2){
    return ["No.","UserName","Company Name","Service Provider Name","Transaction Id","Amount","Commission Amount","Payment Method","Date","Time","Category Name","Service Name"] 
  }

  else{
      return ["No.","UserName","Service Provider Name","Transaction Id","Amount","Commission Amount","Payment Method","Date","Time","Category Name","Service Name"] 
  }
  }
   
}



function ActionCta(row){
  if(!show){
    if(currService){
      return  <TableCell  align="center" style={{minWidth:"200px"}} >
      <div className={styles.action}  >
      <ImBin style={{fontSize:"28px",color:"#d21313",cursor:"pointer"}} onClick={() => setShowDeletePopup(row?._id) } />
    </div> 
    </TableCell>
  }else{
      return
  }
  }
}


  return (
<div>

<CommonModal
show={showDeletePopup}
setShow={setShowDeletePopup}
bodyContent={
  <div className='text-center' >
    <ImBin  style={{fontSize:"30px",color:"#d21313"}} />
    <p className='mt-2 fs-5' >Are you sure, you want to delete this ?</p>
    <div className={styles.modalConCta} >
    <Button variant="contained" className={styles.acceptCta} onClick={() => DeletePlan(showDeletePopup) }  >Yes</Button>
    <Button  className={styles.rejectCta}  variant="outlined" onClick={() => setShowDeletePopup("") } >No</Button>
    </div>
    
    <div>
      
    </div>
  </div>
}
/>



    <CustomTable rows={rows} header={Headers()} page={page} rowsPerPage={rowsPerPage} setPage={setPage} setRowsPerPage={setRowsPerPage} tableContent={
        <TableBody>
        {(rowsPerPage > 0
          ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row,i) => {
          console.log(Object.keys(row),"row")
         return  <TableRow key={i}>

            <TableCell component="th" scope="row">
              {(page * rowsPerPage) + (1 + i)}
            </TableCell>
        
            <TableCell align="center" style={{minWidth:"100px"}}>
              {row?.userName}
            </TableCell>

          {currService == 2 &&  <TableCell align="center" style={{minWidth:"200px"}}>
          {row?.companyName}
          </TableCell>}

        <TableCell align="center" style={{minWidth:"200px"}}>
            {row?.serviceProviderName}
            </TableCell>

              
           
            <TableCell  align="center" style={{minWidth:"250px"}} >
              {row?.transectionId} 
            </TableCell>

            
           
            <TableCell  align="center" style={{minWidth:"150px"}} >
            {row?.amount || ""}
            </TableCell>

         
            <TableCell  align="center" style={{minWidth:"250px"}} >
            {row.commAmount}
          </TableCell>
            
        
        <TableCell  align="center" style={{minWidth:"150px"}} >
{row?.paymentMode}
            </TableCell>
        <TableCell  align="center" style={{minWidth:"150px"}} >
        {moment(row?.createdOn).format("DD/MM/YYYY")}
            </TableCell>
        <TableCell  align="center" style={{minWidth:"150px"}} >
        {moment(row?.createdOn).format("hh:mm a")}
            </TableCell>
          <TableCell  align="center" style={{minWidth:"150px"}} >
        {row?.category}
          </TableCell>
          <TableCell  align="center" style={{minWidth:"150px"}} >
          {row?.serviceName}
            </TableCell>



  {/* {ActionCta(row)} */}
          


         
          </TableRow>
        })}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      } />
      </div>
  )
}

export default IndividualTable