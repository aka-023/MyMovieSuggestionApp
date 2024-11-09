import React from 'react';
import './Contact.css'
import contactimg from '../../assets/call-center-removebg-preview.png'

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Reach out to us with any questions or feedback.</p>
            </div>
            <div className='contact-container'>
            <div className="contact-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" placeholder="Write your message"></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
            </div>
            <div className='img-container'>
                <div><img src={contactimg} alt="contact-img" /></div>
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p>Email: support@moviejunction.com</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Address: 123 Movie Lane, Film City, CA</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Contact;
