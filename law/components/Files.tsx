import React from "react";

const GATEWAY_URL = process.env.NEXT_PUBLIC_IPFS_GATEWAY
  ? process.env.NEXT_PUBLIC_IPFS_GATEWAY
  : "https://gateway.pinata.cloud";

export default function Files(props: { cid: string }) {
  return (
    <div className="file-viewer">
      <p>Your IPFS CID:</p>
      <p>{props.cid}</p>
      <a
        href={`${GATEWAY_URL}/ipfs/${props.cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_API_KEY}`}
        rel="noopener noreferrer"
        target="_blank"
        className="border-b-2 border-solid border-accent bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent animate-animategradient hover:scale-110 transition-all duration-300 ease-in-out"
      >
        View file
      </a>
    </div>
  );
}
