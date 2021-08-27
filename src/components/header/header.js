import React from 'react'

function Header() {
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="myrefferaltable">
                            <div className="row">
                                <div className="col-3">
                                    <span className="refferaltext">Total Referral Earned</span>
                                    <span className="refferalvalue">0</span>
                                </div>
                                <div className="col-3">
                                    <span className="refferaltext">Total Referral Withdrawn</span>
                                    <span className="refferalvalue">0</span>
                                </div>
                                <div className="col-3">
                                    <span className="refferaltext">Invited Users by You</span>
                                    <span className="refferalvalue">0</span>
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
                                            className="btn btn-warning btn-block"
                                            style={{
                                                margin: "10px",
                                                padding: "0.8rem 0rem",
                                            }}>
                                            Stake BNB
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