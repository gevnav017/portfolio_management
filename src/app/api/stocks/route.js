"use server";

import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { formatPrismaError } from "../../../lib/api-error-handling";
import apiUserAuth from "@/lib/api-user-auth";
import { summarize } from "@/lib/summarize";

// get stocks
export async function GET(req) {
  try {
    const user = await apiUserAuth();
    
    // Pull all positions for the user (stocks, options, dividends)
    const positions = await db.stocks.findMany({
      where: { editUserId: user.id },
      orderBy: [{ symbol: "asc" }, { openDate: "asc" }],
    });

    // If you store quotes, fetch here:
    // const quotes = await db.quote.findMany({ where: { symbol: { in: symbols } } });
    // const spotBySymbol = Object.fromEntries(quotes.map(q => [q.symbol, q.last]));

    // group positions by symbol
    const bySymbol = positions.reduce((acc, p) => {
      if (!acc[p.symbol]) acc[p.symbol] = [];
      acc[p.symbol].push(p);
      return acc;
    }, {});

    const stocks = Object.entries(bySymbol).map(([symbol, rows]) => {
      const spot = 0; // or spotBySymbol[symbol] ?? 0
      const metrics = summarize(rows, spot);
      return { symbol, metrics, positions: rows };
    });

    return NextResponse.json({ success: true, stocks });
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
        message: "An error occurred while fetching data",
      },
      { status: 500 }
    );
  }
}

// post new stock
export async function POST(req) {
  try {
    const user = await apiUserAuth();

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
        message: "An error occurred while saving data",
      },
      { status: 500 }
    );
  }
}
