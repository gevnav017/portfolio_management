"use server";

import { NextResponse } from "next/server";
import db from "../../../../../db/db";

// delete income
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const deleteIncome = await db.income.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteIncome);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

// update income
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    const updateIncome = await db.income.update({
      where: {
        id: id,
      },
      data: data,
    });

    return NextResponse.json(updateIncome);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}
