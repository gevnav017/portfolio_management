import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get assets api
export async function GET() {
  const assets = await db.asset.findMany();

  const assetTotal = assets.reduce(
    (acc, asset) => acc + parseInt(asset.amount),
    0
  );

  return NextResponse.json({ assets, assetTotal });
}

// get assets component
export async function GetAssets() {
  const assets = await db.asset.findMany();

  const assetTotal = assets.reduce(
    (acc, asset) => acc + parseInt(asset.amount),
    0
  );

  return { assets, assetTotal };
}

// post add new asset component
export async function POST({data}) {
    // const asset = await db.asset.create({
    //     data: {
    //         category: "stock",
    //         desc: "O",
    //         amount: 200
    //     }
    // });
  console.log(data)
  return NextResponse.json(asset);
  }