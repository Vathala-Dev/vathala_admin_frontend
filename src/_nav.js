import React from 'react'

import DashboardActImg from "src/assets/images/Admin's Side Panel icons/dashboard_active.png"
import DashboardImg from "src/assets/images/Admin's Side Panel icons/dashboard.png"
import BannerImg from "src/assets/images/Admin's Side Panel icons/banner_mgt.png"
import BannerActImg from "src/assets/images/Admin's Side Panel icons/banner_mgt_active.png"
import GeoFencingImg from "src/assets/images/Admin's Side Panel icons/geo_fencing_mgt.png"
import GeoFencingActImg from "src/assets/images/Admin's Side Panel icons/geo_fencing_mgt_active.png"
import PromocodeImg from "src/assets/images/Admin's Side Panel icons/promocode.png"
import PromocodeActImg from "src/assets/images/Admin's Side Panel icons/promocode_active.png"
import ServiceCatImg from "src/assets/images/Admin's Side Panel icons/service_category_mgt.png"
import ServiceCatActImg from "src/assets/images/Admin's Side Panel icons/service_category_mgt_active.png"
import ServiceManImg from "src/assets/images/Admin's Side Panel icons/service_man_mgt.png"
import ServiceManActImg from "src/assets/images/Admin's Side Panel icons/service_man_mgt_active.png"
import ServiceProImg from "src/assets/images/Admin's Side Panel icons/service_provider_mgt.png"
import ServiceProActImg from "src/assets/images/Admin's Side Panel icons/service_provider_mgt_active.png"
import ServiceSubImg from "src/assets/images/Admin's Side Panel icons/service_sub_category_mgt.png"
import ServiceSubActImg from "src/assets/images/Admin's Side Panel icons/service_sub_category_mgt_active.png"
import PlanImg from "src/assets/images/Admin's Side Panel icons/subscription_plan_mgt.png"
import PlanActImg from "src/assets/images/Admin's Side Panel icons/subscription_plan_mgt_active.png"
import UserImg from "src/assets/images/Admin's Side Panel icons/user_mgt.png"
import UserActImg from "src/assets/images/Admin's Side Panel icons/user_mgt_active.png"
import TaxImg from "src/assets/images/Admin's Side Panel icons/commission_mgt.png"
import TaxActImg from "src/assets/images/Admin's Side Panel icons/commission_mgt_active.png"
import OfferImg from "src/assets/images/Admin's Side Panel icons/offer_mgt.png"
import OfferActImg from "src/assets/images/Admin's Side Panel icons/offer_mgt_active.png"
import SubAdminImg from "src/assets/images/Admin's Side Panel icons/sub_admin_mgt.png"
import SubAdminActImg from "src/assets/images/Admin's Side Panel icons/sub_admin_mgt_active.png"
import BookingImg from "src/assets/images/Admin's Side Panel icons/booking_mgt.png"
import ReportImg from "src/assets/images/Admin's Side Panel icons/report_mgt.png"
import PaymentImg from "src/assets/images/Admin's Side Panel icons/payment_mgt.png"
import BookingActImg from "src/assets/images/Admin's Side Panel icons/booking_mgt_active.png"
import ReportActImg from "src/assets/images/Admin's Side Panel icons/report_mgt_active.png"
import PaymentActImg from "src/assets/images/Admin's Side Panel icons/payment_mgt_active.png"
import RefundImg from "src/assets/images/Admin's Side Panel icons/refund.png"
import RefundActImg from "src/assets/images/Admin's Side Panel icons/refund_active.png"
import CmsImg from "src/assets/images/Admin's Side Panel icons/cms.png"
import CmsActImg from "src/assets/images/Admin's Side Panel icons/cms_active.png"
import ReviewImg from "src/assets/images/Admin's Side Panel icons/review.png"
import ReviewActImg from "src/assets/images/Admin's Side Panel icons/review_active.png"
import CityMgmt from "src/assets/images/Admin's Side Panel icons/city_mgt.png"
import CityMgmtActImg from "src/assets/images/Admin's Side Panel icons/city_mgt_active.png"
import NotificationMgmt from "src/assets/images/Admin's Side Panel icons/notification_mgt.png"
import NotificationMgmtActImg from "src/assets/images/Admin's Side Panel icons/notification_mgt_active.png"
import CMSMgmt from "src/assets/images/Admin's Side Panel icons/cms_mgt.png"
import CMSMgmtActImg from "src/assets/images/Admin's Side Panel icons/cms_mgt_active.png"
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { useGlobalStore } from './utils/store'

