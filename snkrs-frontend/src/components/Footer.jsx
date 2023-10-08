// Footer.js
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                {/* Sneaker Page Info Column */}

                <div className="footer-column">
                    <div className="footer-heading snkrsfoot"><h4>SNKRS</h4></div>
                    <div className="footer-item">About Us</div>
                    <div className="footer-item">Blog</div>
                    <div className="footer-item">Careers</div>
                </div>

                {/* Important Links Column */}
                <div className="footer-column">
                    <div className="footer-heading">IMPORTANT LINKS</div>
                    <div className="footer-item">Return/Exchange</div>
                    <div className="footer-item">Terms and Conditions</div>
                    <div className="footer-item">Privacy Policy</div>
                    <div className="footer-item">Shipping</div>
                </div>

                {/* Help Column */}
                <div className="footer-column">
                    <div className="footer-heading">NEED HELP?</div>
                    <div className="footer-item">My Account</div>
                    <div className="footer-item">Size Chart</div>
                    <div className="footer-item">Contact Us</div>
                </div>

                {/* Social Links Column */}
                <div className="footer-column">
                    <div className="footer-heading">FOLLOW US ON</div>
                    <div className="footer-item">Instagram</div>
                    <div className="footer-item">Facebook</div>
                    <div className="footer-item">Twitter</div>
                </div>
              
            </div>
        </div>
    );
}

export default Footer;
