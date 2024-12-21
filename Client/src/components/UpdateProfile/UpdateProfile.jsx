import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import './UpdateProfile.css'
import { toast } from 'react-toastify';

const UpdateProfile = () => {
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
      // console.log(response);
      
      if(response.ok){
        toast.success(result.message);
      } else{
        toast.error(result.message);
      }
    
    }
    catch (error) {
      console.error('Error during changing password:', error);
      toast.error(result.message);
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

    </div>
  );
};

export default UpdateProfile;
