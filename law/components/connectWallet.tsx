"use client";
import { ethers } from "ethers";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "./ui/button";
import { provider } from "@/store/provider";
import { walletState } from "@/store/walletConnected";

declare global {
  interface Window {
    ethereum: any
  }
}

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useRecoilState(walletState);
  const setProvider=useSetRecoilState(provider)
  const [userAddress, setUserAddress] = useState("");
  const router = useRouter()

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider)
        const signer = await provider.getSigner();

        setIsConnected(true);
        setUserAddress(await signer.getAddress());
        console.log("Connected", userAddress);

        setIsConnected(true);
        router.push('/post')
      } catch (error) {
        alert("Error connecting to metamask")
        console.error("Error connecting to metamask", error);
        setIsConnected(false);
        router.push('/post')
      }
    } else {
      alert("Please install metamask!");
      setIsConnected(false);
      router.push('/post')
    }
    
  };

  return (
    <div className="connect-wallet">
      <Button variant="outline" className="text-black" onClick={connectWalletHandler}>
        {isConnected ? "Connected" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default ConnectWallet;
