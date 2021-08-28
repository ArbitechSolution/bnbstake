import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
} from "../../utils/constant";
import './sponsor.css';
import { ToastContainer, toast } from 'react-toastify';

// import logo from "../../asset/images/logo.png";
// import logo from "../../asset/images/s1.png";
// import logo2 from "../../asset/images/s2.png";
// import logo3 from "../../asset/images/s3.png";
// import logo4 from "../../asset/images/s4.png";
import footer from './footer.png'
import menuIcon from "../../asset/images/menuIcon.png";
import { Container } from "react-bootstrap";
function Sponsor() {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <img src={footer} alt="sposor" />
                    </div>
                    {/* <div className="col-sm">
                        <img src={logo2} alt="sposor" />
                    </div>
                    <div className="col-sm">
                        <img src={logo3} alt="sposor" />
                    </div>
                    <div className="col-sm">
                        <img src={logo4} alt="sposor" />
                    </div> */}
                </div>
            </div>
        </div >
    );
}

export default Sponsor;
