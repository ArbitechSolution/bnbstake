import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
    abi,
    tokenAddres,
    tokenAbi
} from "../../utils/constant";
import { ToastContainer, toast } from 'react-toastify';
function Header() {

    let accountAd;
    const [account, setAccount] = useState("Connect");
    const [showLinks, setShowLinks] = useState(false);
    const [dailyProfit, setdailyProfit] = useState(0);
    const [totalReturn, setTotalReturn] = useState(0);
    const [withdrawTime, setWithdrawTime] = useState(0);
    const [enterAmount, setEnterAmount] = useState(0);
    const [fourteenDaysReward, setfourteenDaysReward] = useState(0);

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
                    <div className="col-sm-12">
                        <div className="myrefferaltable">
                            <div className="row">
                                <div className="col-3">
                                    <span className="refferaltext">Total Referral Earned</span>
                                    <span className="bannervalue">0</span>
                                </div>
                                <div className="col-3">
                                    <span className="refferaltext">Total Referral Withdrawn</span>
                                    <span className="bannervalue">0</span>
                                </div>
                                <div className="col-3">
                                    <span className="refferaltext">Invited Users by You</span>
                                    <span className="bannervalue">0</span>
                                </div>
                                <div className="col-3">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue">0</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    {/* <span className="bannerprofit">Enter Amount</span> */}
                                    {/* <span className="bannervalue">0%</span> */}
                                    <input className="stakeinput" placeholder="Enter Amount" />
                                </div>
                                <div className="col-sm-6">
                                    {/* <span>stake</span> */}
                                    <div class="d-grid gap-2">
                                        <button

                                            type="button"
                                            className="btn btn-grad btn-block"
                                            style={{
                                                margin: "10px",
                                                padding: "0.8rem 0rem",
                                            }}>
                                            Stake SMS
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="d-grid gap-2">
                                <button type="button" className="btn btn-warning btn-block">
                                    Stake BNB
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Header