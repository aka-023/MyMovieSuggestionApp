import { Outlet } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import { useEffect } from 'react';
import AuthProvider from './context/AuthContext';

function App(){
  return( 
    <AuthProvider>
      <Navbar/>
      <Outlet/>
    </AuthProvider>
  )
}

export default App;