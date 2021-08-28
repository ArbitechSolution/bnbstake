import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,

} from "../../utils/constant";
import './navbar.css';
import { ToastContainer, toast } from 'react-toastify';

// import logo from "../../asset/images/logo.png";
import logo1 from "../../asset/images/logo1.png";

import menuIcon from "../../asset/images/menuIcon.png";
function Navbar() {

    let accountAd;
    const [account, setAccount] = useState("Connect");
    const [showLinks, setShowLinks] = useState(false);

    function formatThousands(num) {
        var numbr = parseFloat(parseFloat(num).toFixed(6));
        // console.log("num", parseFloat(numbr));
        var values = numbr.toString().split(".");
        return (
            values[0].replace(/.(?=(?:.{3})+$)/g, "$&,") +
            (values.length == 2 ? "." + values[1] : "")
        );
    }

    const loadWeb3 = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                console.log("Metamask is not installed, please install it on your browser to connect.");
                // alert("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                let accounts = await getAccounts();
                // setAccount(accounts[0]);
                accountAd = accounts[0];
                setAccount(accountAd);
                let accountDetails = null;
                window.ethereum.on("accountsChanged", function (accounts) {
                    // setAccount(accounts[0]);
                    accountAd = accounts[0];
                    setAccount(accountAd);
                    // console.log(accounts);
                });
            }
        } catch (error) {
            console.log("Error while connecting metamask", error);
            // alert("Error while connecting metamask");
        }
    };


    const getAccounts = async () => {
        const web3 = window.web3;
        try {
            let accounts = await web3.eth.getAccounts();
            // console.log(accounts);
            return accounts;
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
            return null;
        }
    };

    // eslint-disable-next-line
    const isLockedAccount = async () => {
        try {
            let accounts = await getAccounts();
            if (accounts.length > 0) {
                // console.log("Metamask is unlocked");
            } else {
                console.log("Metamask is locked");
            }
        } catch (error) {
            alert("Error while checking locked account");
        }
    };

    return (
        <div className="container-fluid">
            <div className="Navbar" style={{ position: "relative", zIndex: "1" }}>
                <div className="rightSide">
                    <span href="#home">
                        <img className="logo" src={logo1} alt="Logo" style={{ padding: "0px 10px" }} />
                    </span>
                    {/* <span className="footer-title">BNB Stake </span> */}
                    <a>
                        <button
                            className="btn btn-primary btn-sm"
                            aria-pressed="true"
                            id="connect"
                            onClick={loadWeb3}
                        >
                            {account}
                        </button>
                    </a>
                </div>
                <div className="leftSide">
                    <div className="links" id={showLinks ? "hidden" : ""}>
                        <a href="#">
                            1 SMS = $488.11
                        </a>
                        {/* &nbsp;&nbsp;&nbsp; */}
                        <a href="#" class="btn btn-warning btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            PDF Guide

                        </a>
                        {/* &nbsp;&nbsp;&nbsp; */}
                        <a href="#" class="btn btn-info btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            Help

                        </a>
                        {/* &nbsp;&nbsp;&nbsp; */}
                        <a href="#" class="btn btn-success btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            Audit

                        </a>
                        {/* &nbsp;&nbsp;&nbsp; */}
                        <a href="#" class="btn btn-primary btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            Telegram

                        </a>
                        &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                    </div>
                    <button onClick={() => setShowLinks(!showLinks)}>
                        <img src={menuIcon} />
                    </button>
                </div>
            </div >
        </div >
    );
}

export default Navbar;
