import './Footer.css'
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>MovieJunction</h3>
                    <p>Your ultimate destination for movies.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/favourites'}>Your Bucket</Link></li>
                        <li><Link to={'/contact'}>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                    <div><FaFacebook  size={25}/></div>
                    <div><FaTwitter size={25}/></div>
                    <div><FaInstagram size={25}/></div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 MovieJunction. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
