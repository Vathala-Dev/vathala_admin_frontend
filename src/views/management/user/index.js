import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import React,{useEffect, useState} from 'react'
import CustomTable from 'src/components/common/table'
import api from 'src/utils/api';
import { createData } from 'src/utils/common';
import Switch from '@mui/material/Switch';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from "./style.module.css"
import { useNavigate } from 'react-router-dom';
import { ImBin } from 'react-icons/im';
import CommonModal from 'src/components/common/modal';
import { Dropdown, Form } from 'react-bootstrap';

function Index({show}) {

const [allUsers, setAllUsers] = useState([])
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [refresh, setRefresh] = useState(0)
const [searchKey, setSearchKey] = useState("")
const [showDeletePopup, setShowDeletePopup] = useState("")
const [sort, setSort] = useState("aesc")

const navigate = useNavigate()
console.log(allUsers,"allUsers");
console.log(show,"accessshow");

  useEffect(() => {
    getAllUsers()
  }, [refresh,searchKey,sort])



  

  function getAllUsers(){
    api.post("getAllUsers",{search:searchKey,sortType:sort}).then(result => {
      console.log(result,"getAllUsers");
      if(result?.status_code == "200"){
        setAllUsers(result?.response?.map((v,i) => ({...v, newId: i})) )
      }else{
        localStorage.clear()
        toast.success("Sign Out Successfully")
navigate("/adminpanel/login")
      }
    }).catch(err => {
      console.log(err);
    })
  }


  function BlockUser(block,id) {
    api.post("blockUser",{
      is_blocked:block.toString(),
      user_id:id
    }).then(result => {
      toast.success(result?.message)
      setRefresh(refresh + 1)
    }).catch(err => {
      toast.error(err?.message)
    })
  }
  
  
  const rows = allUsers
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  function DeletePlan(id) {
    api.post("removeUser",{
      userId:id
    }).then(result => {
      toast.success(result?.message)
      setRefresh(refresh + 1)
      setShowDeletePopup("")
    }).catch(err => {
      toast.error(err?.message)
    })
  }

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  console.log(page * rowsPerPage, page * rowsPerPage + rowsPerPage,"rowsPerPage");

  return (
    <div>
       <div className='bdc-container-content' >
        <h1 className="bdc-item" >User Management</h1>
        <div style={{display:"inline-block"}} >
  <AiOutlineSearch className="searchIcon" />
  <input type="text" placeholder="Search" className="searchInput" value={searchKey} onChange={(e) => {

    setSearchKey(e.target.value) }}  />
</div>
      </div>
   
    <CCard>


    <div className='d-flex justify-content-between align-items-center mx-3 mb-4 mt-2'  >


<div className='d-flex align-items-center' >
  <label className='me-2' >Sort By Username</label>
  <Form.Group >
        <Form.Select onChange={(e) => setSort(e.target.value)} value={sort} >
          <option value="aesc" >Ascending</option>
          <option value="desc" >Descending</option>
        </Form.Select>
      </Form.Group>
</div>


</div>


<CommonModal
show={showDeletePopup}
setShow={setShowDeletePopup}
bodyContent={
  <div className='text-center' >
    <ImBin  style={{fontSize:"30px",color:"#d21313"}} />
    <p className='mt-2 fs-5' >Are you sure, you want to delete this user ?</p>
    <div className={styles.modalConCta} >
    <Button variant="contained" className={styles.acceptCta} onClick={() => DeletePlan(showDeletePopup) }  >Yes</Button>
    <Button className={styles.rejectCta}  variant="outlined" onClick={() => setShowDeletePopup("") } >No</Button>
    </div>
    
    <div>
      
    </div>
  </div>
}
/>

<CCardBody>
<CustomTable rows={rows} header={!show ? ["No.","User Name","Email","Mobile","City","Booking Completed","Booking Cancelled","User Status","Action"] : ["No.","User Name","Email","Mobile","City","Booking Completed","Booking Cancelled","User Status"] } page={page} rowsPerPage={rowsPerPage} setPage={setPage} setRowsPerPage={setRowsPerPage} tableContent={
          <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,i) => {
            console.log(Object.keys(row),"row")
           return  <TableRow key={i}>

              <TableCell scope="row"  >
              {row?.newId + 1}
              </TableCell>
              <TableCell align="center" style={{minWidth:"150px"}} >
                {row?.first_name + row?.last_name}
              </TableCell>
              <TableCell align="center" style={{minWidth:"150px"}} >
                {row?.email}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"150px"}} >
                {row?.mobile_number}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"150px"}} >
                {row?.city || "N/A" }
              </TableCell>
              <TableCell  align="center" style={{minWidth:"200px"}} >
                {row?.completeBooking}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"200px"}} >
                {row?.cancelledBooking}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"150px"}} >
                {row?.is_blocked == 0 ? "Unblock" : "Block" }
              </TableCell>
          {!show  &&  <TableCell  align="center">
              <div className={styles.action}  >

              <Switch {...label} color="error" checked={row?.is_blocked == 0 ? false : true}  onClick={() => BlockUser(row?.is_blocked == 0 ? 1 : 0 ,row?._id)} />
<ImBin style={{fontSize:"20px",color:"#d21313",cursor:"pointer"}} onClick={() => setShowDeletePopup(row?._id)} />


</div> 
              
              </TableCell>}
           
            </TableRow>
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        } />
</CCardBody>
    </CCard>
   
    </div>
  )
}

export default Index