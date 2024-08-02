"use server";

import { NextResponse } from "next/server";
import db from "../../../../../db/db";

// delete asset
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const deleteAsset = await db.asset.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteAsset);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

// update asset
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    const updateAsset = await db.asset.update({
      where: {
        id: id,
      },
      data: data,
    });

    return NextResponse.json(updateAsset);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}
