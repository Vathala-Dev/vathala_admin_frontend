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

function IndividualTable({currService,searchKey,fromDate,toDate,providerId,sortByDate,setAllProvider,show}) {


    
    const [allService, setAllService] = useState([])
    
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [refresh, setRefresh] = useState(0)
const [showDeletePopup, setShowDeletePopup] = useState("")
const navigate = useNavigate()


console.log(allService,"allService");





useEffect(() => {
    getAllUsers()
  }, [currService,refresh,searchKey,fromDate,toDate,providerId])
  

  function getAllUsers(){
    api.post("getOffer",{
      search:searchKey,
      startDate:fromDate,
      endDate:toDate,
      providerId:providerId
    }).then(result => {
      console.log(result,"getOffer");
        if(currService == 1){
            setAllService(result?.newData?.map((v,i) => ({...v, newId: i})))
             
        }else if(currService == 2){
            setAllService(result?.acceptedData?.map((v,i) => ({...v, newId: i})))
        }else if(currService == 3){
            setAllService(result?.rejectedData?.map((v,i) => ({...v, newId: i})))
        }else if(currService == 4){
            setAllService(result?.expired?.map((v,i) => ({...v, newId: i})))
          
        }else{
          setAllService([])
        }
             
    }).catch(err => {
      console.log(err);
    })
  }



  let rows = []

  if(sortByDate == "aesc"){
    rows = allService.sort((a,b)=> (a._id > b._id ? 1 : -1))
  }else{
    rows = allService.sort((a,b)=> (a._id < b._id ? 1 : -1))
  }

  console.log(rows,"allRows")

const emptyRows =
page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;
const label = { inputProps: { 'aria-label': 'Color switch demo' } };

function BlockUser(block,id) {
  api.post("blockOffer",{
    is_blocked:block.toString(),
    id:id
  }).then(result => {
    toast.success(result?.message)
    setRefresh(refresh + 1)
  }).catch(err => {
    toast.error(err?.message)
  })
}

const addBaseUrl = (url) => {
  if(!url) return url
  const baseUrl = 'http://52.66.187.242:3001/';
  const s3Pattern = /^https?:\/\/.*\.s3\..*amazonaws\.com\/.*/;

  if (url.startsWith('https')) {
      return url;
    }

  return `${baseUrl}${url}`;
};



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
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category","Action"] 
  }else if(currService == 2){
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category","Action"]
  }
  else if(currService == 3){
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category"]
  }
  else{
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category"]
  }
  }else{
    if(currService == 1){
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category"] 
  }else if(currService == 2){
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category"]
  }
  else if(currService == 3){
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category"]
  }
  else{
      return ["No.","Title","Offer Image","Duration","Discount %","T&C","Service Provider","created at","Service Category"]
  }
  }
   
}

function ApproveOffer(id,accept,reject) {
    api.post("changeOfferStatus",{
        offerId:id,
        isAccepted:accept,
        isRejeted:reject,
    }).then(result => {
      toast.success(result?.message)
      setRefresh(refresh + 1)
    }).catch(err => {
      toast.error(err?.message)
    })
  }

function ActionCta(row){
  if(!show){
    if(currService == 1){
      return  <TableCell  align="center" style={{minWidth:"200px"}} >
      <div className={styles.action}  >
          
             <Button variant="contained" className={styles.acceptCta} onClick={() => ApproveOffer(row?._id,true,false)} >Accept</Button>
             <Button  className={styles.rejectCta}  variant="outlined" onClick={() => ApproveOffer(row?._id,false,true)} >Reject</Button>
            
           </div> 
           </TableCell>
    
  }else if(currService == 2){
      return <TableCell  align="center" style={{minWidth:"200px"}} >
      <div className={styles.action}  >
              <ImBin style={{fontSize:"28px",color:"#d21313",cursor:"pointer"}} onClick={() => setShowDeletePopup(row?._id) } />
             
            <Switch {...label} color={"success" }  checked={row?.isActive} onClick={() => BlockUser(row?.isActive ? 1 : 0 ,row?._id)} />
      
     
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
            <TableCell align="center" style={{minWidth:"150px"}}>
              {row?.offerTitle}
            </TableCell>

            <TableCell align="center" style={{minWidth:"150px"}}>
            <img src={addBaseUrl(row?.image)} style={{width:"70px",height:"70px"}} />
            </TableCell>
          
            <TableCell  align="center" style={{minWidth:"150px"}} >
              {row?.duration  || 0} days 
            </TableCell>          
           
            <TableCell  align="center" style={{minWidth:"150px"}} >
            {row?.discountPercentage || ""}%
            </TableCell>

         
            <TableCell  align="center" style={{minWidth:"150px"}} >
             {row?.terms.join(", ")}
          </TableCell>
            
        
        <TableCell  align="center" style={{minWidth:"150px"}} >
{row?.companyName}
            </TableCell>
            <TableCell  align="center" style={{minWidth:"150px"}} >
{row?.created_at} 
            </TableCell>
        <TableCell  align="center" style={{minWidth:"150px"}} >
{row?.categoryName}
            </TableCell>
  


  {ActionCta(row)}
          


         
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