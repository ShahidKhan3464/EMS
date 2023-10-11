import React, { Suspense, lazy } from "react";
import { Icons } from 'assets';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
const Login = lazy(() => import('pages/auth/login'));
const Help = lazy(() => import('pages/adminSide/help'));
const Reports = lazy(() => import('pages/adminSide/reports'));
const PageNotFound = lazy(() => import('pages/adminSide/404'));
const Earnings = lazy(() => import('pages/adminSide/earnings'));
const Settings = lazy(() => import('pages/adminSide/settings'));
const Services = lazy(() => import('pages/adminSide/services'));
const Bookings = lazy(() => import('pages/adminSide/bookings'));
const Dashboard = lazy(() => import('pages/adminSide/dashboard'));
const Verification = lazy(() => import('pages/auth/verification'));
const PriceGuide = lazy(() => import('pages/adminSide/priceGuide'));
const Requests = lazy(() => import('pages/adminSide/requests/list'));
const ResetPassword = lazy(() => import('pages/auth/resetPassword'));
const Customers = lazy(() => import('pages/adminSide/customers/list'));
const ForgotPassword = lazy(() => import('pages/auth/forgotPassword'));
const Transactions = lazy(() => import('pages/adminSide/transactions'));
const PasswordChanged = lazy(() => import('pages/auth/passwordChanged'));
const Notifications = lazy(() => import('pages/adminSide/notifications'));
const RequestDetails = lazy(() => import('pages/adminSide/requests/details'));
const ServiceDetails = lazy(() => import('pages/adminSide/services/details'));
const CustomerDetails = lazy(() => import('pages/adminSide/customers/details'));
const BookedServiceDetails = lazy(() => import('pages/adminSide/bookings/details'));
const ServiceProviders = lazy(() => import('pages/adminSide/serviceProviders/list'));
const ServiceProviderDetails = lazy(() => import('pages/adminSide/serviceProviders/details'));
const ServiceProviderBookingDetails = lazy(() => import('pages/adminSide/serviceProviders/bookingDetails'));

const unAuthenticatedRoutes = [
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/verification', element: <Verification /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/password-changed', element: <PasswordChanged /> },
  // { path: '*', element: <PageNotFound /> },
]

const authenticatedRoutes = [
  { path: '/login', element: <Navigate to="/dashboard" replace /> },
  { path: '/help', element: <Help /> },
  { path: '*', element: <PageNotFound /> },
  { path: '/reports', element: <Reports /> },
  { path: '/settings', element: <Settings /> },
  { path: '/services', element: <Services /> },
  { path: '/bookings', element: <Bookings /> },
  { path: '/earnings', element: <Earnings /> },
  { path: '/requests', element: <Requests /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/customers', element: <Customers /> },
  { path: '/price-guide', element: <PriceGuide /> },
  { path: '/transactions', element: <Transactions /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/service-providers', element: <ServiceProviders /> },
  { path: '/request/viewDetails/:id', element: <RequestDetails /> },
  { path: '/service/viewDetails/:id', element: <ServiceDetails /> },
  { path: '/customer/viewDetails/:id', element: <CustomerDetails /> },
  { path: '/booking/viewDetails/:bookingId', element: <BookedServiceDetails /> },
  { path: '/service-provider/viewDetails/:id', element: <ServiceProviderDetails /> },
  { path: '/service-provider/bookingDetails/:id', element: <ServiceProviderBookingDetails /> },
  { path: '/customer/viewDetails/:id/bookedServiceDetails/:bookingId', element: <BookedServiceDetails /> },
]

const App = () => {
  const { data } = useSelector((state) => state.authReducers.adminSignIn)
  const isAuthenticated = !!data.token

  const SplashScreen = () => {
    const style = {
      top: '50%',
      left: '50%',
      position: 'fixed',
      transform: 'translate(-50%, -50%)'
    }

    return (
      <img src={Icons.splashScreen} style={style} alt='splash-screen' />
    )
  }

  const routerConfig = createRoutesFromElements(
    isAuthenticated ? authenticatedRoutes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    )) : unAuthenticatedRoutes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))
  )

  const router = createBrowserRouter(routerConfig)

  return (
    <React.Fragment>
      <Suspense fallback={<SplashScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </React.Fragment>
  )
}

export default App