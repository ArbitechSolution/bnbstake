import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
    abi,
    tokenAddres,
    tokenAbi
} from "../../utils/constant";
import './myaccount.css';
import { ToastContainer, toast } from 'react-toastify';

// import logo from "../../asset/images/logo.png";
import logo from "../../asset/images/logo.png";
import menuIcon from "../../asset/images/menuIcon.png";
import { Container } from "react-bootstrap";
function Myaccount() {

    let accountAd;
    const [account, setAccount] = useState("Connect");
    const [showLinks, setShowLinks] = useState(false);
    const [dailyProfit, setdailyProfit] = useState(0);
    const [totalReturn, setTotalReturn] = useState(0);
    const [withdrawTime, setWithdrawTime] = useState(0);
    const [enterAmount, setEnterAmount] = useState(0);
    const [fourteenDaysReward, setfourteenDaysReward] = useState(0);
    const [days, setdays] = useState(0);

    const getData = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            // console.log("data", web3);
            let accountDetails = await contract.methods.allocation(days).call();
        } catch (error) {
            alert("Error while checking locked account");
        }
    };
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
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <div className="mystaked">
                        <div className="row">
                            <span className="mystakedtext">Total Stacked SMS</span>
                            <span className="mystakedvalue">0</span>
                            <span className="mystakedtext">Available SMS for withdrawal</span>
                            <span className="mystakedvalue">0.000</span>
                            <button className="btn btn-primary">Withdraw</button>
                        </div>
                    </div>
                    <div className="row" style={{ color: "white" }}>
                        <h1>Your Stake</h1>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="myrefferaltable">
                        <span className="refferaltext">Your Referral Link</span>
                        <div className="row">
                            <div className="col-sm-10">
                                <input placeholder="Please connect to your wallet" />
                            </div>
                            <div className="col-sm-2">
                                <button className="copy">copy</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <span className="refferaltext">Total Referral Earned</span>
                                <span className="refferalvalue">0</span>
                            </div>
                            <div className="col-4">
                                <span className="refferaltext">Total Referral Withdrawn</span>
                                <span className="refferalvalue">0</span>
                            </div>
                            <div className="col-4">
                                <span className="refferaltext">Invited Users by You</span>
                                <span className="refferalvalue">0</span>
                            </div>
                        </div>
                        <div className="row" style={{
                            padding: "10px 0px"
                        }}>
                            <div className="col">
                                <p>Earn for promotion BNBstake</p>
                                <p>You will receive:</p>
                                <p>5% from each level 1 referral depositss</p>
                                <p>2.5% from each level 2 referral deposits</p>
                                <p>0.5% from each level 3 referral deposits</p>
                                <p>Note! You need to have at least 1 deposit to start receive earnings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Myaccount;
