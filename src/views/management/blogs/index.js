import {
   Box,
   Button,
   ButtonBase,
   Pagination,
   TableBody,
   TableContainer,
   TableHead,
   TableCell,
   Table,
   Paper,
   TableRow,
   Typography,
   Modal,
} from '@mui/material'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import CustomTable from 'src/components/common/table'
import Switch from '@mui/material/Switch'
import { ImBin } from 'react-icons/im'
import { BiEdit } from 'react-icons/bi'
import styles from './style.module.css'
import CommonModal from 'src/components/common/modal'
import FilePicker from 'src/components/common/imageUploader'
import SimpleInput from 'src/components/common/simpleInput'
import { AiOutlineSearch } from 'react-icons/ai'
import RichTextEditor from 'react-rte'

import api from 'src/utils/api'
import { toast } from 'react-toastify'
import UploadImg from 'src/assets/images/upload.png'
// import { ModalBody, ModalDialog } from 'react-bootstrap'

const Index = () => {
   const [refresh, setRefresh] = useState(0)
   const [del, setDel] = useState()
   const [detailPopup, setDetailPopup] = useState()
   const [blogName, setBlogName] = useState('')
   const [imageUrl, setImageUrl] = useState('')
   const [slug, setSlug] = useState()
   const [state, setState] = useState({
      blogContent: RichTextEditor.createValueFromString('', 'html'),
   })
   const [value, setValue] = useState([])
   const [blogs, setBlogs] = useState([])
   const [searchKey, setSearchKey] = useState('')
   const [errors, setErrors] = useState({})
   const isEditMode = typeof detailPopup === 'string'
   const validateForm = () => {
      const newErrors = {}

      const blogContentHtml = state.blogContent?.toString?.('html') || ''
      if (!blogName.trim()) newErrors.blogName = 'Blog name is required.'
      if (!slug.trim()) newErrors.slug = 'Blog link is required.'
      if (!blogContentHtml.trim() || blogContentHtml === '<p><br></p>') {
         newErrors.blogContent = 'Blog content is required.'
      }
      if (!imageUrl || imageUrl === UploadImg) newErrors.imageUrl = 'Blog image is required.'

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }
   const handleSubmit = async () => {
      if (!validateForm()) return

      try {
         if (isEditMode) {
            await editBlog({ blogName, slug, blogContent: state.blogContent, imageUrl })
       
         } else {
            await createBlog({ blogName, slug, blogContent: state.blogContent, imageUrl })
            await getBlogs() // Wait for blogs to refresh
         }
      } catch (error) {
         console.error('Submission failed:', error)
      }
   }

   // const handleSubmit = () => {
   //    if (!validateForm()) return

   //    if (isEditMode) {
   //       editBlog({ blogName, slug, blogContent: state.blogContent, imageUrl })
   //       getBlogs()
   //    } else {
   //       createBlog({ blogName, slug, blogContent: state.blogContent, imageUrl })
   //       getBlogs()
   //    }

   //    // getBlogs()
   //    // close modal
   // }

   // Function to paginate the blogs array
   // This function takes an array and a page size, and returns an array of pages
   const paginate = (array, pageSize) => {
      const pageCount = Math.ceil(array.length / pageSize)
      return Array.from({ length: pageCount }, (_, index) =>
         array.slice(index * pageSize, (index + 1) * pageSize),
      )
   }

   const pageSize = 5
   const paginatedPosts = paginate(blogs, pageSize)
   const [currentPage, setCurrentPage] = useState(1)
   const currentPosts = paginatedPosts[currentPage - 1]

   console.log(imageUrl, 'imageUrl')
   const filteredPosts = currentPosts?.filter(
      (post) =>
         post.title?.toLowerCase().includes(searchKey.toLowerCase()) ||
         post.slug?.toLowerCase().includes(searchKey.toLowerCase()),
   )

   const generateSlug = (text) => {
      return text
         .toString()
         .toLowerCase()
         .trim()
         .replace(/[\s\W-]+/g, '-') // replace spaces and non-word characters with hyphens
   }

   const createBlog = () => {
      const generatedSlug = generateSlug(slug) // generate slug from blogName

      const blogData = {
         title: blogName,
         imageUrl: imageUrl,
         content: state.blogContent.toString('html'),
         slug: generatedSlug,
         date: new Date().toISOString().split('T')[0],
      }

      setValue([...value, blogData])

      console.log('Blog Created:', blogData)

      // Reset all form fields
      setSlug('')
      setBlogName('')
      setImageUrl('')
      setState({
         blogContent: RichTextEditor.createValueFromString('', 'html'),
      })

      setDetailPopup(false)
      api.post('addBlog', blogData)
         .then((result) => {
            toast.success(result?.message)
            console.log('Blog created successfully:', result)
            // Optionally, you can refresh the blog list or perform other actions here
            // Refresh the blog list after creating a new blog
         })
         .catch((err) => {
            toast.error(err?.message)
         })
   }

   const editBlog = () => {
      const generatedSlug = generateSlug(slug) // generate slug from blogName}
      const blogData = {
         blogId: detailPopup, // Assuming detailPopup contains the blog ID when editing
         title: blogName,
         imageUrl: imageUrl,
         content: state.blogContent.toString('html'),
         slug: generatedSlug,
         date: new Date().toISOString().split('T')[0],
      }

      api.post('editBlog', blogData)
         .then((result) => {
            toast.success(result?.message)
            console.log('Blog updated successfully:', result)
            // Optionally, you can refresh the blog list or perform other actions here
            // Refresh the blog list after creating a new blog
            setDetailPopup(false)
            getBlogs()
         })
         .catch((err) => {
            toast.error(err?.message)
         })
   }
   const getBlogs = () => {
      api.get('getBlog')
         .then((result) => {
            result?.data && setBlogs(result?.data)
            // toast.success(result?.message)
            console.log('Blogs fetched successfully:', result?.data)
         })
         .catch((err) => {
            err?.message && toast.error(err?.message)
         })
   }

   const delBlog = (id) => {
      api.post('delblog', { blogId: id })
         .then((result) => {
            toast.success(result?.message)
            console.log('Blog deleted successfully:', result)
            setDel(false)
            getBlogs()
         })
         .catch((err) => {
            toast.error(err?.message)
            console.log('Error deleting blog:', err)
         })
   }

   const blogStatus = (id, status) => {
      api.post('updateBlogStatus', {
         blogId: id,
         status: status,
      })
         .then((result) => {
            toast.success(result?.message)
            console.log('Blog status updated successfully:', result)
            getBlogs()
         })
         .catch((err) => {
            toast.error(err?.message)
            console.log('Error updating blog status:', err)
         })
   }

   // Fetch blogs on component mount

   useEffect(() => {
      getBlogs()
   }, [])
   return (
      <>
         <div>
            <div className="bdc-container-content">
               <h1 className="bdc-item">Blog Management</h1>
               <div className="firstContainer">
                  <div style={{ display: 'inline-block' }}>
                     <AiOutlineSearch className="searchIcon" />
                     <input
                        type="text"
                        placeholder="Search"
                        className="searchInput"
                        value={searchKey}
                        onChange={(e) => {
                           setSearchKey(e.target.value)
                        }}
                     />
                  </div>
               </div>
            </div>

            <CCard>
               <CCardBody>
                  <div className="d-flex justify-content-between align-items-center mx-3 mb-4 mt-2">
                     <div></div>
                     <Button
                        variant="contained"
                        className={styles.acceptCta}
                        onClick={() => {
                           setDetailPopup(true)
                           setBlogName('')
                           setImageUrl('')
                           setSlug('')
                           setState({
                              blogContent: RichTextEditor.createValueFromString('', 'html'),
                           })
                        }}
                     >
                        Add Blog
                     </Button>
                  </div>

                  {/* Delete Confirmation Modal */}
                  <CommonModal
                     show={del}
                     setShow={setDel}
                     bodyContent={
                        <div className="text-center">
                           <ImBin style={{ fontSize: '30px', color: '#d21313' }} />
                           <p className="mt-2 fs-5">Are you sure, you want to delete this Blog?</p>
                           <div className="modalConCta">
                              <Button
                                 variant="contained"
                                 className="acceptCta"
                                 onClick={() => delBlog(del)}
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

                  <TableContainer component={Paper}>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell align="center">No</TableCell>
                              <TableCell align="center">Date</TableCell>
                              <TableCell align="center">Image</TableCell>
                              <TableCell align="center">Title</TableCell>
                              <TableCell align="center">Slug</TableCell>
                              <TableCell align="center">Actions</TableCell>
                           </TableRow>
                        </TableHead>

                        <TableBody>
                           {filteredPosts &&
                              filteredPosts.map((post, index) => (
                                 <TableRow key={index}>
                                    <TableCell align="center text-black">{index + 1}</TableCell>
                                    <TableCell align="center  text-black">{post.date}</TableCell>
                                    <TableCell align="center" className="p-0">
                                       <img
                                          src={post.imageUrl}
                                          style={{ width: '70px' }}
                                          alt="Blog"
                                       />
                                    </TableCell>
                                    <TableCell
                                       align="center"
                                       sx={{
                                          maxWidth: 200,
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                       }}
                                    >
                                       {post.title?.split(' ').slice(0, 15).join(' ')}
                                       {post.title?.split(' ').length > 15 ? '…' : ''}
                                    </TableCell>

                                    <TableCell
                                       align="center"
                                       sx={{
                                          maxWidth: 200,
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                       }}
                                    >
                                       {post.slug}
                                       {/* {post.slug?.split(' ').slice(0, 15).join(' ')}
                                       {post.slug?.split(' ').length > 15 ? '…' : ''} */}
                                    </TableCell>

                                    <TableCell align="center">
                                       <div
                                          className="actionCta"
                                          style={{
                                             display: 'flex',
                                             gap: '10px',
                                             justifyContent: 'center',
                                          }}
                                       >
                                          <BiEdit
                                             style={{
                                                fontSize: '24px',
                                                color: '#006d5b',
                                                cursor: 'pointer',
                                             }}
                                             onClick={() => {
                                                setDetailPopup(post?._id, true)
                                                setBlogName(post?.title)
                                                setImageUrl(post?.imageUrl)
                                                setSlug(post?.slug)
                                                setState({
                                                   blogContent:
                                                      RichTextEditor.createValueFromString(
                                                         post?.content,
                                                         'html',
                                                      ),
                                                })
                                             }}
                                          />
                                          <ImBin
                                             style={{
                                                fontSize: '22px',
                                                color: '#d21313',
                                                cursor: 'pointer',
                                             }}
                                             onClick={() => setDel(post?._id)}
                                          />
                                          <Switch
                                             color="success"
                                             checked={post?.isActive === true}
                                             onClick={() => blogStatus(post?._id, !post?.isActive)}
                                          />
                                       </div>
                                    </TableCell>
                                 </TableRow>
                              ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  {paginatedPosts.length > 1 && (
                     <Box m={2} display="flex" justifyContent="center">
                        <Pagination
                           count={paginatedPosts.length}
                           page={currentPage}
                           onChange={(_, newPage) => setCurrentPage(newPage)}
                        />
                     </Box>
                  )}
               </CCardBody>
            </CCard>

            <CommonModal
               show={detailPopup}
               setShow={setDetailPopup}
               title={isEditMode ? 'Edit Blog' : 'Add Blog'}
               bodyContent={
                  <div style={{ width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                     <div>
                        <Typography className="text-center fw-bold">Blog Image</Typography>
                        <br />

                        <FilePicker
                           onGetUrl={(url) => setImageUrl(url)}
                           imageUrl={imageUrl ? imageUrl : UploadImg}
                           bodyWidth="150px"
                           bodyHeight="150px"
                        />
                        {errors.imageUrl && <p style={{ color: 'red' }}>{errors.imageUrl}</p>}

                        <SimpleInput
                           title="Blog Name"
                           required
                           value={blogName}
                           onChange={(e) => setBlogName(e.target.value)}
                           placeholder="Enter Blog Name"
                           style={{ margin: '15px 0 0' }}
                        />
                        {errors.blogName && <p style={{ color: 'red' }}>{errors.blogName}</p>}

                        <SimpleInput
                           title="Blog Link"
                           required
                           placeholder="Enter Blog Link"
                           value={slug}
                           onChange={(e) => setSlug(e.target.value)}
                        />
                        {errors.slug && <p style={{ color: 'red' }}>{errors.slug}</p>}

                        <Typography className="text-center fw-bold">Blog Content</Typography>
                        {errors.blogContent && <p style={{ color: 'red' }}>{errors.blogContent}</p>}
                        <RichTextEditor
                           value={state.blogContent}
                           onChange={(value) => setState({ ...state, blogContent: value })}
                           placeholder="Write your blog content here..."
                           editorStyle={{ height: '15rem' }}
                        />

                        <div className="text-center mt-5 mb-1">
                           <Button className={styles.acceptCta} onClick={handleSubmit}>
                              {isEditMode ? 'Update Blog' : 'Save Blog'}
                           </Button>
                        </div>
                     </div>
                  </div>
               }
            />
         </div>
      </>
   )
}

export default Index
