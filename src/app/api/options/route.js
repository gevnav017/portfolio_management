"use server";

import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { formatPrismaError } from "../../../lib/api-error-handling";
import apiUserAuth from "@/lib/api-user-auth";
import { summarize } from "@/lib/summarize";

// get options
export async function GET(req) {
  try {
    const user = await apiUserAuth();

    // Pull all positions for the user 
    const positions = await db.options.findMany({
      where: { editUserId: user.id },
      orderBy: [{ symbol: "asc" }, { tradeDate: "asc" }],
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

    const options = Object.entries(bySymbol).map(([symbol, rows]) => {
      const spot = 0; // or spotBySymbol[symbol] ?? 0
      const metrics = summarize(rows, spot);
      return { symbol, metrics, positions: rows };
    });

    return NextResponse.json({ success: true, options });
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

// post new option
export async function POST(req) {
  try {
    const user = await apiUserAuth();

    const data = await req.json();

    // Separate out legs if present, and use Prisma nested create
    const { legs, ...optionData } = data;
    const addedOption = await db.options.create({
      data: {
        ...optionData,
        editUserId: user.id,
        ...(legs && Array.isArray(legs) && legs.length > 0
          ? { legs: { create: legs } }
          : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Option added successfully",
      addedOption,
    });
  } catch (err) {
    console.error("Error adding option: ", err);

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
