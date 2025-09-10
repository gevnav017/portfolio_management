"use server";

import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { formatPrismaError } from "@/lib/api-error-handling";
import apiUserAuth from "@/lib/api-user-auth";

// get stock
export async function GET(req, { params }) {
  try {
    await apiUserAuth();

    const { stockId } = await params;

    const stock = await db.stocks.findUnique({
      where: { id: stockId },
    });

    return NextResponse.json(stock);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

// delete stock
export async function DELETE(req, { params }) {
  try {
    await apiUserAuth();

    const { stockId } = await params;

    const deletedStock = await db.stocks.delete({
      where: { id: stockId },
    });
    return NextResponse.json({
      success: true,
      message: "Successfully deleted stock",
      deletedStock,
    });
  } catch (err) {
    console.error("DELETE Error: ", err);
    const prismaErr = formatPrismaError(err);
    if (prismaErr) {
      console.log("Prisma Error: ", prismaErr);
      return NextResponse.json(
        { success: false, message: prismaErr.message },
        { status: prismaErr.status }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting data",
      },
      { status: 500 }
    );
  }
}

// update stock
export async function PUT(req, { params }) {
  try {
    const user = await apiUserAuth();

    const { stockId } = await params;
    const data = await req.json();

    const updatedStock = await db.stocks.update({
      where: { id: stockId },
      data: {
        ...data,
        editUserId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully updated stock",
      updatedStock,
    });
  } catch (err) {
    console.error("Error updating data: ", err);
    const prismaErr = formatPrismaError(err);
    if (prismaErr) {
      console.log("Prisma Error: ", prismaErr);
      return NextResponse.json(
        { success: false, message: prismaErr.message },
        { status: prismaErr.status }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while updating data",
      },
      { status: 500 }
    );
  }
}
