import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount, useContractRead } from "wagmi";
import logo from "./assets/alchemy.png";
import { ABI } from "./components/Abi";

function App() {
  const [addr, setAddr] = useState(false);
  const { address } = useAccount();
  const [isHolder, setIsHolder] = useState(false);

  const contractAddress = "0x6EA8F47440c54cFEd54feEF1E6d07110ba0dce9B";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ABI, provider);
  const withSigner = contract.connect(signer);
  const { data } = useContractRead({
    address: contractAddress,
    abi: ABI,
    functionName: "balance",
  });
  const balance = ethers.utils.formatEther(data);

  // check if user has a alchemy nft in their wallet
  const options = { method: "GET", headers: { accept: "application/json" } };
  const key = process.env.REACT_APP_API_KEY;

  fetch(
    "https://matic-mainnet.g.alchemy.com/nft/v2/" +
      key +
      "/isHolderOfCollection?wallet=" +
      address +
      "&contractAddress=0x60576A64851C5B42e8c57E3E4A5cF3CF4eEb2ED6",
    options
  )
    .then((response) => response.json())
    .then((response) => setIsHolder(response.isHolderOfCollection))
    .catch((err) => console.error(err));

  // request funds from faucet
  async function request() {
    try {
      await withSigner.requestTokens(address);
    } catch (error) {
      alert(error.error.message.slice(20));
    }
  }

  // Donate funds to faucet
  async function donate() {
    const tx = withSigner.donateTofaucet({
      value: ethers.utils.parseUnits("0.1", "ether"),
    });
    console.log("test", tx);
  }

  useEffect(() => {
    if (!address) {
      setAddr(false);
    } else {
      setAddr(true);
    }
    console.log(address);
  }, [address]);

  return (
    <div className="App">
      <header className="App-header">
        {addr && isHolder ? (
          <div className="geteth-bar">
            <Navbar className="navbar" balance={balance} />
            <div className="containerConnected">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="app-title-connected">Alchemy University</h1>
              <h2>Goerli Faucet</h2>
              <p className="bold">Connected with</p>
              <h4 className="userAddress">{address}</h4>
              <button
                className="Send-eth-button"
                onClick={() => {
                  request();
                }}
              >
                Send Me 0.02Ξ
              </button>
              <div className="donateButton">
                <button
                  className="Donate-button"
                  onClick={() => {
                    donate();
                  }}
                >
                  Donate 0.1Ξ
                </button>
              </div>
              <div className="madeBy">
                <p>Coded by Tebbo</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="notConnected">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="app-title">Alchemy University Goerli Faucet</h2>
            <p>Alchemy University Early Access NFT Holders Only</p>
            <div className="connectButton">
              <ConnectButton />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
