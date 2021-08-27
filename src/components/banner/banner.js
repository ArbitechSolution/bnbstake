import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
} from "../../utils/constant";
import './banner.css';
import { ToastContainer, toast } from 'react-toastify';

// import logo from "../../asset/images/logo.png";
import logo from "../../asset/images/logo.png";
import menuIcon from "../../asset/images/menuIcon.png";
import { Container } from "react-bootstrap";
function Banner() {

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
                    <div className="col-sm-4">
                        <div className="bannercard">
                            <div className="col-md-12" id="plan">
                                <span>Plan 1</span>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Daily Profit</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}
                                    <input className="stakeinput" />
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue">0</span>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="button" className="btn btn-warning btn-block">
                                    Stake BNB
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="bannercard">
                            <div className="col-md-12" id="plan">
                                <span>Plan 2</span>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <span className="bannerprofit">Daily Profit</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                                <div className="col-sm-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}
                                    <input className="stakeinput" />
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue">0</span>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="button" className="btn btn-warning btn-block">
                                    Stake BNB
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="bannercard">
                            <div className="col-md-12" id="plan">
                                <span>Plan 3</span>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <span className="bannerprofit">Daily Profit</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                                <div className="col-sm-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">0%</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}
                                    <input className="stakeinput" />
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue">0</span>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="button" className="btn btn-warning btn-block">
                                    Stake BNB
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Banner;
