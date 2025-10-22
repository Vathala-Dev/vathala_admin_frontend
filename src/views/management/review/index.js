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
import { Rating } from 'react-simple-star-rating'

function Index({show}) {

const [allUsers, setAllUsers] = useState([])
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [refresh, setRefresh] = useState(0)
const [searchKey, setSearchKey] = useState("")

const navigate = useNavigate()
console.log(allUsers,"ratingData");
console.log(show,"accessshow");

  useEffect(() => {
    getAllUsers()
  }, [refresh,searchKey])


  function getAllUsers(){
    api.post("ratingData",{search:searchKey}).then(result => {

    //   if(result?.status_code == "200"){
        setAllUsers(result?.data?.map((v,i) => ({...v, newId: i})) )
//       }else{
//         localStorage.clear()
//         toast.success("Sign Out Successfully")
// navigate("/adminpanel/login")
//       }
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



  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  console.log(page * rowsPerPage, page * rowsPerPage + rowsPerPage,"rowsPerPage");

  return (
    <div>
       <div className='bdc-container-content' >
        <h1 className="bdc-item" >Ratings & Review Management</h1>
        <div style={{display:"inline-block"}} >
  <AiOutlineSearch className="searchIcon" />
  <input type="text" placeholder="Search" className="searchInput" value={searchKey} onChange={(e) => {

    setSearchKey(e.target.value) }}  />
</div>
      </div>
   
    <CCard>




<CCardBody>
<CustomTable rows={rows} header={["No.","User Name","Email","Contact Number","Booking Id","Service Category","Company Name","Service Man Name","Service Review","Service Ratings","Service Provider Review","Service Provider Ratings"]} page={page} rowsPerPage={rowsPerPage} setPage={setPage} setRowsPerPage={setRowsPerPage} tableContent={
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
                {row?.userName}
              </TableCell>
              <TableCell align="center" style={{minWidth:"150px"}} >
                {row?.email}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"150px"}} >
                {row?.mobileNumber}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"150px"}} >
                {row?.bookingId}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"150px"}} >
                {row?.category || "N/A" }
              </TableCell>
              <TableCell  align="center" style={{minWidth:"200px"}} >
                {row?.companyName || "N/A"}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"200px"}} >
                {row?.staffName || ""}
              </TableCell>
              <TableCell  align="center" style={{minWidth:"150px"}} >
                {row?.serviceFeedBack }
              </TableCell>
          <TableCell  align="center">
          <Rating
         initialValue={row?.serviceRating}
         readonly
      />
              
              </TableCell>
              <TableCell  align="center" style={{minWidth:"200px"}} >
                {row?.staffFeedBack }
              </TableCell>
          <TableCell  align="center">
          <Rating
         initialValue={row?.staffRating}
         readonly
      />
              
              </TableCell>
           
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