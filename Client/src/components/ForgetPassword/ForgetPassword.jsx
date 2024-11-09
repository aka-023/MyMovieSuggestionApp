import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css';

const ForgetPassword = () => {
    const emailEle = useRef();
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSendForgetPassCode = async() => {
        const email = emailEle.current.value;
        try {
            const response = await fetch('http://localhost:3000/auth/send-fp-code', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify({email})
            });

            const result = await response.json();

            setMessage(result.message);
            setSuccess(response.ok);
            
            setTimeout(() => {
                setMessage(null);
                setSuccess(false);

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

            {message && (
                <div className={success ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default ForgetPassword;
