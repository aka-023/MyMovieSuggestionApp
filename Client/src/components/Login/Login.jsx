import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useContext(AuthContext);

  const handleLogin = async(user) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' ,
        body: JSON.stringify(user),
      });
  
       const result = await response.json();
  
      if (response.ok) {
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
  
    } catch (error) {
      console.error('Error during signup:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData);

    const response = await handleLogin(user);
    console.log(response);
    
    if (response.success) {
      setIsAuthenticated(true);
      toast.success(response.message);
      navigate('/');
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </Form>

      <div>Don't have an account?<Link to={'/signup'} > Sign Up</Link></div>
      <div className="forget-pass"><Link to={'/forget-pass'}>Forget Password?</Link></div>
    </div>
  );
};

export default Login;
