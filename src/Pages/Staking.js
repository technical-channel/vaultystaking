import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import "./staking.css";

import {
  ConnectMetamask,
  ConnectWeb3Wallet,
  DisconnectWallet,
  web3_,
} from "../Services";
import { staking, vaulty } from "../Constants/Contaracts";
import { StakingABI } from "../Config/ABI/StakingABI";
import { vaultyABI } from "../Config/ABI/vaultyABI";
import { useNavigate } from "react-router-dom";
// import logo from "./";
import { connect } from "react-redux";
import Swal from "sweetalert2";

function Staking(props) {
  const [connect, setConnect] = useState(false);
  const [isApprovedBuy, setIsApprovedBuy] = useState(true);
  const [Number, setNumber] = useState("");
  const [Month, setMonth] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.metamaskAddress != "") {
      setConnect(true);
    } else {
      setConnect(false);
    }
  }, [props.metamaskAddress]);

  async function handleApprove() {
    if (connect) {
      if (Month != 0) {
        if (Number != "") {
          let vaultyBalance = await new web3_.eth.Contract(
            vaultyABI,
            vaulty
          ).methods
            .balanceOf(props.metamaskAddress)
            .call();

          let isAlreadyStake = await new web3_.eth.Contract(
            StakingABI,
            staking
          ).methods
            .isAlreadyStaked(props.metamaskAddress)
            .call();

          console.log(
            "Vaulty Balance : ",
            parseFloat(vaultyBalance) / Math.pow(10, 9)
          );

          if (parseFloat(vaultyBalance) / Math.pow(10, 9) >= Number) {
            // require(!isAlreadyStaked(msg.sender), "User has Already Staked");
            if (!isAlreadyStake) {
              console.log("Transaction Possible");
            } else {
              Swal.fire("Warning", "User is already Staked", "warning");
            }
          } else {
            Swal.fire(
              "Warning",
              "User Does not have sucffiant Fund",
              "warning"
            );
          }
        } else {
          Swal.fire("Warning", "Please input number", "warning");
        }
      } else {
        Swal.fire("Warning", "Please select month", "warning");
      }
    } else {
      Swal.fire("Warning", "Please connect to the MetaMask", "warning");
    }
  }

  async function handleClick() {
    if (window.ethereum) {
      await ConnectMetamask();
      console.log("yess");

      setConnect(true);
      setIsApprovedBuy(true);
    } else {
      DisconnectWallet();
      await ConnectWeb3Wallet();

      setConnect(true);
      setIsApprovedBuy(true);
    }
  }

  // console.log(new web3_.eth.Contract(StakingABI, staking));
  return (
    <div>
      {console.log(props.metamaskAddress)}

      <div className="main-container" style={{ padding: "20px" }}>
        <header className="main-header">
          <div
            className="main-header-content-container"
            style={{ justifyContent: "unset" }}
          >
            <header className="main-header">
              <div className="header-container">
                {/* Header navbar */}
                <nav className="main-header-navbar">
                  <img
                    src={logo}
                    alt="KeeSwap logo"
                    className="main-header-navbar__logo"
                    style={{ width: 250 }}
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                  <ul
                    style={{
                      display: "flex",
                      justifyContent: "end ",
                      alignItems: "center",
                    }}
                  >
                    {connect ? (
                      <>
                        <li className="main-header-navbar__nav__item">
                          <a
                            href="#"
                            className="main-header-navbar__nav__link"
                            style={{
                              fontSize: "10px !important",
                              margin: "10px",
                              cursor: "pointer",
                            }}
                          >
                            {props.metamaskAddress &&
                              `${props.metamaskAddress.slice(
                                0,
                                3
                              )}..${props.metamaskAddress.slice(40, 42)}`}
                          </a>
                        </li>
                      </>
                    ) : null}

                    <li className="main-header-navbar__nav__item">
                      {connect ? (
                        <>
                          <a
                            className="main-header-navbar__nav__link disconnectButton"
                            onClick={() => {
                              setConnect(false);
                            }}
                          >
                            <span
                              style={{
                                borderRadius: "20px",
                                border: "1px solid green",
                                padding: 5,
                                color: "green",
                                fontSize: 10,
                                fontSize: "10px !important",
                                margin: "10px",
                                cursor: "pointer",
                              }}
                            >
                              Disconnect
                            </span>
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            className="main-header-navbar__nav__link disconnectButton"
                            style={{
                              borderRadius: "20px",
                              border: "1px solid green",
                              padding: 5,
                              color: "green",
                              cursor: "pointer",
                            }}
                            onClick={handleClick}
                          >
                            Connect Wallet
                          </a>
                        </>
                      )}
                    </li>
                  </ul>
                </nav>
                {/* Header content */}
              </div>
            </header>

            <div class="login-box">
              <h2>Choose a staking duration</h2>
              <div
                style={{
                  display: "flex",
                  margin: "10 -5px",

                  justifyContent: "space-around",
                }}
              >
                <div>
                  <button
                    className="btnStake"
                    onClick={() => {
                      setMonth(1);
                    }}
                  >
                    1 Month
                  </button>
                </div>
                <div>
                  <button
                    className="btnStake"
                    onClick={() => {
                      setMonth(2);
                    }}
                    disabled
                  >
                    3 Months
                  </button>
                </div>
                <div>
                  <button
                    className="btnStake"
                    onClick={() => {
                      setMonth(3);
                    }}
                    disabled
                  >
                    6 Months
                  </button>
                </div>
                <div>
                  <button
                    className="btnStake"
                    onClick={() => {
                      setMonth(4);
                    }}
                    disabled
                  >
                    12 Months
                  </button>
                </div>
              </div>

              <form>
                <div
                  className="user-box"
                  style={{
                    margin: "5px",
                  }}
                >
                  <input
                    type="number"
                    min={1}
                    name
                    required
                    value={Number}
                    onChange={(e) => {
                      if (e.target.value <= 0) {
                        setNumber("");
                        Swal.fire("please enter valid value");
                        return;
                      } else {
                        setNumber(e.target.value);
                      }
                    }}
                  />
                  <label>Enter Amount </label>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p className="cardFont">APY</p>
                  </div>
                  <div>
                    <p className="cardFont"> 90%</p>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p className="cardFont">You staked : </p>
                  </div>
                  <div>
                    <p className="cardFont"> 90%</p>
                  </div>
                </div>

                <div
                  className="flexClass"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p className="cardFont">Your balance : </p>
                  </div>
                  <div>
                    <p className="cardFont"> 90%</p>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p className="cardFont">Total staked : </p>
                  </div>
                  <div>
                    <p className="cardFont"> 90%</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <a onClick={handleApprove}>
                    <span />
                    <span />
                    <span />
                    <span />
                    Approve
                  </a>

                  <a href="#">
                    <span />
                    <span />
                    <span />
                    <span />
                    Stake
                  </a>
                </div>
              </form>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    metamaskAddress: state.ConnectivityReducer.metamaskAddress,
    metamaskConnect: state.ConnectivityReducer.metamaskConnect,
  };
};
export default connect(mapStateToProps, null)(Staking);
