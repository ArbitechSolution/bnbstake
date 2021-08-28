import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
    abi,
    tokenAddres,
    tokenAbi
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

    const [dailyProfit1, set1dailyProfit] = useState(0);
    const [totalReturn1, set1TotalReturn] = useState(0);
    const [withdrawTime1, set1WithdrawTime] = useState(0);
    const [enterAmount1, set1EnterAmount] = useState(0);
    const [fourteenDaysReward1, set1fourteenDaysReward] = useState(0);
    const [days1, set1days] = useState(15);

    const [dailyProfit2, set2dailyProfit] = useState(0);
    const [totalReturn2, set2TotalReturn] = useState(0);
    const [withdrawTime2, set2WithdrawTime] = useState(0);
    const [enterAmount2, set2EnterAmount] = useState(0);
    const [fourteenDaysReward2, set2fourteenDaysReward] = useState(0);
    const [days2, set2days] = useState(30);

    const [dailyProfit3, set3dailyProfit] = useState(0);
    const [totalReturn3, set3TotalReturn] = useState(0);
    const [withdrawTime3, set3WithdrawTime] = useState(0);
    const [enterAmount3, set3EnterAmount] = useState(0);
    const [fourteenDaysReward3, set3fourteenDaysReward] = useState(0);
    const [days3, set3days] = useState(60);

    const getData = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            // console.log("data", web3);
            let dailyprofit1 = await contract.methods.allocation(days1).call();
            set1dailyProfit(dailyprofit1);
            let dailyprofit2 = await contract.methods.allocation(days2).call();
            set2dailyProfit(dailyprofit2);
            let dailyprofit3 = await contract.methods.allocation(days3).call();
            set3dailyProfit(dailyprofit3);
        } catch (error) {
            alert("Error while checking locked account");
        }
    };

    const enter1AmountCall = async (e) => {
        try {
            set1EnterAmount(e.target.value);

        } catch (error) {
            console.log("Error while checking locked account");
        }
    };
    const enter2AmountCall = async (e) => {
        try {
            set2EnterAmount(e.target.value);
        } catch (error) {
            console.log("Error while checking locked account");
        }
    }

    const enter3AmountCall = async (e) => {
        try {
            set3EnterAmount(e.target.value);
        } catch (error) {
            console.log("Error while checking locked account");
        }
    }
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
            getData();
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
                                    <span className="bannervalue">{dailyProfit1}</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">{totalReturn1}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">{withdrawTime1}</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">{days1}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}
                                    <input className="stakeinput" onChange={enter1AmountCall} />
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue">{fourteenDaysReward1}</span>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="button" className="btn btn-block btn-grad" id="ImageColor">
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
                                    <span className="bannervalue">{dailyProfit2}</span>
                                </div>
                                <div className="col-sm-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">{totalReturn2}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">{withdrawTime2}</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">{days2}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}
                                    <input className="stakeinput"
                                        placeholder="0"
                                        onChange={enter2AmountCall}
                                    />
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue">{fourteenDaysReward2}</span>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="button" className="btn btn-grad btn-block">
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
                                    <span className="bannervalue">{dailyProfit3}</span>
                                </div>
                                <div className="col-sm-6">
                                    <span className="bannerprofit">Total Return</span>
                                    <span className="bannervalue">{totalReturn3}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Withdraw time</span>
                                    <span className="bannervalue">{withdrawTime3}</span>
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">Days</span>
                                    <span className="bannervalue">{days3}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <span className="bannerprofit">Enter Amount</span>
                                    {/* <span className="bannervalue">0%</span> */}
                                    <input className="stakeinput"
                                        onChange={enter2AmountCall}
                                    />
                                </div>
                                <div className="col-6">
                                    <span className="bannerprofit">In 14 days you will get</span>
                                    <span className="bannervalue">{fourteenDaysReward3}</span>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="button" className="btn btn-grad btn-block">
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
