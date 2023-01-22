import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { BrowserRouter } from "react-router-dom";

var goerliChain = {
  id: 5,
  name: "Goreli Testnet",
  network: "goerli",
  nativeCurrency: {
    decimals: 18,
    name: "gETH",
    symbol: "gETH",
  },
  rpcUrls: {
    default: "https://endpoints.omniatech.io/v1/eth/goerli/public",
  },
  blockExplorers: {
    default: { name: "Goerli", url: "https://goerli.etherscan.io/" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  // [chain.polygonMumbai, chain.mainnet, wallabyChain],
  [goerliChain],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://endpoints.omniatech.io/v1/eth/goerli/public",
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Faucet",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      coolMode
      theme={darkTheme({
        accentColor: "#517DC6",
        accentColorForeground: "white",
        borderRadius: "medium",
        fontStack: "system",
      })}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
