import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserMgmt = React.lazy(() => import('./views/management/user'))
const SpMgmt = React.lazy(() => import('./views/management/serviceProvider'))
const SmMgmt = React.lazy(() => import('./views/management/serviceMan'))
const Subscription = React.lazy(() => import('./views/management/subscription'))
const ScMgmt = React.lazy(() => import('./views/management/serviceCategory'))
const SbcMgmt = React.lazy(() => import('./views/management/serviceSubCategory'))
const PCMgmt = React.lazy(() => import('./views/management/promocode'))
const GFMgmt = React.lazy(() => import('./views/management/geo-fencing'))
const BMgmt = React.lazy(() => import('./views/management/banner'))
const SpDetails = React.lazy(() => import('./views/management/serviceProvider/details'))
const CTgmt = React.lazy(() => import('./views/management/tax'))
const SAgmt = React.lazy(() => import('./views/management/subAdmin'))
const Offergmt = React.lazy(() => import('./views/management/offer'))
const Bookingmgt = React.lazy(() => import('./views/management/booking'))
const Paymentmgt = React.lazy(() => import('./views/management/payment'))
const Reportmgt = React.lazy(() => import('./views/management/report'))
const Reviewmgt = React.lazy(() => import('./views/management/review'))
const Refundmgt = React.lazy(() => import('./views/management/refund'))
const Cmsmgt = React.lazy(() => import('./views/management/cms'))
const Notimgt = React.lazy(() => import('./views/management/notification'))
const Citymgt = React.lazy(() => import('./views/management/city'))
const Profile = React.lazy(() => import('./views/profile'))
const Notification = React.lazy(() => import('./views/notification'))
const ChangePassword = React.lazy(() => import('./views/changePassword'))
const BlogsMgmt = React.lazy(() => import('./views/management/blogs'))
const EnquiryMgmt = React.lazy(() => import('./views/management/enquiry'))
const SupportMgmt = React.lazy(() => import('./views/management/FAQ & support'))
const WelcomeMgmt=React.lazy(()=>import('./views/management/welcomeBanner'))

const routes = [
   { path: '/login', exact: true, name: 'Home' },
   { path: '/adminpanel/dashboard', name: 'Dashboard', element: Dashboard },
   { path: '/adminpanel/user-mgmt', name: 'User Management', element: UserMgmt },
   { path: '/adminpanel/provider-mgmt', name: 'Service Provider Management', element: SpMgmt },
   { path: '/adminpanel/man-mgmt', name: 'Service Man Management', element: SmMgmt },
   { path: '/adminpanel/man-mgmt/:id', name: 'Service Man Management', element: SmMgmt },
   {
      path: '/adminpanel/subscription',
      name: 'Subscription Plan Management',
      element: Subscription,
   },
   { path: '/adminpanel/category-mgmt', name: 'Service Category Management', element: ScMgmt },
   {
      path: '/adminpanel/sub-category-mgmt',
      name: 'Service Sub Category Management',
      element: SbcMgmt,
   },
   {
      path: '/adminpanel/provider-mgmt/provider-details/:id',
      name: 'Service Provider Details',
      element: SpDetails,
   },
   {
      path: '/adminpanel/provider-mgmt/individual-details/:id',
      name: 'Service Provider Details',
      element: SpDetails,
   },
   { path: '/adminpanel/promocode-mgmt', name: 'Promo Code Management', element: PCMgmt },
   { path: '/adminpanel/geo-fencing-mgmt', name: 'Geo-Fencing Management', element: GFMgmt },
   { path: '/adminpanel/banner-mgmt', name: 'Banner Management', element: BMgmt },
   { path: '/adminpanel/commission-mgmt', name: 'Commission Management', element: CTgmt },
   { path: '/adminpanel/subAdmin-mgmt', name: 'Sub-Admin Management', element: SAgmt },
   { path: '/adminpanel/offer-mgmt', name: 'Offer Management', element: Offergmt },
   { path: '/adminpanel/booking-mgmt', name: 'Booking Management', element: Bookingmgt },
   { path: '/adminpanel/payment-mgmt', name: 'Payment Management', element: Paymentmgt },
   { path: '/adminpanel/report-mgmt', name: 'Report Management', element: Reportmgt },
   { path: '/adminpanel/review-mgmt', name: 'Review Management', element: Reviewmgt },
   { path: '/adminpanel/refund-mgmt', name: 'Refund Management', element: Refundmgt },
   { path: '/adminpanel/cms-mgmt', name: 'CMS Management', element: Cmsmgt },
   { path: '/adminpanel/notification-mgmt', name: 'Notification Management', element: Notimgt },
   { path: '/adminpanel/city-mgmt', name: 'City Management', element: Citymgt },
   { path: '/adminpanel/profile', name: 'Profile', element: Profile },
   { path: '/adminpanel/notification', name: 'Notification', element: Notification },
   { path: '/adminpanel/change-password', name: 'Change Password', element: ChangePassword },
   { path: '/adminpanel/blogs-mgmt', name: 'Blogs Management', element: BlogsMgmt },
   { path: '/adminpanel/enquiry-mgmt', name: 'Enquiry Management', element: EnquiryMgmt },
   {path:'adminpanel/Faq-mgmt', name:"FAQ Managment",element: SupportMgmt},
   {path:'adminpanel/welcome-bnr-mgmt',name: "Welcome Banner",element: WelcomeMgmt}
   // { path: '*', name: 'Dashboard', element: Dashboard },

]

export default routes
