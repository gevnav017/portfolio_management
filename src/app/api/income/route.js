"use server";

import { NextResponse } from "next/server";
import db from "../../../../db/db";

// get incomes component
export async function GetIncomes() {
  const incomes = await db.income.findMany();

  const incomeTotal = incomes.reduce(
    (acc, income) => acc + parseFloat(income.amount),
    0
  );

  const uniqueCategories = [new Set(incomes.map(income => income.category))];
  const incomeCategories = uniqueCategories[0];

  db.$disconnect()

  return { incomes, incomeTotal, incomeCategories };
}

// post add new income component
export async function POST(req) {
  const data = await req.json();

  const income = await db.income.create({
    data,
  });

  return NextResponse.json(income);
}
