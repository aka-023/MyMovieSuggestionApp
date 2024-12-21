import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropDown = () => {
        setDropdownOpen((prev) => !(prev));
    }

    const checkAuthentication = async () => {
        const response = await fetch('http://localhost:3000/checkauth', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const result = await response.json();
            // console.log("Auth check result:", result);

            setIsAuthenticated(result.isAuthenticated);
        } else {
            setIsAuthenticated(false);
        }
    };
    
    useEffect(() => {
        checkAuthentication(); 
    }, []);

    const handleLogout = async() => {
        try{
            const response = await fetch('http://localhost:3000/auth/logout', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const result = await response.json();

            if (response.ok) {
                setIsAuthenticated(false);
                setDropdownOpen(false);
                navigate('/');
                return;
              } 
              else {
                console.error(result.message);
                return { success: false, message: result.message };
              }
        }
        catch (error) {
            console.error('Error during logout:', error);
            return { success: false, message: 'An unexpected error occurred.' };
        }
    } 

    return(
        <div className="navbar">
            <div className="title">Movie<span>Junction</span></div>
            <div className="nav-ele">
                <div><Link to={'/'}>Home</Link></div>
                <div><Link to={`/movie/popular`}>Popular</Link></div>
                <div><Link to={`/movie/top_rated`}>Top Rated</Link></div>   
                <div><Link to={`/movie/upcoming`}>Upcoming</Link></div>
                {isAuthenticated && <div><Link to={'/favourites'}>Favourites</Link></div>}
                <div><Link to={'/about'}>About Us</Link></div>
                <div><Link to={'/contact'}>Contact Us</Link></div>
            </div>

            {isAuthenticated ? 
            (<div>
                <button onClick={toggleDropDown} className="profile-button" >Profile</button>
                {isDropdownOpen && (
                  <div className="dropdown">
                    <Link to="/update-profile">Update Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>) : 
            (<div className="login"><Link to={'/login'}>Login</Link></div>)} 
        </div>
    )
}

export default Navbar;