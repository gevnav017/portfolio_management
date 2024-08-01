"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get liabilities
export async function getLiabilities() {
  try {
    const liabilities = await db.liability.findMany();

    const liabilityTotal = liabilities.reduce(
      (acc, liability) => acc + parseFloat(liability.amount),
      0
    );

    const uniqueCategories = [
      new Set(liabilities.map((liability) => liability.category)),
    ];
    const liabilityCategories = uniqueCategories[0];

    return { liabilities, liabilityTotal, liabilityCategories };
  } catch (err) {
    return { error: err };
  } finally {
    db.$disconnect();
  }
}

// post add new liability
export async function POST(req) {
  try {
    const data = await req.json();

    const liability = await db.liability.create({
      data,
    });

    return NextResponse.json(liability);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    db.$disconnect();
  }
}