function Nav() {
   const { userDetails } = useGlobalStore((state) => state)
   console.log(userDetails, 'userDetailsNav')

   let allNav = [
      {
         component: CNavItem,
         name: 'Dashboard',
         to: '/adminpanel/dashboard',
         Icon: (visible) => {
            return <img src={visible ? DashboardActImg : DashboardImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'User Management',
         to: '/adminpanel/user-mgmt',
         Icon: (visible) => {
            return <img src={visible ? UserActImg : UserImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Service Provider Management',
         to: '/adminpanel/provider-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ServiceProActImg : ServiceProImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Service Man Management',
         to: '/adminpanel/man-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ServiceManActImg : ServiceManImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Enquiry Management',
         to: '/adminpanel/enquiry-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ReviewActImg : ReviewImg} className="new-icons" />
         },

      },
      {
         component: CNavItem,
         name: 'Subscription Plan Management',
         to: '/adminpanel/subscription',
         Icon: (visible) => {
            return <img src={visible ? PlanActImg : PlanImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Service Category Management',
         to: '/adminpanel/category-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ServiceCatActImg : ServiceCatImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Service Sub Category Management',
         to: '/adminpanel/sub-category-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ServiceSubActImg : ServiceSubImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Promo Code Management',
         to: '/adminpanel/promocode-mgmt',
         Icon: (visible) => {
            return <img src={visible ? PromocodeActImg : PromocodeImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Geo-Fencing Management',
         to: '/adminpanel/geo-fencing-mgmt',
         Icon: (visible) => {
            return <img src={visible ? GeoFencingActImg : GeoFencingImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Banner Management',
         to: '/adminpanel/banner-mgmt',
         Icon: (visible) => {
            return <img src={visible ? BannerActImg : BannerImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Blogs Management',
         to: '/adminpanel/blogs-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ServiceCatActImg : ServiceCatImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Commission Management',
         to: '/adminpanel/commission-mgmt',
         Icon: (visible) => {
            return <img src={visible ? TaxActImg : TaxImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Sub-Admin Management',
         to: '/adminpanel/subAdmin-mgmt',
         Icon: (visible) => {
            return <img src={visible ? SubAdminActImg : BookingImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Offer Management',
         to: '/adminpanel/offer-mgmt',
         Icon: (visible) => {
            return <img src={visible ? OfferActImg : OfferImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Booking Management',
         to: '/adminpanel/booking-mgmt',
         Icon: (visible) => {
            return <img src={visible ? BookingActImg : BookingImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Payment Management',
         to: '/adminpanel/payment-mgmt',
         Icon: (visible) => {
            return <img src={visible ? PaymentActImg : PaymentImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Report Management',
         to: '/adminpanel/report-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ReportActImg : ReportImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Refund Management',
         to: '/adminpanel/refund-mgmt',
         Icon: (visible) => {
            return <img src={visible ? RefundActImg : RefundImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Review Management',
         to: '/adminpanel/review-mgmt',
         Icon: (visible) => {
            return <img src={visible ? ReviewActImg : ReviewImg} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'CMS Management',
         to: '/adminpanel/cms-mgmt',
         Icon: (visible) => {
            return <img src={visible ? CMSMgmtActImg : CMSMgmt} className="new-icons" />
         },
      },
      {
         component: CNavItem,
         name: 'Notification Management',
         to: '/adminpanel/notification-mgmt',
         Icon: (visible) => {
            return (
               <img
                  src={visible ? NotificationMgmtActImg : NotificationMgmt}
                  className="new-icons"
               />
            )
         },
      },
      {
         component: CNavItem,
         name: 'City Management',
         to: '/adminpanel/city-mgmt',
         Icon: (visible) => {
            return <img src={visible ? CityMgmtActImg : CityMgmt} className="new-icons" />
         },
      },
   ]

   if (userDetails?.adminType == 'subAdmin') {
      return allNav.filter((v) => userDetails?.accessModule.some((s) => s.title === v.name))
   } else {
      return allNav
   }
}

// allNav.filter(v => userDetails?.accessModule.some(s => s.title === v.name))
// const _nav = [
//   {
//     component: CNavItem,
//     name: 'Dashboard',
//     to: '/dashboard',
//     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
//     badge: {
//       color: 'info',
//       text: 'NEW',
//     },
//   },

// ]

export default Nav
