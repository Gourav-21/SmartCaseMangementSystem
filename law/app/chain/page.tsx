"use client"
import React, { useState } from 'react'
import { Contract, ethers, id } from "ethers";
import Vault from "@/artifacts/contracts/Vault.sol/Vault.json"
import { provider } from "@/store/provider";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Chain() {
    const [input, setInput] = useState("")
    const [input2, setInput2] = useState("")
    console.count()

    const execute = async (ipsfhash: string) => {
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
            return data;
        } catch (error) {
            console.log(error)
        }
    };


    const query = async (id: number) => {
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

    const query2 = async () => {
        const provider = new ethers.JsonRpcProvider();
        const contract = new Contract(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
            Vault.abi,
            provider,
        );
        const p = await contract.getDocumentCount();
        console.log(p)
        return p;
    };

    return (
        <div className='h-screen w-full flex flex-col justify-center items-center gap-2'>
            <div className='flex gap-2'>

                <Input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
                <Button onClick={() => execute((input))}>upload to blockchain </Button>
            </div>
            <div className='flex gap-2'>

                <Input type='text' value={input2} onChange={(e) => setInput2(e.target.value)} />
                <Button onClick={() => query(Number(input2))}>get form  blockchain </Button>
            </div>
            <Button onClick={() => query2()}>total  blockchain </Button>


        </div>
    )
}
