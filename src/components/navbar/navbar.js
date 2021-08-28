import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
    contractAddress,
} from "../../utils/constant";
import './navbar.css';
import { ToastContainer, toast } from 'react-toastify';

// import logo from "../../asset/images/logo.png";
import logo from "../../asset/images/logo.png";
import WalletConnectProvider from "@walletconnect/web3-provider";
import menuIcon from "../../asset/images/menuIcon.png";
function Header() {

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
    const walletconnect = async () => {
        let isConnected = false;
        try {
            // setErrorState(false);
            console.log("This is   setErrorState(false);");
            const provider = new WalletConnectProvider({
                infuraId: "6d2b77cc1e1d45a7a12b25035aa39ce2",
            });

            //  Enable session (triggers QR Code modal)
            await provider.enable();

            if (provider) {
                window.web3 = new Web3(provider);
                isConnected = true;
            } else {
                isConnected = false;
                // setErrorState(true);
                console.log("This is setErrorState(true)");
                // let options = {};
                // options = {
                //   place: "tr",
                //   message: "wallet connect is not connected",
                //   type: "primary",
                //   icon: "",
                //   autoDismiss: 7,
                // };
                // notificationAlertRef.current.notificationAlert(options);
                // // "Metamask is not installed, please install it on your browser to connect.",
            }
            if (isConnected === true) {
                const web3 = window.web3;
                let accounts = await web3.eth.getAccounts();
                web3.eth.net.getId().then((netId) => {
                    console.log("(accounts[0], 2)", (accounts))

                    setAccount(accounts[0])
                    switch (netId) {
                        case 1:
                            // getData(accounts[0], 2);
                            console.log("(accounts[0], 2)", (accounts[0], 2))
                            console.log("This is mainnet");
                            break;
                        case 2:
                            console.log("This is the deprecated Morden test network.");
                            break;
                        case 3:
                            console.log("This is the ropsten test network.");
                            break;
                        default:
                            console.log("(accounts[0], 2)", (accounts[0], 1))
                            // getData(accounts[0], 1);
                            console.log("This is an unknown network.");
                    }
                });
                // this.props.dispatch(login(accounts[0]));

                window.ethereum.on("accountsChanged", function (accounts) {
                    // this.props.dispatch(login(accounts[0]));
                    web3.eth.net.getId().then((netId) => {
                        switch (netId) {
                            case 1:
                                // getData(accounts[0], 2);
                                console.log("This is mainnet");
                                break;
                            case 2:
                                console.log("This is the deprecated Morden test network.");
                                break;
                            case 3:
                                console.log("This is the ropsten test network.");
                                break;
                            default:
                                // getData(accounts[0], 1);
                                console.log("This is an unknown network.");
                        }
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
        // setModal(false)
        console.log("setErrorState(true)");
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
                        <img className="logo" src={logo} alt="Logo" style={{ padding: "0px 10px" }} />
                    </span>
                    {/* <span className="footer-title">BNB Stake </span> */}
                    <a>
                        <button
                            className="btn btn-primary btn-sm"
                            aria-pressed="true"
                            id="connect"
                            // onClick={loadWeb3}
                            onClick={walletconnect}
                        >
                            {account}
                        </button>
                    </a>
                </div>
                <div className="leftSide">
                    <div className="links" id={showLinks ? "hidden" : ""}>
                        <a href="#">
                            1 BNB = $488.11
                        </a>
                        <a href="#" class="btn btn-warning btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            PDF Guide

                        </a>
                        <a href="#" class="btn btn-info btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            Help

                        </a>
                        <a href="#" class="btn btn-success btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            Audit

                        </a>
                        <a href="#" class="btn btn-primary btn-sm active" role="button" aria-pressed="true"
                            onClick={loadWeb3}
                        >
                            Telegram

                        </a>
                    </div>
                    <button onClick={() => setShowLinks(!showLinks)}>
                        <img src={menuIcon} />
                    </button>
                </div>
            </div >
        </div >
    );
}

export default Header;
