import { CCard, CCardBody } from '@coreui/react'
import { Button, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTable from 'src/components/common/table'
import api from 'src/utils/api'
import Switch from '@mui/material/Switch'
import { toast } from 'react-toastify'
import { ImBin } from 'react-icons/im'
import { BiEdit } from 'react-icons/bi'
import styles from '../banner/style.module.css'
import CommonModal from 'src/components/common/modal'
import FilePicker from 'src/components/common/imageUploader'
import SimpleInput from 'src/components/common/simpleInput'
import { AiOutlineSearch } from 'react-icons/ai'
import UploadImg from 'src/assets/images/upload.png'

function Index({ show }) {

    const [allUsers, setAllUsers] = useState([])
    // const [categoryList, setCategoryList] = useState([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [refresh, setRefresh] = useState(0)

    const [detailPopup, setDetailPopup] = useState(false)
    const [selectedImg, setSelectedImg] = useState()

    const [categoryName, setCategoryName] = useState('')
    const [bannerTitle, setBannerTitle] = useState('')
    const [bannerLink, setBannerLink] = useState('')
    const [category, setCategory] = useState('')
    const [displayType, setDisplayType] = useState("single");
    const [del, setDel] = useState()

    const [searchKey, setSearchKey] = useState('')
    const [provider, setProvider] = useState(1)

    /* -------------------- Load Banners -------------------- */
    useEffect(() => {
        getAllUsers()
    }, [refresh, searchKey])

    function getAllUsers() {
        api.get('getWelcomeBanner', { search: searchKey })
            .then((result) => setAllUsers(result?.data || []))
            .catch((err) => console.log(err))
    }

    /* -------------------- Load Categories -------------------- */
    // useEffect(() => {
    //     api.get('getCategories')
    //         .then(res => setCategoryList(res.data || []))
    //         .catch(err => console.log(err))
    // }, [])

    /* -------------------- Reset Form -------------------- */
    useEffect(() => {
        if (!detailPopup) {
            setSelectedImg()
            setCategoryName('')
            setBannerTitle('')
            setBannerLink('')
            setCategory('')
            console.log("DATA", detailPopup, selectedImg)
        }
    }, [detailPopup])

    /* -------------------- Status Toggle -------------------- */
    function BlockUser(block, id) {
        api.post('updateWelcomeBannerStatus', { status: block.toString(), bannerId: id })
            .then((result) => {
                toast.success(result?.message)
                setRefresh(refresh + 1)
            })
            .catch((err) => toast.error(err?.message))
    }

    /* -------------------- Delete Banner -------------------- */
    function DeleteBanner(del) {
        api.post('removeWelcomeBanner', { bannerId: del })
            .then((result) => {
                toast.success(result?.message)
                setRefresh(refresh + 1)
                setDel(false)
            })
            .catch((err) => toast.error(err?.message))
    }

    /* -------------------- Add / Edit Banner -------------------- */
    function AddCategory(detailPopup) {

        if (!categoryName || !bannerTitle || !bannerLink) {
            toast.error('Please fill all required fields')
            return
        }

        const payload = {
            image: selectedImg,
            title: categoryName,
            welcomeTitle: bannerTitle,
            link: bannerLink,
            // categoryId: category,
            displayType: displayType,
            type: provider == 1 ? 'Web' : 'mobile',
        }

        if (typeof detailPopup === 'string') payload.bannerId = detailPopup

        api.post(typeof detailPopup === 'string' ? 'editWelcomeBanner' : 'addWelcomeBanner', payload)
            .then((result) => {
                toast.success(result?.message)
                setRefresh(refresh + 1)
                setDetailPopup(false)
                console.log("dar", payload)
            })
            .catch((err) => toast.error(err?.message))
    }

    const rows = allUsers.filter(ele => provider == 1 ? ele?.type == 'Web' : ele?.type == 'mobile')



    return (
        <div>
            <div className="bdc-container-content">
                <h1 className="bdc-item">Welcome Banner Management</h1>

                <div className={styles.firstContainer}>
                    <div style={{ display: 'inline-block' }}>
                        <AiOutlineSearch className="searchIcon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="searchInput"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                    </div>

                    <div className={provider === 1 ? styles.selected : styles.unselected}
                        onClick={() => { setPage(0); setProvider(1) }}>
                        Website
                    </div>

                    <div className={provider === 2 ? styles.selected : styles.unselected}
                        onClick={() => { setPage(0); setProvider(2) }}>
                        Mobile
                    </div>
                </div>
            </div>

            <CCard>

                {/* ---------------- Modal ---------------- */}
                <CommonModal
                    show={detailPopup}
                    setShow={setDetailPopup}
                    title={typeof detailPopup == 'string' ? 'Edit Banner' : 'Add Banner'}
                    bodyContent={
                        <div>

                            <FilePicker
                                onGetUrl={(url) => setSelectedImg(url)}
                                imageUrl={selectedImg ? selectedImg : UploadImg}
                                bodyWidth="150px"
                                bodyHeight="150px"
                            />


                            <SimpleInput
                                title="Welcome Banner Title"
                                required
                                value={bannerTitle}
                                onChange={(e) => setBannerTitle(e.target.value)}
                                placeholder="Enter Welcome Title"
                                style={{ marginTop: 15 }}
                            />

                            <SimpleInput
                                title="Welcome Banner Name"
                                required
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Enter Welcome Banner Name"
                                style={{ marginTop: 15 }}
                            />

                            <SimpleInput
                                title="Welcome Banner Category Link"
                                value={bannerLink}
                                onChange={(e) => setBannerLink(e.target.value)}
                                placeholder="Enter Welcome Banner Category Link"
                                style={{ marginTop: 15 }}
                                select={true}
                                options={[
                                    { label: "Home Doctor", value: "Home  Doctor" },
                                    { label: "Nursing Care", value: "Basic nursing & caring services" },
                                    { label: "Wound Care", value: "Advanced wound care dressing" },
                                    { label: "Veterinary Doctor", value: "Veterinary doctor" },
                                    { label: "Yoga Therapy", value: "Yoga" },
                                    { label: "Blood Test", value: "Diagnostics of blood tests" },
                                    { label: "Physiotherapy", value: "Physiotherapy" },
                                    { label: "Elder Care", value: "Elderly Care 2/12/24 hrs" }
                                ]}
                            />

                            {/* Category */}
                            {/* <SimpleInput
                                title="Main Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ marginTop: 15 }}
                                options={[
                                    { label: "Select Category", value: "" },
                                    ...categoryList.map(cat => ({
                                        label: cat.name,
                                        value: cat._id
                                    }))
                                ]}
                            />  */}

                            {/* Display Type */}
                            <SimpleInput
                                title="Display Type"
                                value={displayType}
                                onChange={(e) => setDisplayType(e.target.value)}
                                select={true}
                                style={{ marginTop: 15 }}
                                options={[
                                    { label: "Single Time", value: "single" },
                                    { label: "Multiple Time", value: "multiple" }
                                ]}
                            />


                            <div className="text-center mt-5">
                                <Button
                                    variant="contained"
                                    className={styles.acceptCta}
                                    onClick={() => AddCategory(detailPopup)}
                                >
                                    {typeof detailPopup == 'string' ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </div>
                    }
                />

                <CommonModal
                    show={del}
                    setShow={setDel}
                    bodyContent={
                        <div className="text-center">
                            <ImBin style={{ fontSize: '30px', color: '#d21313' }} />
                            <p className="mt-2 fs-5">Are you sure, you want to delete this Welcome Banner?</p>
                            <div className="modalConCta">
                                <Button
                                    variant="contained"
                                    className="acceptCta"
                                    onClick={() => DeleteBanner(del)}
                                >
                                    Yes
                                </Button>
                                <Button
                                    variant="outlined"
                                    className="rejectCta"
                                    onClick={() => setDel(false)}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    }
                />

                <CCardBody>

                    {!show && (
                        <Button variant="contained"
                            className={styles.acceptCta}
                            onClick={() => setDetailPopup(true)}>
                            Add Banner
                        </Button>
                    )}

                    {/* ---------------- Table ---------------- */}
                    <CustomTable
                        rows={rows}
                        header={['No.', 'Banner Name', 'Image', 'Link', 'Action']}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        tableContent={
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell align="center">{row.title}</TableCell>
                                            <TableCell align="center">
                                                <img src={row.image} style={{ width: 70 }} />
                                            </TableCell>
                                            <TableCell align="center">{row.link || 'No link'}</TableCell>

                                            <TableCell align="center">
                                                <BiEdit
                                                    style={{ fontSize: 26, cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setDetailPopup(row._id)
                                                        setCategoryName(row.title)
                                                        setBannerTitle(row.welcomeTitle)
                                                        setBannerLink(row.link)
                                                        setSelectedImg(row.image)
                                                        setCategory(row.categoryId)
                                                        setDisplayType(row.displayType)
                                                    }}
                                                />

                                                <ImBin
                                                    style={{ fontSize: 24, color: 'red', cursor: 'pointer', marginLeft: 10 }}
                                                    onClick={() => setDel(row._id)}
                                                />

                                                <Switch
                                                    color="success"
                                                    checked={row?.isActive != 0}
                                                    onClick={() => BlockUser(row?.isActive == 0 ? 1 : 0, row?._id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        }
                    />

                </CCardBody>
            </CCard>
        </div>
    )
}

export default Index
