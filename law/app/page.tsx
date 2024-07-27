'use client'
import { useState, useRef, ChangeEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Files from "@/components/Files";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

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

  return (
    <>
      <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
        <div className="w-full h-full m-auto bg-heroImage bg-cover bg-center flex flex-col justify-center items-center">
          <div className="h-full max-w-screen-xl">
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
        </div>
      </main>
    </>
  );
}