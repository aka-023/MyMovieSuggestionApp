import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import './ResetPassword.css';

const ResetPassword = () => {
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/auth/verify-fp-code', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            const result = await response.json();
            setMessage(result.message);
            setIsSuccess(response.ok);

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

            {message && (
                <div className={isSuccess ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default ResetPassword;
