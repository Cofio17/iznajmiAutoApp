import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//Pages
import App from './Pages/App.jsx'
import Car from './Pages/CarComponent.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import ReservationForm from './Pages/ReservationForm/ReservationForm.jsx'
import MyReservation from './Pages/MyReservation/MyReservation.jsx'
import ReservationDetails from './Pages/MyReservation/ReservationDetails.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import DashBoard from './Pages/Dashboard.jsx'
import policyRoutes from './Routes/PolicyRoutes.jsx'
import BlogDefault from './Pages/Blog/BlogDefault.jsx'

//Context API
import { SearchProvider } from './Contexts/SearchContext.jsx'
import { AuthProvider } from './Contexts/AuthContext.jsx'

//Utils
import ScrollToTop from './utils/ScrollToTop.jsx'
import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx'

//loaders
import { fetchCars } from './loaders/fetchCars.js'

//Instancing router
const router = createBrowserRouter([

  {
    path: '/',
    element:
      <SearchProvider>
        <HomePage />
      </SearchProvider>,

    errorElement: <ErrorPage />,
  },
  {
    path: "/rent-a-car",
    element: (
      <SearchProvider>
        <ScrollToTop />
        <App />
      </SearchProvider>
    ),
    loader: fetchCars, // Loader za učitavanje podataka
  },
  {
    path: 'rent-a-car/car/:carId',
    element:
      <SearchProvider>
        <Car />
      </SearchProvider>,
    errorElement: <ErrorPage />
  },
  {
    path: '/reservation',
    element: <ReservationForm />
  },
  {
    path: '/about_us',
    element: <>
      <ScrollToTop />
      <AboutUs />
    </>
  },
  {
    path: '/dashboard',
    element:
      <ProtectedRoute>
        <ScrollToTop />
        <DashBoard />
      </ProtectedRoute>
  },
  {
    path: '/moja-rezervacija',
    element: <MyReservation />,
    children: [{
      path: ':reservationId',
      element: <ReservationDetails />

    }
    ]
  },
  {
    path: '/blog',
    element: <BlogDefault />
  },

  ...policyRoutes,




]);
createRoot(document.getElementById('root')).render(


  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
