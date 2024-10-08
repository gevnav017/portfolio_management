"use server";

import { NextResponse } from "next/server";
import db from "../../../../../db/db";

// delete liability
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const deleteLiability = await db.liability.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteLiability);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

// update liability
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    const updateLiability = await db.liability.update({
      where: {
        id: id,
      },
      data: data,
    });

    return NextResponse.json(updateLiability);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}