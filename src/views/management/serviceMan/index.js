import { CCard, CCardBody } from '@coreui/react'
import { Button, TableBody, TableCell, TableRow } from '@mui/material'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonModal from 'src/components/common/modal';
import CustomTable from 'src/components/common/table'
import api from 'src/utils/api';
import styles from "./style.module.css"
import { downloadExcel } from "react-export-table-to-excel";


function Index({show}) {



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const [refresh, setRefresh] = useState(0)
const [showDeletePopup, setShowDeletePopup] = useState("")
const [sortByUsername, setSortByUsername] = useState("aesc")
const [sortByCompany, setSortByCompany] = useState("All")
const [sortByRating, setSortByRating] = useState(1)

const param = useParams()
const tableRef = useRef(null);

console.log(param,"param");
console.log(sortByCompany,"sortByCompany");
console.log(show,"accessshow");


  useEffect(() => {
    getAllUsers()
  }, [refresh,searchKey,sortByUsername,sortByRating,sortByCompany])

  
  

  function getAllUsers(){
    api.post("getStaff",{
      search:searchKey,
      providerId:param?.id,
      sortType:sortByUsername,
      rating:sortByRating
    }).then(result => {
      console.log(result,"getAllUsers");
      if(result?.status_code == "200"){
        if(sortByCompany == "All"){
          setAllUsers(result?.response?.map((v,i) => ({...v, newId: i})))
        }else{
          setAllUsers(result?.response?.map((v,i) => ({...v, newId: i})).filter(k => k?.companyName == sortByCompany))
        }
        
      
      }else{
        localStorage.clear()
        toast.success("Sign Out Successfully")
      }
    }).catch(err => {
      console.log(err);
    })
  }

  function DeletePlan(id) {
    api.post("removeStaff",{
      userId:id
    }).then(result => {
      toast.success(result?.message)
      setRefresh(refresh + 1)
      setShowDeletePopup("")
    }).catch(err => {
      toast.error(err?.message)
    })
  }

  console.log(allUsers,"manallUsers");
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }


  console.log(getUniqueListBy(allUsers,"companyName"),"getUniqueListBy");

const rows =  allUsers

function handleDownloadExcel() {
  console.log("srsallusers: ", allUsers)
  downloadExcel({
    fileName: "service_man",
    sheet: "users",
    tablePayload: {
     header : ["No","UserName","Email","Company","Mobile","Total Jobs Done","Total Experience","City","Category","Rating","Last Login","Last Logout"],
      // accept two different data structures
      body: allUsers.map(user => ({newId: user.newId + 1, name: user.name,email:user.email,company:user.addedBy?.name,mobile_number:user.mobile_number,jobs_done:user?.jobs_done,total_experience:user?.totalexperience,address:user?.address,categoryName:user?.categoryName,rating:4,lastLogin:user?.lastLogin ?  moment(user?.lastLogin).format("DD/MMM/YYYY") : "N/A",lastLogout:user?.lastLogout ? moment(user?.lastLogout).format("DD/MMM/YYYY") : "N/A"})),
    },
  });
}

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  return (
    <div>
       <div className='bdc-container-content' >
        <h1 className="bdc-item" >Service Man Management</h1>
        <div style={{display:"inline-block"}} >
  <AiOutlineSearch className="searchIcon" />
  <input type="text" placeholder="Search" className="searchInput" value={searchKey} onChange={(e) => {

    setSearchKey(e.target.value) }}  />
</div>
      </div>
  
    <CCard>
      <CCardBody>

      <div className='d-flex justify-content-between align-items-center mx-3 mb-4 mt-2'  >
<div className='d-flex align-items-center' >
  <label className='me-2' >Sort by Username</label>
  <Form.Group >
        <Form.Select onChange={(e) => setSortByUsername(e.target.value)} value={sortByUsername} >
          <option value="aesc" >A-Z</option>
          <option value="desc" >Z-A</option>
        </Form.Select>
      </Form.Group>
</div>
<div className='d-flex align-items-center' >
  <label className='me-2' >Sort by Company</label>
  <Form.Group >
        <Form.Select onChange={(e) => setSortByCompany(e.target.value)} value={sortByCompany} >
          <option value="All" >All</option>
         {getUniqueListBy(allUsers,"companyName")?.map((v,i) => {
          return <option key={i} value={v?.addedBy?.name} >{v?.addedBy?.name} </option>
         })}
        </Form.Select>
      </Form.Group>
</div>

<div className='d-flex align-items-center' >
  <label className='me-2' >Sort by Rating</label>
  <Form.Group >
        <Form.Select onChange={(e) => setSortByRating(e.target.value)} value={sortByRating} >
          <option value={1} >Low To High</option>
          <option value={2} >High To Low</option>
        </Form.Select>
      </Form.Group>
</div>
<Button variant="contained" className={styles.acceptCta} onClick={handleDownloadExcel}  >Export</Button>

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
    <Button  className={styles.rejectCta}  variant="outlined" onClick={() => setShowDeletePopup("") } >No</Button>
    </div>
    
    <div>
      
    </div>
  </div>
}
/>

      <CustomTable rows={rows} header={ show ? ["No.","UserName","Email","Company","Mobile","Total Jobs Done","City","Category","Rating","Last Login","Last Logout","Total Hrs"] :  ["No.","UserName","Email","Company","Mobile","Total Jobs Done","City","Category","Rating","Last Login","Last Logout","Total Hrs","Action"] } page={page} rowsPerPage={rowsPerPage} setPage={setPage} setRowsPerPage={setRowsPerPage} tableContent={
        <TableBody>
        {(rowsPerPage > 0
          ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        )?.map((row,i) => {
          console.log(Object.keys(row),"row")
         return  <TableRow key={i}>

            <TableCell component="th" scope="row" style={{width:"80px"}} >
              {row?.newId+1}
            </TableCell>
            <TableCell align="center" style={{minWidth:"150px"}}>
              {row?.name}
            </TableCell>
            <TableCell align="center" style={{minWidth:"150px"}} >
              {row?.email}
            </TableCell>
            <TableCell align="center" style={{minWidth:"150px"}} >
              {row?.addedBy?.name}
            </TableCell>
           
           
            <TableCell  align="center" style={{minWidth:"150px"}} >
              {row?.mobile_number}
            </TableCell>
       
            <TableCell  align="center" style={{minWidth:"150px"}}>
              {row?.jobs_done}
            </TableCell>
           
            <TableCell  align="center" style={{minWidth:"150px"}} >
              {row?.address || ""}
            </TableCell>

            <TableCell  align="center" style={{minWidth:"150px"}} >
              {row?.serviceDataName || ""}
            </TableCell>
           
            <TableCell  align="center" style={{minWidth:"150px"}} >
              4
            </TableCell>
            <TableCell  align="center" style={{minWidth:"150px"}} >
            {row?.lastLogin ?  moment(row?.lastLogin).format("DD/MMM/YYYY") : "N/A"}
              
            </TableCell>
            <TableCell  align="center" style={{minWidth:"150px"}} >
            {row?.lastLogout ? moment(row?.lastLogout).format("DD/MMM/YYYY") : "N/A"}
              
            </TableCell>
            <TableCell  align="center" style={{minWidth:"150px"}} >
            {Math.round(row?.activeHrs / 60 ) || "N/A"}
              
            </TableCell>
        { !show  && <TableCell  align="center"  >
        <div className={styles.action}  >

           
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