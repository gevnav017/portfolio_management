"use server";

import { NextResponse } from "next/server";
import db from "../../../../../db/db";

// post add new liability
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const deleteLiability = await db.liability.delete({
      where: {
        id
      }
    });

    return NextResponse.json(deleteLiability);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}
