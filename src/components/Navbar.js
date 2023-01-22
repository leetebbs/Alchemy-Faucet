import React from "react";
import '../styles/Navbar.css'
// import logo from '../assets/minted-logo.png'
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = (props) => {
  return (
    <div className="container">
      {/* <div className="logo"> */}
        {/* <img className='logo-image' src={logo} alt="minted Logo"/> */}
      {/* </div> */}
      <div className="connectBtnContainer">
        <ConnectButton
          chainStatus="none"
          accountStatus={{
            smallScreen: "full",
            largeScreen: "full",
          }}
        />
      </div>
      <div className="navBalance, bold">
       Faucet Balance:  {props.balance} gETH
      </div>
    </div>
  );
};

export default Navbar;
