'use client'
import Vault from "@/artifacts/contracts/Vault.sol/Vault.json";
import Files from "@/components/Files";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Contract, ethers } from "ethers";
import { ChangeEvent, useRef, useState } from "react";
import { execute } from "./blockchain";

export default function Home() {
  const [docid, setDocid] = useState<number[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [input2, setInput2] = useState("")


  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", fileToUpload, fileToUpload.name);
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const data: { IpfsHash: string } = await res.json();
      const docid = await execute(data.IpfsHash)
      if (docid)
        setDocid((p) => [...p, docid])
      setCid(data.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      uploadFile(e.target.files[0]);
    }
  };

  const loadRecent = async () => {
    try {
      const res = await fetch("/api/files");
      const json: { ipfs_pin_hash: string } = await res.json();
      setCid(json.ipfs_pin_hash);
    } catch (e) {
      console.log(e);
      alert("trouble loading files");
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
    setCid(p[0])
    return p;
};

  return (
    <>
        <div className="w-full h-screen bg-heroImage bg-cover bg-center flex flex-col justify-center items-center">
          <div className="h-full max-w-screen-xl gap-2 flex flex-col justify-center items-center">
            <input
              type="file"
              id="file"
              ref={inputFile}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div>
              <Button onClick={loadRecent}>
                Load recent
              </Button>
              <Button
                disabled={uploading}
                onClick={() => inputFile.current?.click()}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
            {cid && (
              <Files cid={cid} />
            )}
          </div>
          {docid}
          <div className='flex gap-2'>

            <Input type='text' value={input2} onChange={(e) => setInput2(e.target.value)} />
            <Button onClick={() => query(Number(input2))}>get form  blockchain </Button>
          </div>
        </div>


    </>
  );
}