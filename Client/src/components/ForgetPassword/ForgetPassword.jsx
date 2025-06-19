import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css';
import { toast } from "react-toastify";

const ForgetPassword = () => {
    const emailEle = useRef();
    const navigate = useNavigate();

    const handleSendForgetPassCode = async() => {
        const email = emailEle.current.value;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/send-fp-code`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify({email})
            });

            const result = await response.json();

            if(response.ok){
                toast.success(result.message);
            } else{
                toast.error(result.message);
            }
            
            setTimeout(() => {
                if (response.ok) {
                    navigate('/reset-pass');
                }
            }, 1500);

        } catch (err) {
            console.log("Error sending the forget password code", err);
        }
    }

    return (
        <div className="forget-password-container">
            <input
                type="email"
                ref={emailEle}
                placeholder="Email"
                name="email"
                className="forget-password-input"
                required
            />
            <button onClick={handleSendForgetPassCode} className="forget-password-button">
                Send Code
            </button>
        </div>
    )
}

export default ForgetPassword;
