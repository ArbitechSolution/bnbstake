import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
} from "../../utils/constant";
import './info.css';
import { ToastContainer, toast } from 'react-toastify';

// import logo from "../../asset/images/logo.png";
import logo from "../../asset/images/logo.png";
import menuIcon from "../../asset/images/menuIcon.png";
import { Container } from "react-bootstrap";
import Badge from 'react-bootstrap/Button';
function Info() {

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
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="info">
                            <p>Total income: based on your tarrif plan<span> (from 5% to 8% daily)</span></p>
                            <p>Basic interest rate:<span> +0.5% every 24 hours</span> - only for new deposits</p>
                            <p>Minimal deposit: <span>0.05 BNB</span>, no maximal limit</p>
                            <p>Earnings <span>every moment</span>, withdraw <span>any time </span>(if you use capitalization of interest you can withdraw only after end of your deposit)</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <span className="infostaked">Total BNB Staked
                            <span className='badge' bg="light" text="dark">contract</span>
                        </span>
                        <span className="infostakedvalue">0</span>
                        <span className="infostaked">Total Contract Balance</span>
                        <span className="infostakedvalue">0</span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Info;
