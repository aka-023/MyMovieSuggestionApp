import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

import App from './App.jsx'
import './index.css'
import MovieDetails from './pages/MovieDetails/MovieDetails.jsx';
import MovieList from './components/MovieList.jsx';
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Home from './pages/Home/Home.jsx';
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx';
import UpdateProfile from './components/UpdateProfile/UpdateProfile.jsx'
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx'
import ResetPassword from './components/ResetPassword/ResetPassword.jsx'
import Favourites from './pages/Favourites/Favourites.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"details/:id",
        element:<MovieDetails/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"contact",
        element:<Contact/>  
      },
      {
        path:"movie/:category",
        element:<MovieList/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/> 
      },
      {
        path:'/update-profile',
        element:<UpdateProfile/>
      },
      {
        path:'/forget-pass',
        element:<ForgetPassword/>
      },
      {
        path:'/reset-pass',
        element:<ResetPassword/>
      },
      {
        path:'/favourites',
        element:<Favourites/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
