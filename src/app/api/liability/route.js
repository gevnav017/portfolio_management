"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get liablities component
export async function getLiabilities() {
  try {
    const liablities = await db.liability.findMany();

    const liabilityTotal = liablities.reduce(
      (acc, liability) => acc + parseFloat(liability.amount),
      0
    );

    const uniqueCategories = [
      new Set(liablities.map((liability) => liability.category)),
    ];
    const liabilityCategories = uniqueCategories[0];

    return { liablities, liabilityTotal, liabilityCategories };
  } catch (err) {
    return { error: err };
  } finally {
    db.$disconnect();
  }
}

// post add new liability component
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
