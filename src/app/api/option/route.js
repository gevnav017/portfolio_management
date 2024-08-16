"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get options
export async function getOptions() {
  try {
    const options = await db.option.findMany();

    const optionSymbols = [
      new Set(options.map((option) => option.symbol)),
    ];
    const uniqueOptions = optionSymbols[0];

    return { options, uniqueOptions };
  } catch (err) {
    return { error: err };
  } finally {
    db.$disconnect();
  }
}

// post add new option
export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data)

    const option = await db.option.create({
      data,
    });

    return NextResponse.json(option);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}