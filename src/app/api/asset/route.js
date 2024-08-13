"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get assets
export async function getAssets() {
  try {
    const assets = await db.asset.findMany();

    const assetTotal = assets.reduce(
      (acc, asset) => acc + parseFloat(asset.amount),
      0
    );

    const uniqueCategories = [new Set(assets.map((asset) => asset.category))];
    const assetCategories = uniqueCategories[0];

    const cashAssets = assets.filter((asset) => asset.category === "Cash");
    const cashTotal = cashAssets.reduce(
      (acc, cash) => acc + parseFloat(cash.amount),
      0
    );

    return { assets, assetTotal, assetCategories, cashTotal };
  } catch (err) {
    return { error: err };
  } finally {
    db.$disconnect();
  }
}

// post add new asset
export async function POST(req) {
  try {
    const data = await req.json();

    const asset = await db.asset.create({
      data,
    });

    return NextResponse.json(asset);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}
