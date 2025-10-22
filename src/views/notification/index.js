import React, { useEffect, useState } from 'react'
import api from 'src/utils/api'
import styles from './styles.module.css'
import moment from 'moment'
import Logo from "src/assets/images/logo.png"

// function Index() {
//    const [data, setData] = useState([])

//    console.log(data, 'getNotification')

//    useEffect(() => {
//       getNotification()
//    }, [])

//    function getNotification(params) {
//       api.get('/getNotification')
//          .then((res) => {
//             setData(res?.data)
//          })
//          .catch((err) => {
//             console.log(err?.message)
//          })
//    }

//    return (
//       <div>
//          <div className="bdc-container-content">
//             <h1 className="bdc-item">Notifications</h1>
//          </div>
//          <div className={styles.container}>
//             {data?.map((v) => {
//                return (
//                   <div className={styles.content}>
//                      <h5>{v?.adminContent}</h5>
//                      <p>{moment(v?.createdOn * 1000).format('DD/MMM/YYYY hh:mm a')}</p>
//                   </div>
//                )
//             })}
//          </div>
//       </div>
//    )
// }

// export default Index
// import React, { useEffect, useState } from 'react'
// import api from '../api'
// import moment from 'moment'
// import styles from './Notification.module.css'

function Index() {
   const [data, setData] = useState([])
   const [page, setPage] = useState(1)
   const [hasMore, setHasMore] = useState(true)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      getNotification(page)
      // eslint-disable-next-line
   }, [page])

   const getNotification = async (pageNum) => {
      if (loading) return
      console.log("loading", loading);
      setLoading(true)
      try {
         const res = await api.get(`/getNotification?page=${pageNum}`)
         console.log("pagenum", pageNum);
         const newData = res?.data || []

         if (newData.length < 50) setHasMore(true)

         setData((prev) => [...prev, ...newData])
      } catch (err) {
         console.error(err.message)
      } finally {
         setLoading(false)
      }
   }

   // Scroll event to load more
   const handleScroll = () => {
      if (
         window.innerHeight + document.documentElement.scrollTop + 50 >=
         document.documentElement.scrollHeight
      ) {
         if (hasMore && !loading) {
            setPage((prev) => { console.log("prev", prev); return prev + 1 })
         }
      }
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [hasMore, loading])

   return (
      <div>
         <div className="bdc-container-content">
            <h1 className="bdc-item">Notifications</h1>
         </div>

         <div className={styles.container}>
            {data.map((v, i) => (
               <div key={i} className={styles.content}>
                  <h5>{v?.adminContent}</h5>
                  <p>{moment(v?.createdOn * 1000).format('DD/MMM/YYYY hh:mm a')}</p>
               </div>
            ))}
            {loading && (
               <div className={styles.scrollRotateContainer}>
                  <img style={{ height: '20px', width: '60px' }} src={Logo} alt="Loading..." className={styles.scrollRotate} />
               </div>
            )}


            {!hasMore && <p style={{ textAlign: 'center' }}>No more notifications</p>}
         </div>
      </div>
   )
}

export default Index;
