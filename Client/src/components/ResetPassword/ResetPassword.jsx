import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import './ResetPassword.css';
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-fp-code`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            const result = await response.json();
            
            if(response.ok){
                toast.success(result.message);
            } else{
                toast.error(result.message);
            }
                        
            setTimeout(() => {
                if(response.ok){
                    navigate('/login');
                }
            }, 1500);
            
        } catch (err) {
            console.log("Error while reseting the password", err);
        }
    }

    return (
        <div className="reset-password-container">
            <Form method="POST" onSubmit={handleSubmit} className="reset-password-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="reset-password-input"
                    required
                />
                <input
                    type="password"
                    name="newpassword"
                    placeholder="New Password"
                    className="reset-password-input"
                    required
                />
                <input
                    type="text"
                    name="providedCode"
                    placeholder="Forget Password Code"
                    className="reset-password-input"
                    required
                />
                <button type="submit" className="reset-password-button">Reset Password</button>
            </Form>
        </div>
    )
}

export default ResetPassword;
