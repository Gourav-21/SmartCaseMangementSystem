import Vault from "@/artifacts/contracts/Vault.sol/Vault.json";
import { Contract, ethers } from "ethers";

export const execute = async (ipsfhash: string) => {
    try {
        // const provider = new ethers.BrowserProvider(window.ethereum);
        const provider = new ethers.JsonRpcProvider()
        const signer = await provider.getSigner()
        const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, Vault.abi, signer)
        const tx = await contract.uploadDocument(ipsfhash)
        const data = await tx.wait()
        console.log(data)
        const documentId = parseInt(data.logs[0].topics[1], 16);
        console.log("Document ID:", documentId);
        return documentId;
    } catch (error) {
        console.log(error)
    }
};


export const query = async (id: number) => {
    const provider = new ethers.JsonRpcProvider();
    const contract = new Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        Vault.abi,
        provider,
    );
    const p = await contract.getDocument(id);
    console.log(p[0])
    return p;
};