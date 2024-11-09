import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import './UpdateProfile.css'

const UpdateProfile = () => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const handlePasswordChange = async(event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    try{
      const response = await fetch('http://localhost:3000/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' ,
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log(response);
      
      if (response.ok){
        setIsSuccess(true);
        setMessage(result.message);
      }
      else{
        setIsSuccess(false);
        setMessage(result.message);
      }
    }
    catch (error) {
      console.error('Error during changing password:', error);
      setIsSuccess(false);
      setMessage('An unexpected error occurred.');
    }
  }

  return (
    <div className='update-profile'>
      <h2>Update Profile</h2>

      <div className="change-password">
        <Form method='POST' onSubmit={handlePasswordChange}>
        <input type="password" name='oldPassword' placeholder='Old Password' required/>
        <input type="password" name='newPassword' placeholder='New Password' required/>
        <button type='submit'>Change Password</button>
        </Form>
      </div>

      {message && (
        <div className={isSuccess ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

    </div>
  );
};

export default UpdateProfile;
