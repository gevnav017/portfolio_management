"use server";

import { NextResponse } from "next/server";
import db from "../../../db/db";
import { getServerSession } from "next-auth";
import { formatPrismaError } from "../../../lib/api-error-handling";

// get stocks
export async function GET(req) {
  try {
    // Authenticate and verify user
    // const user = await useServerSession();

    // // If the response is a redirect, return it immediately
    // if (user instanceof NextResponse) {
    //   return user;
    // }

    const stocks = await db.stocks.findMany({
      where: {
        userId: user.id,
        deactivatedDate: null,
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
    // Authenticate and verify user
    // const user = await userSession();

    // // If the response is a redirect, return it immediately
    // if (user instanceof NextResponse) {
    //   return user;
    // }

    const data = await req.json();
console.log(data)
    const addedStock = await db.stocks.create({
      data: {
        ...data,
        userId: user.id,
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
