import React from "react";
import './header.css';
const Header = () => {
    return (
        <div className="container">
            <div className="row justify-content-between align-items-center">
                <div className="col-md-auto">
                    <img
                        src="/storage/images/saf.png"
                        width={200}
                        height={120}
                        alt="Saf logo"
                    />
                </div>
              
            </div>
        </div>
    );
};

export default Header;
