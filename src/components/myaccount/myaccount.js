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
    const [uplineearb, setuplineearn] = useState(0);
    const [days, setdays] = useState(0);
    const [WithdrawAbleReward, setWithdrawAbleReward] = useState(0);
    const [referralReward, SetReferralReward] = useState(0);
    const [userstaked, setuserstaked] = useState(0);
    const [numberodreferral, setnumberodreferral] = useState(0)

    const [withdrawamount, setwithdrawamount] = useState(0);

    const getData = async () => {
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            // console.log("data", web3);
            let totalupline = await contract.methods.Total_Upline_Earned().call();
            setuplineearn(totalupline);

            let uplinereward = await contract.methods.Users(accountAd).call();
            SetReferralReward(uplinereward.upline_Reward);
            setWithdrawAbleReward(uplinereward.WithdrawAbleReward);
            setuserstaked(web3.utils.fromWei(uplinereward.DepositeToken));
            setnumberodreferral(uplinereward.referrals)

        } catch (error) {
            console.log("Error while checking locked account", error);
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
                // toast("Metamask is not installed, please install it on your browser to connect.");
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
    const enterAmountCall = async (e) => {
        try {
            setwithdrawamount(e.target.value);
        } catch (error) {
            console.log("Error while checking locked account");
        }
    };
    const WithdrawReward = async () => {
        const web3 = window.web3;
        try {
            const web3 = window.web3;
            let contract = new web3.eth.Contract(abi, contractAddress);
            // console.log("withdrawamount", withdrawamount);
            let checkuser = await contract.methods.Users(account).call();
            let time_to_next_withraw = checkuser.Time_to_next_withraw;
            let today = new Date().getTime();
            if (today >= time_to_next_withraw) {
                if (WithdrawAbleReward > 0 && withdrawamount >= 10) {
                    let uplinereward = await contract.methods.WithdrawReward(
                        web3.utils.toWei(withdrawamount)
                    ).send({
                        from: account
                    })
                        .then(async (output) => {
                            toast.success("Transaction Completed");
                        }).catch((e) => {
                            // console.log("response", e);
                            toast.error(e.message);
                        });
                } else {
                    toast("You do not Have sufficient balance to withdraw");
                    // console.log("withdrawamount", "You do not Have sufficient balance to withdraw")
                }
            } else {
                toast("withdraw will be available after 24 hours");
                // console.log("withdrawamount", "You do not Have sufficient balance to withdraw")
            }
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
        }
    };


    // eslint-disable-next-line
    const isLockedAccount = async () => {
        try {
            let accounts = await getAccounts();
            if (accounts.length > 0) {
                // console.log("Metamask is unlocked");
            } else {
                // console.log("Metamask is locked");
            }
        } catch (error) {
            console.log("Error while checking locked account");
        }
    };
    function copyToClipboard(e) {
        try {
            let get = document.getElementById("textAreaRef").select();
            document.execCommand('copy');
            e.target.focus();
            toast.success('copied!');
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
        }
    };

    useEffect(() => {
        setInterval(() => {
            loadWeb3();
        }, 1000);
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <div className="mystaked">
                        <div className="row">
                            <span className="mystakedtext">Withdrawable Reward</span>
                            <span className="mystakedvalue">{WithdrawAbleReward}</span>
                            <span className="mystakedtext">User Total Deposit</span>
                            <span className="mystakedvalue">{userstaked}</span>
                            <input className="stakeinput" onChange={enterAmountCall} />
                            <button className="btn btn-primary"
                                onClick={WithdrawReward}>
                                Withdraw
                            </button>
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
                                <input placeholder="Please connect to your wallet"
                                    value={`${window.location.protocol}//${window.location.host
                                        }/login?ref=${account}`}
                                />
                            </div>
                            <div className="col-sm-2">
                                <button className="copy"
                                    id="textAreaRef"
                                    onClick={copyToClipboard}
                                >copy</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <span className="refferaltext">Total Referral Earned</span>
                                <span className="refferalvalue">{referralReward}</span>
                            </div>
                            <div className="col-4">
                                <span className="refferaltext">Total Referral Withdrawn</span>
                                <span className="refferalvalue">0</span>
                            </div>
                            <div className="col-4">
                                <span className="refferaltext">Invited Users by You</span>
                                <span className="refferalvalue">{numberodreferral}</span>
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


// solana key phrase
// remove capable record together 
// economy donkey raise toddler half diet music first