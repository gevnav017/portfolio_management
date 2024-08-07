"use server";

import { NextResponse } from "next/server";
import db from "../../../../../db/db";

// delete expense
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const deleteExpense = await db.expense.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteExpense);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}

// update expense
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    const updateExpense = await db.expense.update({
      where: {
        id: id,
      },
      data: data,
    });

    return NextResponse.json(updateExpense);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}