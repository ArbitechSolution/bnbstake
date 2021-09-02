import React, { useState, useEffect } from "react";
import './footer.css';
import Pdf from '../../asset/images/pdf.pdf';
import logo1 from '../../asset/images/Golden.png';
function Footer
    () {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="footer">
                    <div className="row">
                        <div className="col-sm">
                            <img className="logo" src={logo1} alt="Logo" style={{ padding: "0px 10px" }} />
                        </div>
                        <div className="col-sm">
                            <h6>Powered by</h6>
                            <a href="https://www.binance.org/en/smartChain"> Binance Smart Chain</a>
                        </div>
                        <div className="col-sm">
                            <h6> Audited by HazeCrypto </h6>
                            <a href={Pdf} target="_blank"> Download Audit PDF Report </a>
                        </div>
                        <div className="col-sm">
                            <h6> © 2021 All rights reserved. </h6>
                            <a href="#"> https://smsstake.pro </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Footer
    ;
