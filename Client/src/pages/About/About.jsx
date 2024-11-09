import './About.css'

const About = () => {
    return (
        <div className="about-page">
            <div className="about-header">
                <h1>About <span>MovieJunction</span></h1>
                <p>Your ultimate destination for discovering and enjoying movies.</p>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>At MovieJunction, our mission is to provide a platform for movie lovers to explore, discover, and keep track of their favorite movies. We bring together the latest releases, timeless classics, and hidden gems all in one place.</p>
                </div>

                <div className="about-section">
                    <h2>Why Choose Us?</h2>
                    <p>We strive to give you the best experience with curated recommendations, a user-friendly interface, and easy access to movie ratings and reviews. Whether you're a casual viewer or a film enthusiast, MovieJunction has something for everyone.</p>
                </div>

                <div className="about-section">
                    <h2>Get In Touch</h2>
                    <p>If you have any questions, suggestions, or just want to say hello, feel free to contact us through our social media channels or email. We're always happy to hear from our users!</p>
                </div>
            </div>
        </div>
    );
};

export default About;
