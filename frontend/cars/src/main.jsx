import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Car from './CarComponent.jsx'
import ErrorPage from './ErrorPage.jsx'
import HomePage from './Pages/HomePage.jsx'
//router imported
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Instancing router
const router = createBrowserRouter([

  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cars",
    element: <App />
  },
  {
    path: '/car/:carId',
    element: <Car />,
    errorElement: <ErrorPage />
  },


]);
createRoot(document.getElementById('root')).render(


  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
