import { Button, Switch, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CustomTable from 'src/components/common/table';
import api from 'src/utils/api';
import { createData } from 'src/utils/common';
import styles from "./style.module.css"
import { AiFillEye, AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImBin } from 'react-icons/im';
import CommonModal from 'src/components/common/modal';
import { BiEdit } from 'react-icons/bi';
import moment from 'moment';

function IndividualTable({ currService, searchKey, sortByDate, show, provider }) {



  const [allService, setAllService] = useState([])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refresh, setRefresh] = useState(0)
  const [showDeletePopup, setShowDeletePopup] = useState("")
  const navigate = useNavigate()


  console.log(allService, "allBokking");

  useEffect(() => {
    getAllUsers()
  }, [currService, refresh, sortByDate, provider])


  useEffect(() => {
    filterAllData()
  }, [searchKey])


  function filterAllData() {
    if (searchKey) {
      let searchResult = allService.filter((obj) => {
        const createdOn = new Date(obj.createdOn);
        const bookingDateTime = new Date(obj.bookingDateTime);
        const modifiedObj = {
          "address.fullName": obj.address.fullName,
          "createdOn": `${("0" + createdOn.getDate()).slice(-2)}/${("0" + (createdOn.getMonth() + 1)).slice(-2)}/${createdOn.getFullYear()} ${("0" + createdOn.getHours()).slice(-2)}:${("0" + createdOn.getMinutes()).slice(-2)} ${createdOn.getHours() < 12 ? "am" : "pm"}`,
          "bookingId": obj.bookingId,
          "companyName": obj.companyName,
          "allocatedStaff": obj.allocatedStaff,
          "category": obj.category,
          "bookingDateTime": `${("0" + bookingDateTime.getDate()).slice(-2)}/${("0" + (bookingDateTime.getMonth() + 1)).slice(-2)}/${bookingDateTime.getFullYear()} ${("0" + bookingDateTime.getHours()).slice(-2)}:${("0" + bookingDateTime.getMinutes()).slice(-2)} ${bookingDateTime.getHours() < 12 ? "am" : "pm"}`,
          "amount": obj.amount,
          "paymentStatus": obj.paymentStatus,
          "address.email": obj.address.email,
          "paymentMode": obj.paymentMode
        };

        console.log("modified object is ", modifiedObj)

        return Object.values(modifiedObj).some(val =>
          typeof val === "object" ? Object.values(val).includes(searchKey) : String(val).includes(searchKey)
        );
      })
      setAllService(searchResult)
    } else {
      getAllUsers()
    }
  }

  function getAllUsers() {
    api.post("getBookingData", {
      search: searchKey,
      sortType: sortByDate,
      type: currService,
      bookingType: (provider == 2) ? "company" : "individual"
    }).then(result => {
      setAllService(result?.data?.map((v, i) => ({ ...v, newId: i })))

    }).catch(err => {
      console.log(err);
    })
  }



  let rows = allService


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  function DeletePlan(id) {
    api.post("removeOffer", {
      offerId: id
    }).then(result => {
      toast.success(result?.message)
      setRefresh(refresh + 1)
      setShowDeletePopup("")
    }).catch(err => {
      toast.error(err?.message)
    })
  }

  function Headers() {
    if (!show) {
      if (provider == 1) {
        return ["No.", "UserName", "Booking Date & Time", "Booking Id", "Service Man Alloted", "Category", "Reservation Date", "Total Charges", "Payment Status", "User Email", "User Phone", "City", "Cancel Reason", "Payment Mode"]
      } else if (provider == 2) {
        return ["No.", "UserName", "Booking Date & Time", "Booking Id", "Company Name", "Service Man Alloted", "Category", "Reservation Date", "Total Charges", "Payment Status"
          , "User Email", "User Phone", "Address", "Cancel Reason", "Payment Mode"]
      }

      else {
        return ["No.", "UserName", "Booking Date & Time", "Booking Id", "Company Name", "Service Man Alloted", "Category", "Reservation Date", "Total Charges", "Payment Status", "User Address", "Cancel Reason", "Payment Mode"]
      }
    } else {
      if (provider == 1) {
        return ["No.", "UserName", "Booking Date & Time", "Booking Id", "Service Man Alloted", "Category", "Reservation Date", "Total Charges", "Payment Status", "User Address", "Cancel Reason", "Payment Mode"]
      } else if (provider == 2) {
        return ["No.", "UserName", "Booking Date & Time", "Booking Id", "Company Name", "Service Man Alloted", "Category", "Reservation Date", "Total Charges", "Payment Status", "User Address", , "Cancel Reason", "Payment Mode"]
      }

      else {
        return ["No.", "UserName", "Booking Date & Time", "Booking Id", "Company Name", "Service Man Alloted", "Category", "Reservation Date", "Total Charges", "Payment Status", "User Address", "Cancel Reason", "Payment Mode"]
      }
    }

  }



  function ActionCta(row) {
    if (!show) {
      if (currService) {
        return <TableCell align="center" style={{ minWidth: "200px" }} >
          <div className={styles.action}  >
            <ImBin style={{ fontSize: "28px", color: "#d21313", cursor: "pointer" }} onClick={() => setShowDeletePopup(row?._id)} />
          </div>
        </TableCell>
      } else {
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
            <ImBin style={{ fontSize: "30px", color: "#d21313" }} />
            <p className='mt-2 fs-5' >Are you sure, you want to delete this ?</p>
            <div className={styles.modalConCta} >
              <Button variant="contained" className={styles.acceptCta} onClick={() => DeletePlan(showDeletePopup)}  >Yes</Button>
              <Button className={styles.rejectCta} variant="outlined" onClick={() => setShowDeletePopup("")} >No</Button>
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
          ).map((row, i) => {
            console.log(Object.keys(row), "row")
            return <TableRow key={i}>
              <TableCell component="th" scope="row">
                {(page * rowsPerPage) + (1 + i)}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }}>
                {row?.userName}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "250px" }}>
                {(row.bookingDateTime) ? moment(row?.bookingDateTime).format("DD/MM/YYYY hh:mm a") : moment(row?.createdOn).format("DD/MM/YYYY hh:mm a")}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.bookingId}
              </TableCell>
              {provider == 2 && <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.companyName || ""}
              </TableCell>}
              <TableCell align="center" style={{ minWidth: "250px" }} >
                {row?.allocatedStaff}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "250px" }} >
                {row?.category}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {moment(row?.createdOn).format("DD/MM/YYYY")}
              </TableCell>              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.amount}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.paymentStatus}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.address?.email}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.address?.mobileNumber}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.staffCity}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.cancelReason}
              </TableCell>
              <TableCell align="center" style={{ minWidth: "150px" }} >
                {row?.paymentMode}
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