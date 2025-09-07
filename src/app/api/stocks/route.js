"use server";

import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { formatPrismaError } from "../../../lib/api-error-handling";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// get stocks
export async function GET(req) {
  try {
    // get session
    const { user } = await getServerSession(authOptions);

    // if not logged in, return 401
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    // query stocks tied to this user
    const stocks = await db.stocks.findMany({
      where: {
        editUserId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      stocks,
    });
  } catch (err) {
    console.error("GET Error: ", err);

    // prisma client validation error
    const prismaErr = formatPrismaError(err);
    if (prismaErr) {
      console.log("Prisma Error: ", prismaErr);
      return NextResponse.json(
        { success: false, message: prismaErr.message },
        { status: prismaErr.status }
      );
    }

    // fallback to default error
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while getting projects",
      },
      { status: 500 }
    );
  }
}

// post new stock
export async function POST(req) { 
  try {
    // get session
    const { user } = await getServerSession(authOptions);

    // if not logged in, return 401
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const data = await req.json();

    const addedStock = await db.stocks.create({
      data: {
        ...data,
        editUserId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Stock added successfully",
      addedStock,
    });
  } catch (err) {
    console.error("Error adding stock: ", err);

    // prisma client validation error
    const prismaErr = formatPrismaError(err);
    if (prismaErr) {
      console.log("Prisma Error: ", prismaErr);
      return NextResponse.json(
        { success: false, message: prismaErr.message },
        { status: prismaErr.status }
      );
    }

    // fallback to default error
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while saving stock",
      },
      { status: 500 }
    );
  }
}
