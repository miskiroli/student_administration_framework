import React from "react";

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
                <div className="col-md-auto d-flex align-items-center">
                    <img
                        src="/storage/images/Profile.png"
                        width={75}
                        height={75}
                        alt="Profile Picture"
                        style={{ borderRadius: "50%" }}
                    />
                    <h6 className="ml-2 mb-0">Adam</h6>
                </div>
            </div>
        </div>
    );
};

export default Header;
