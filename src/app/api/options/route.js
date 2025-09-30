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

    if (!data.legs || !Array.isArray(data.legs) || data.legs.length === 0) {
      const addedStock = await db.options.create({
        data: {
          ...data,
          editUserId: user.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Option added successfully",
        addedStock,
      });
    }

    const { legs, ...optionData } = data;

    const { count } = await db.options.createMany({
      data: legs.map((leg) => ({
        ...optionData,
        strike: leg.strike,
        debit: leg.debit,
        credit: leg.credit,
        editUserId: user.id,
      })),
    });

    return NextResponse.json({
      success: true,
      message: `${count} option(s) added successfully`,
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
