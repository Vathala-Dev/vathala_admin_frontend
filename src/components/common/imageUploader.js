import React, { useState, useRef } from 'react'
import { CFormLabel } from '@coreui/react'
import { toast } from 'react-toastify'
import { IoIosAddCircle } from 'react-icons/io'
import { MdCancel, MdEdit } from 'react-icons/md'
import styles from './style.module.css'
import { Button } from 'react-bootstrap'
import api from 'src/utils/api'
import axios from 'axios'

const FilePicker = ({
   error,
   required,
   title,
   onGetUrl,
   accept = '.png, .jpg, .jpeg,.webp',
   image,
   disabled,
   uploadImageRef,
   id,
   imageUrl = '',
   className,
   infoText = '',
   bodyHeight = '',
   bodyWidth = '',
   newOnChange = () => {},
}) => {
   const imageInputRef = useRef()

   //testting

   const [fileInputState, setFileInputState] = useState()
   const [previewSource, setPreviewSource] = useState('')
   const [selectedFile, setSelectedFile] = useState()
   const [hoverState, setHoverState] = useState(false)
   const token = localStorage.getItem('token')

   // const fileSelect = (event) => {
   //   newOnChange()
   //   setSelectedImage();
   //   var file = event.target.files[0];
   //   if (file?.size / 1024 > 1024 * 5) {
   //     toast.error("Please choose an image below 5 MB");
   //     return;
   //   }
   //   onFileSelect(event.target.files[0]);
   //   setSelectedImage(event.target.files[0]);
   //   setImagePath(URL.createObjectURL(event.target.files[0]));
   // };

   const handleFileInputChange = (e) => {
      const file = e.target.files[0]
      setFileInputState(file)
      previewFile(file)
      uploadImage(file)
      console.log(file, 'file')
   }

   const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
         setPreviewSource(reader.result)
      }
   }

   const uploadImage = async (file) => {
      let bodyFormData = new FormData()
      bodyFormData.append('image', file)
      console.log(file, 'ogFIle')

      axios({
         method: 'post',
         url: 'http://52.66.187.242:3001/admin/uploadImage',
         data: bodyFormData,
         headers: { access_token: token },
      })
         .then(function (response) {
            //handle success
            console.log(response, 'response')
            onGetUrl(response?.data?.response)
         })
         .catch(function (response) {
            //handle error
            console.log(response)
            toast.error(response?.data?.message)
         })
   }

   return (
      <div className={className}>
         {title ? (
            <CFormLabel htmlFor={id}>
               {title}
               {required ? <span style={{ color: 'red' }}> *</span> : null}
            </CFormLabel>
         ) : null}

         <input
            ref={imageInputRef}
            type="file"
            class="custom-file-input"
            onChange={handleFileInputChange}
            accept={accept}
            style={{ display: 'none' }}
            disabled={disabled}
         />

         <div
            className="d-flex"
            style={{
               border: error && '1px solid red',
               borderRadius: 5,
               width: 'fit-content',
               margin: 'auto',
            }}
         >
            <div
               style={{
                  position: 'relative',
               }}
               onMouseEnter={() => setHoverState(true)}
               onMouseLeave={() => setHoverState(false)}
            >
               <img
                  src={previewSource || imageUrl}
                  className="preview-image"
                  style={{ height: bodyHeight, width: bodyWidth }}
               />

               {hoverState && (
                  <div
                     className={styles.overlay}
                     onClick={() => imageInputRef.current.click()}
                     ref={uploadImageRef}
                  >
                     Choose File
                  </div>
               )}
            </div>
         </div>
         {infoText ? <CFormLabel>{infoText}</CFormLabel> : null}
         {error ? (
            <CFormLabel style={{ color: '#dc3545', width: '100%', textAlign: 'center' }}>
               {error}
            </CFormLabel>
         ) : null}
         {/* <Button
        className="d-flex mt-3 mx-auto"
        onClick={() => {
          if (!previewSource) {
            toast.error("Select the file first");
            return;
          }
          handleSubmitFile();
        }}
      >
        Upload
      </Button> */}
      </div>
   )
}

export default FilePicker
