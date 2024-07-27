import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({
  pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT,
});

export const config = {
  api: {
    bodyParser: false,
  },
};


async function pinFileToIPFS(file: File) {
  try {
    // const text = "Hello World!";
    // const blob = new Blob([text], { type: "text/plain" });
    // const file = new File([blob], "hello-world.txt");
    const data = new FormData();
    data.append("file", file);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, {
        status: 400,
      });
    }
    const response = await pinFileToIPFS(file);

    return NextResponse.json(response, { status: 200 });
    
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await pinata.pinList(
      {
        pageLimit: 1,
      },
    );
    return NextResponse.json(response.rows[0]);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
