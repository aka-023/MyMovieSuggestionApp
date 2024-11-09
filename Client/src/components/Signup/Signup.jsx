import React, { useState } from 'react';
import { Link, redirect, useNavigate} from 'react-router-dom';
import { Form } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData);
    
    const response = await handleSignup(user);
    
    if (response.success) {
      setIsSuccess(true);
      setMessage(response.message);

      setTimeout(() => {
      navigate('/');
      }, 1500);
    } else {
      setIsSuccess(false);
      setMessage(response.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
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
        <button type="submit">Sign Up</button>
      </Form>

      {message && (
        <div className={isSuccess ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <div>Already have an account? <Link to={'/login'}> Login here</Link></div>
    </div>
  );
};

const handleSignup = async (user) => {
  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
export default Signup;